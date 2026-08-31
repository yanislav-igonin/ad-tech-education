import { getCollection, type CollectionEntry } from 'astro:content';

export type Chapter = CollectionEntry<'chapters'>;

const BASE = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : import.meta.env.BASE_URL + '/';

export const href = (ch: Chapter) => `${BASE}chapter/${ch.data.slug}/`;

export const downloadHref = (file: string) => `${BASE}downloads/${file}`;

export async function getBook() {
  const chapters = (await getCollection('chapters')).sort(
    (a, b) => a.data.chapter - b.data.chapter,
  );
  const parts: { part: string; label: string; chapters: Chapter[] }[] = [];
  for (const ch of chapters) {
    let part = parts.find((p) => p.part === ch.data.part);
    if (!part) {
      part = { part: ch.data.part, label: `Часть ${ch.data.part}`, chapters: [] };
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
