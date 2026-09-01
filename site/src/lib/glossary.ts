// Глоссарий — единый источник определений: glossary.md в корне репозитория.
// Сноски в главах ([^g-id]) получают определения отсюда же, поэтому текст
// термина нигде не дублируется.
//
// Парсим на строковом уровне: markdown-движок сайта не поддерживает
// атрибуты заголовков {#g-id}, а нам нужен явный id термина.

import { markdownToHtml } from 'satteri';
import glossarySrc from '../../../glossary.md?raw';

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

let cached: GlossaryTerm[] | null = null;

export function glossaryTerms(): GlossaryTerm[] {
  cached ??= parseGlossary(glossarySrc);
  return cached;
}

/**
 * Footnote-definitions для главы: satteri рендерит их в секцию сносок,
 * если в тексте главы есть маркеры [^g-id].
 */
export function glossaryDefsMd(): string {
  return glossaryTerms()
    .map((t) => `[^g-${t.id}]: ${t.definitionMd}`)
    .join('\n');
}

/** HTML статьи термина — для страницы глоссария. */
export async function glossaryTermHtml(term: GlossaryTerm): Promise<string> {
  const md = [term.definitionMd, term.restMd].filter((s) => s.length > 0).join('\n\n');
  const { html } = await markdownToHtml(md);
  return html;
}
