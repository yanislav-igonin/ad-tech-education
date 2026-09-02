import { getCollection, type CollectionEntry } from 'astro:content';
import { UI, fill, type Locale } from './i18n';

export type Chapter = CollectionEntry<'chapters'> | CollectionEntry<'chaptersEn'>;

const BASE = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : import.meta.env.BASE_URL + '/';

export const chapterHref = (ch: Chapter, locale: Locale) =>
  `${BASE}${locale === 'en' ? 'en/' : ''}chapter/${ch.data.slug}/`;

export const downloadHref = (file: string) => `${BASE}downloads/${file}`;

export async function getBook(locale: Locale = 'ru') {
  const entries =
    locale === 'en' ? await getCollection('chaptersEn') : await getCollection('chapters');
  const chapters = entries.sort((a, b) => a.data.chapter - b.data.chapter);
  const parts: { part: string; label: string; chapters: Chapter[] }[] = [];
  for (const ch of chapters) {
    let part = parts.find((p) => p.part === ch.data.part);
    if (!part) {
      part = { part: ch.data.part, label: fill(UI[locale].partLabel, { n: ch.data.part }), chapters: [] };
      parts.push(part);
    }
    part.chapters.push(ch);
  }
  return { chapters, parts };
}

export function navOf(chapters: Chapter[], current: Chapter) {
  const i = chapters.findIndex((c) => c.data.id === current.data.id);
  return {
    prev: chapters[i - 1] ?? null,
    next: chapters[i + 1] ?? null,
  };
}
