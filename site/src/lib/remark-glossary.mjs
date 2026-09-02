// Плагин глоссария для markdown-пайплайна (satteri mdastPlugins).
//
// Делает две вещи:
// 1. Превращает маркеры [^g-id] в тексте главы в настоящие footnoteReference.
// 2. Дописывает в конец документа footnote-definitions из глоссария.
//
// Локаль документа определяется по пути исходника: плагин экспортируется
// как ФАБРИКА — satteri вызывает её один раз на каждый компилируемый документ
// и передаёт PluginFactoryContext с fileURL исходного .md. Главы из
// chapters/en/ получают определения из glossary.en.md; если en-глоссарий
// отсутствует или в нём нет конкретного id — откат к glossary.md (ru).
// Сборка при отсутствии glossary.en.md не падает.
//
// Файлы глоссария лежат в корне репозитория; читаем напрямую из fs, потому
// что glossary.en.md может появиться в любой момент (статический ?raw-импорт
// сломал бы сборку, пока файла нет).

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const marker = /\[\^g-([\w-]+)\]/g;

/**
 * Корень репозитория. Обычно это родитель site/ (cwd при сборке), но
 * подстраховываемся импортом относительно самого файла — конфиг Astro
 * загружается Node напрямую, без бандлинга, поэтому import.meta.url надёжен.
 */
function readRootFile(name) {
  const candidates = [
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../', name),
    path.join(process.cwd(), name),
    path.join(path.resolve(process.cwd(), '..'), name),
  ];
  for (const p of candidates) {
    if (existsSync(p)) return readFileSync(p, 'utf8');
  }
  return null;
}

/**
 * Парсит глоссарий в Map id → строка footnote-definition.
 * Определением термина считается первая непустая строка после
 * `### Заголовок {#g-id}` (та же логика, что была в defsMd).
 */
function parseDefs(src) {
  const defs = new Map();
  let id = null;
  for (const line of src.split(/\r?\n/)) {
    const heading = line.match(/^###\s+(.+?)\s*\{#g-([\w-]+)\}\s*$/);
    if (heading) {
      id = heading[2];
    } else if (/^#/.test(line)) {
      id = null;
    } else if (id && line.trim().length > 0) {
      defs.set(id, `[^g-${id}]: ${line.trim()}`);
      id = null;
    }
  }
  return defs;
}

/**
 * Определения для документа локали `locale`: en-глоссарий, достолненный
 * ru-определениями по недостающим id. Порядок: как в en-файле, затем
 * оставшиеся ru id.
 */
function defsFor(locale) {
  const ruDefs = parseDefs(readRootFile('glossary.md') ?? '');
  if (locale !== 'en') return ruDefs;
  const enSrc = readRootFile('glossary.en.md');
  if (!enSrc) return ruDefs;
  const enDefs = parseDefs(enSrc);
  const merged = new Map(enDefs);
  for (const [id, def] of ruDefs) {
    if (!merged.has(id)) merged.set(id, def);
  }
  return merged;
}

export default function glossaryDefsPlugin(ctx) {
  const file = ctx?.fileURL ? fileURLToPath(ctx.fileURL) : '';
  const locale = /[\\/]chapters[\\/]en[\\/]/.test(file) ? 'en' : 'ru';
  const defs = defsFor(locale);

  return {
    name: 'glossary-defs',
    text(node, pluginCtx) {
      if (!node.value.includes('[^g-')) return undefined;
      const parts = [];
      let last = 0;
      marker.lastIndex = 0;
      let m;
      while ((m = marker.exec(node.value))) {
        if (m.index > last) parts.push({ type: 'text', value: node.value.slice(last, m.index) });
        parts.push({ type: 'footnoteReference', identifier: `g-${m[1]}`, label: `g-${m[1]}` });
        last = marker.lastIndex;
      }
      if (last < node.value.length) parts.push({ type: 'text', value: node.value.slice(last) });
      pluginCtx.replaceNode(node, parts);
      return undefined;
    },
    after(root, pluginCtx) {
      if (!pluginCtx.source.includes('[^g-')) return;
      if (defs.size === 0) return;
      pluginCtx.appendChild(root, { raw: `\n\n${[...defs.values()].join('\n')}` });
    },
  };
}
