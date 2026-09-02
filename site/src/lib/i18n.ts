// Минимальная i18n-инфраструктура: строки UI по локалям + отображение
// путей между локалями (для канонических ссылок, hreflang и переключателя
// языка). Никаких фреймворков — обычный const-map.
//
// Соглашения:
// - ru живёт в корне (/), en — под префиксом /en/.
// - Шаблоны строк используют плейсхолдеры {name}; подстановка — fill().
// - Путь-аналог в другой локали может не существовать (главы переводятся
//   волнами) — тогда en-аналог равен null.

export type Locale = 'ru' | 'en';

export const LOCALES: Locale[] = ['ru', 'en'];

/** Подстановка плейсхолдеров {name} в шаблоне строки. */
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) =>
    Object.prototype.hasOwnProperty.call(vars, k) ? String(vars[k]) : `{${k}}`,
  );
}

export const UI = {
  ru: {
    homeTitle: 'AdTech Education — книга',
    homeKicker: 'Учебник · редакция от {year}',
    homeH1: 'AdTech: как устроены рекламные технологии',
    homeLede:
      'От участников экосистемы и базовых метрик — к механике рекламных кампаний. Читайте последовательно или прыгайте к нужной главе: прогресс сохраняется в вашем браузере.',
    progressTemplate: '{done} из {total}',
    chaptersRead: 'глав прочитано',
    downloadEpub: 'Скачать EPUB',
    downloadPdf: 'Скачать PDF',
    markReadAria: 'Отметить главу «{title}» прочитанной',
    brandSubtitle: 'Книга по рекламным технологиям',
    partLabel: 'Часть {n}',
    reference: 'Справочник',
    glossary: 'Глоссарий',
    searchAria: 'Поиск (Cmd/Ctrl+K)',
    search: 'Поиск',
    searchDialogAria: 'Поиск по учебнику',
    searchPlaceholder: 'Поиск по главам и глоссарию…',
    searchHintNav: 'навигация',
    searchHintOpen: 'открыть',
    searchHintClose: 'закрыть',
    searchEmpty: 'Ничего не нашлось',
    searchGlossaryMeta: 'Глоссарий',
    glossaryTip: 'Глоссарий →',
    chapterCrumb: '{part} · Глава {chapter}',
    statusLabel: 'Статус: {status}',
    prerequisites: 'Пререквизиты:',
    readLabel: 'Прочитано',
    chapterTocAria: 'Содержание главы',
    chapterTocTitle: 'Содержание главы',
    pagerPrev: '← Глава {n}',
    pagerNext: 'Глава {n} →',
    glossaryDocTitle: 'Глоссарий — AdTech Education',
    glossaryMeta:
      'Единый список определений курса. В главах термины помечены сноской — наведите на неё, чтобы увидеть определение.',
  },
  en: {
    homeTitle: 'AdTech Education — Book',
    homeKicker: 'Textbook · {year} edition',
    homeH1: 'AdTech: How Advertising Technology Works',
    homeLede:
      'From ecosystem participants and core metrics to the mechanics of ad campaigns. Read in order or jump straight to a chapter — your progress is saved in your browser.',
    progressTemplate: '{done} of {total}',
    chaptersRead: 'chapters read',
    downloadEpub: 'Download EPUB',
    downloadPdf: 'Download PDF',
    markReadAria: 'Mark chapter “{title}” as read',
    brandSubtitle: 'A book about advertising technology',
    partLabel: 'Part {n}',
    reference: 'Reference',
    glossary: 'Glossary',
    searchAria: 'Search (Cmd/Ctrl+K)',
    search: 'Search',
    searchDialogAria: 'Search the textbook',
    searchPlaceholder: 'Search chapters and glossary…',
    searchHintNav: 'navigate',
    searchHintOpen: 'open',
    searchHintClose: 'close',
    searchEmpty: 'No results',
    searchGlossaryMeta: 'Glossary',
    glossaryTip: 'Glossary →',
    chapterCrumb: '{part} · Chapter {chapter}',
    statusLabel: 'Status: {status}',
    prerequisites: 'Prerequisites:',
    readLabel: 'Read',
    chapterTocAria: 'Chapter contents',
    chapterTocTitle: 'Chapter contents',
    pagerPrev: '← Chapter {n}',
    pagerNext: 'Chapter {n} →',
    glossaryDocTitle: 'Glossary — AdTech Education',
    glossaryMeta:
      'The shared list of course definitions. Terms in chapters carry a footnote — hover over it to see the definition.',
  },
} as const;

export type Ui = (typeof UI)['ru'];

const withSlash = (p: string) => (p.endsWith('/') ? p : `${p}/`);

/**
 * Путь en-аналога для ru-страницы, или null, если аналога ещё нет.
 * enSlugs — множество slug'ов уже переведённых глав.
 */
export function enCounterpart(ruPath: string, enSlugs?: ReadonlySet<string>): string | null {
  const p = withSlash(ruPath);
  if (p === '/') return '/en/';
  const m = p.match(/^\/chapter\/([\w-]+)\/$/);
  if (m) return enSlugs?.has(m[1]) ? `/en/chapter/${m[1]}/` : null;
  if (p === '/glossary/') return '/en/glossary/';
  return null;
}

/** Путь ru-аналога для en-страницы (ru-версии существуют всегда). */
export function ruCounterpart(enPath: string): string {
  const p = withSlash(enPath);
  if (p === '/en/' || p === '/en') return '/';
  const m = p.match(/^\/en\/chapter\/([\w-]+)\/$/);
  if (m) return `/chapter/${m[1]}/`;
  if (p === '/en/glossary/' || p === '/en/glossary') return '/glossary/';
  return p === '/en' || p.startsWith('/en/') ? p.replace(/^\/en(?=\/|$)/, '') : p;
}

