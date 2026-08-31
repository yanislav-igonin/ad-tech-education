// Builds adtech-ru.pdf from chapters/ru/*.md via pandoc → HTML → headless Chrome (raw CDP).
// Run from site/: node scripts/build-pdf.mjs
import { execFileSync, spawn } from 'node:child_process';
import { mkdirSync, readdirSync, writeFileSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';

const siteDir = process.cwd();
const rootDir = resolve(siteDir, '..');
const chaptersDir = join(rootDir, 'chapters', 'ru');
const buildDir = join(siteDir, 'build');
const outDir = join(siteDir, 'public', 'downloads');

const CHROME_CANDIDATES = [
  ...(process.platform === 'darwin'
    ? ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome']
    : []),
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
];

const chromeBin = process.env.CHROME_PATH ?? CHROME_CANDIDATES.find((p) => exists(p));
if (!chromeBin) {
  console.error('No Chrome/Chromium found. Set CHROME_PATH.');
  process.exit(1);
}

const chapters = readdirSync(chaptersDir)
  .filter((f) => f.endsWith('.md'))
  .sort()
  .map((f) => join(chaptersDir, f));

if (chapters.length === 0) {
  console.error('No chapters found in', chaptersDir);
  process.exit(1);
}

mkdirSync(buildDir, { recursive: true });
mkdirSync(outDir, { recursive: true });

const bookHtml = join(buildDir, 'book.html');
execFileSync(
  'pandoc',
  [
    ...chapters,
    '--from=markdown+yaml_metadata_block',
    '--to=html5',
    '--standalone',
    '--toc',
    '--toc-depth=2',
    '--metadata', 'lang=ru',
    '--metadata', 'title=AdTech Education Materials',
    '--css=scripts/print.css',
    '-o', bookHtml,
  ],
  { cwd: siteDir, stdio: 'inherit' },
);

// --- Launch Chrome with an ephemeral CDP port and talk raw DevTools protocol ---
rmSync(join(buildDir, 'chrome-profile'), { recursive: true, force: true });
mkdirSync(join(buildDir, 'chrome-profile'), { recursive: true });

const chrome = spawn(
  chromeBin,
  [
    '--headless=new',
    '--remote-debugging-port=0',
    '--user-data-dir=' + join(buildDir, 'chrome-profile'),
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank',
  ],
  { stdio: ['ignore', 'ignore', 'pipe'] },
);

const wsUrl = await new Promise((res, rej) => {
  let buf = '';
  const timer = setTimeout(() => rej(new Error('Chrome did not start (no DevTools endpoint)')), 30000);
  chrome.stderr.on('data', (d) => {
    buf += d.toString();
    const m = buf.match(/DevTools listening on (ws:\/\/\S+)/);
    if (m) {
      clearTimeout(timer);
      res(m[1]);
    }
  });
  chrome.on('exit', () => rej(new Error('Chrome exited early:\n' + buf)));
});
const httpOrigin = wsUrl.replace(/^ws:/, 'http:').replace(/\/devtools\/.*$/, '');
const targets = await (await fetch(`${httpOrigin}/json/list`)).json();
const pageTarget = targets.find((t) => t.type === 'page');
if (!pageTarget) throw new Error('No page target found');
const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

let seq = 0;
const pending = new Map();
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { res, rej } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? rej(new Error(msg.error.message)) : res(msg.result);
  }
};
const send = (method, params = {}) =>
  new Promise((res, rej) => {
    const id = ++seq;
    pending.set(id, { res, rej });
    ws.send(JSON.stringify({ id, method, params }));
  });

await send('Page.enable');
await send('Page.navigate', { url: 'file://' + bookHtml });
await new Promise((res) => {
  const h = (ev) => {
    if (JSON.parse(ev.data).method === 'Page.loadEventFired') {
      ws.removeEventListener('message', h);
      res();
    }
  };
  ws.addEventListener('message', h);
});
await new Promise((r) => setTimeout(r, 500)); // let fonts/layout settle

const pdf = await send('Page.printToPDF', {
  landscape: false,
  printBackground: true,
  paperWidth: 8.27, // A4
  paperHeight: 11.69,
  marginTop: 0.79, // 20mm
  marginBottom: 0.79,
  marginLeft: 0.71, // 18mm
  marginRight: 0.71,
  displayHeaderFooter: true,
  headerTemplate: '<span></span>',
  footerTemplate:
    '<div style="width:100%;text-align:center;font-size:8.5pt;color:#5c5344;">' +
    '<span class="pageNumber"></span> / <span class="totalPages"></span></div>',
});

const pdfPath = join(outDir, 'adtech-ru.pdf');
writeFileSync(pdfPath, Buffer.from(pdf.data, 'base64'));
console.log('PDF written:', pdfPath);
ws.close();
chrome.kill();
await new Promise((res) => chrome.on('exit', res));
try {
  rmSync(join(buildDir, 'chrome-profile'), { recursive: true, force: true });
} catch {
  // best-effort cleanup; profile is inside gitignored build/
}
function exists(p) {
  try {
    execFileSync('test', ['-x', p]);
    return true;
  } catch {
    return false;
  }
}
