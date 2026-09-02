// Глоссарий — единый источник определений: glossary.md (ru) и glossary.en.md
// (en) в корне репозитория. Сноски в главах ([^g-id]) получают определения
// отсюда же, поэтому текст термина нигде не дублируется.
//
// Парсим на строковом уровне: markdown-движок сайта не поддерживает
// атрибуты заголовков {#g-id}, а нам нужен явный id термина.
//
// en-файл может отсутствовать (перевод ещё не готов) — тогда en-локаль
// прозрачно откатывается к ru-определениям.

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { markdownToHtml } from 'satteri';
import glossarySrc from '../../../glossary.md?raw';
import type { Locale } from './i18n';


export type GlossaryTerm = {
  /** 'rtb' из заголовка `### RTB (real-time bidding) {#g-rtb}` */
  id: string;
  /** 'RTB (real-time bidding)' */
  title: string;
  /** Определение — первая строка после заголовка. */
  definitionMd: string;
  /** Остальное содержимое статьи (примеры и т.д.). */
  restMd: string;
};


function parseGlossary(src: string): GlossaryTerm[] {
  const terms: GlossaryTerm[] = [];
  let current: { id: string; title: string; lines: string[] } | null = null;

  const flush = () => {
    if (!current) return;
    const body = current.lines.filter((l) => l.trim().length > 0);
    terms.push({
      id: current.id,
      title: current.title,
      definitionMd: body[0] ?? '',
      restMd: body.slice(1).join('\n\n'),
    });
  };

  for (const line of src.split(/\r?\n/)) {
    const heading = line.match(/^###\s+(.+?)\s*\{#g-([\w-]+)\}\s*$/);
    if (heading) {
      flush();
      current = { id: heading[2], title: heading[1], lines: [] };
    } else if (/^#/.test(line)) {
      flush();
    } else if (current) {
      current.lines.push(line);
    }
  }
  flush();
  return terms;
}

let cachedRu: GlossaryTerm[] | null = null;
let cachedEn: GlossaryTerm[] | null | undefined; // undefined = ещё не читали файл

/**
 * Корень репозитория: сборка идёт из site/, но cwd может быть и корнем.
 * Файл глоссария лежит в корне репозитория рядом с site/.
 */
function readRootFile(name: string): string | null {
  for (const base of [process.cwd(), path.resolve(process.cwd(), '..')]) {
    const p = path.join(base, name);
    if (existsSync(p)) return readFileSync(p, 'utf8');
  }
  return null;
}

export function glossaryTerms(locale: Locale = 'ru'): GlossaryTerm[] {
  if (locale === 'en') {
    if (cachedEn === undefined) {
      const enSrc = readRootFile('glossary.en.md');
      // Фолбэк: если en-глоссарий ещё не переведён, показываем ru-термины.
      cachedEn = enSrc ? parseGlossary(enSrc) : null;
    }
    return cachedEn ?? glossaryTerms('ru');
  }
  cachedRu ??= parseGlossary(glossarySrc);
  return cachedRu;
}


/** HTML статьи термина — для страницы глоссария. */
export async function glossaryTermHtml(term: GlossaryTerm): Promise<string> {
  const md = [term.definitionMd, term.restMd].filter((s) => s.length > 0).join('\n\n');
  const { html } = await markdownToHtml(md);
  return html;
}
