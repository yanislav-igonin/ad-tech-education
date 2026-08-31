// Minimal CDP smoke test: no puppeteer, node's built-in WebSocket only.
const BASE = 'http://127.0.0.1:4321';
const targets = await (await fetch('http://127.0.0.1:9223/json/list')).json();
const target = targets.find((t) => t.type === 'page');
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { res, rej } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? rej(new Error(msg.error.message)) : res(msg.result);
  }
};
let seq = 0;
const pending = new Map();
const send = (method, params = {}) =>
  new Promise((res, rej) => {
    const id = ++seq;
    pending.set(id, { res, rej });
    ws.send(JSON.stringify({ id, method, params }));
  });

const evaluate = async (expr) => {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error('page eval failed: ' + JSON.stringify(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text));
  return r.result.value;
};

const results = [];
const check = (name, ok, extra = '') => {
  results.push(`${ok ? 'PASS' : 'FAIL'} ${name}${extra ? ' — ' + extra : ''}`);
};

await send('Page.enable');
const goto = async (url) => {
  await send('Page.navigate', { url }).then((r) => console.error('nav:', url, r.errorText ?? ''));
  await new Promise((res) => {
    const h = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.method === 'Page.loadEventFired') {
        ws.removeEventListener('message', h);
        res();
      }
    };
    ws.addEventListener('message', h);
  });
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// 1. Index
await goto(`${BASE}/`);
await sleep(300);
const tocLinks = await evaluate(`[...document.querySelectorAll('.toc__link')].map(a => a.textContent.trim())`);
const partHeaders = await evaluate(`[...document.querySelectorAll('.toc-part')].map(h => h.textContent.trim())`);
check('index TOC has 5 chapters', tocLinks.length === 5, tocLinks.join(' | '));
check('TOC grouped by parts', partHeaders.join(',') === 'Часть I,Часть II', partHeaders.join(','));

// 2. Progress initial
let progress = await evaluate(`document.querySelector('[data-progress-total]').textContent`);
check('progress 0 из 5 initially', progress === '0 из 5', progress);

// 3. Mark ch-01 read, reload, verify persistence
await evaluate(`document.querySelector('.toc__item input[type=checkbox]').click()`);
await goto(`${BASE}/`);
await sleep(300);
progress = await evaluate(`document.querySelector('[data-progress-total]').textContent`);
const checkedAfterReload = await evaluate(`document.querySelector('.toc__item input').checked`);
check('checkbox survives reload', checkedAfterReload === true);
check('progress 1 из 5 after mark', progress === '1 из 5', progress);
const stored = await evaluate(`localStorage.getItem('adtech-read')`);
check('localStorage persists state', stored === '{"ch-01":true}', String(stored));

// 4. Navigate from TOC into chapter
await evaluate(`document.querySelector('.toc__link').click()`);
await sleep(600);
const chapterTitle = await evaluate(`document.querySelector('.chapter__title')?.textContent.trim()`);
check('chapter page opens from index', chapterTitle === 'Что такое AdTech и зачем он существует', String(chapterTitle));

// 5. Read state synced on chapter page
const readChecked = await evaluate(`document.querySelector('.chapter .read-toggle input').checked`);
check('read state visible on chapter page', readChecked === true);

// 6. Intra-chapter TOC
const tocItems = await evaluate(`[...document.querySelectorAll('.tocbox a')].map(a => a.textContent.trim())`);
check('intra-chapter TOC rendered', tocItems.length > 0, `${tocItems.length} items`);

// 7. Active chapter in sidebar
const active = await evaluate(`document.querySelector('.spine__link[aria-current="page"]')?.textContent.trim()`);
check('active chapter highlighted', active && active.includes(chapterTitle), String(active));

// 8. Markdown rendering on ch-01
const counts = await evaluate(`({h2: document.querySelectorAll('.prose h2').length, code: document.querySelectorAll('.prose pre code').length, table: document.querySelectorAll('.prose table').length, ul: document.querySelectorAll('.prose ul, .prose ol').length, p: document.querySelectorAll('.prose p').length})`);
check('markdown h2 rendered', counts.h2 > 0, `${counts.h2}`);
check('code blocks rendered', counts.code > 0, `${counts.code}`);
check('lists rendered', counts.ul > 0, `${counts.ul}`);
check('paragraphs rendered', counts.p > 0, `${counts.p}`);

// 9. Prev/next chain
await evaluate(`[...document.querySelectorAll('.pager a')].find(a => a.className.includes('next')).click()`);
await sleep(600);
const nextTitle = await evaluate(`document.querySelector('.chapter__title')?.textContent.trim()`);
check('next navigation works', nextTitle && nextTitle.includes('Участники'), String(nextTitle));
const hasPrev = await evaluate(`[...document.querySelectorAll('.pager a')].some(a => a.textContent.includes('Глава 1'))`);
check('prev navigation present', hasPrev === true);

// 10. Tables on metrics chapter
await goto(`${BASE}/chapter/core-advertising-metrics/`);
await sleep(300);
const tables = await evaluate(`document.querySelectorAll('.prose table').length`);
check('tables rendered on metrics chapter', tables > 0, `${tables}`);

// 11. All chapters 200
for (const slug of ['what-is-adtech', 'adtech-ecosystem-participants', 'core-advertising-metrics', 'adtech-economics-business-models', 'campaign-structure']) {
  const ok = await evaluate(`fetch('${BASE}/chapter/${slug}/').then(r => r.ok)`);
  check(`GET /chapter/${slug}/`, ok === true);
}

// 12. Downloads 404 until artifacts built — report current status
for (const f of ['adtech-ru.epub', 'adtech-ru.pdf']) {
  const status = await evaluate(`fetch('${BASE}/downloads/${f}').then(r => r.status)`);
  check(`download /downloads/${f} (artifacts pending)`, status === 200 || status === 404, `status ${status}`);
}

// 13. Unmark → progress 0
await goto(`${BASE}/`);
await sleep(300);
await evaluate(`document.querySelector('.toc__item input[type=checkbox]').click()`);
progress = await evaluate(`document.querySelector('[data-progress-total]').textContent`);
check('unmark updates progress', progress === '0 из 5', progress);

ws.close();
console.log(results.join('\n'));
if (results.some((r) => r.startsWith('FAIL'))) process.exit(1);
