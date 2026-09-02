import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Общие поля главы; различие локалей — только в language. Две коллекции
// с одинаковой схемой: ru-главы и en-главы (chapters/en может быть пуст
// или заполняться по ходу — glob-лоадер спокойно отдаёт ноль записей).
const chapterFields = {
  id: z.string(),
  type: z.literal('chapter'),
  part: z.string(),
  chapter: z.number(),
  slug: z.string(),
  title: z.string(),
  status: z.string(),
  toc_requirements: z.array(z.string()),
  prerequisites: z.array(z.string()),
};

const chapters = defineCollection({
  loader: glob({ pattern: '*.md', base: '../chapters/ru' }),
  schema: z.object({ ...chapterFields, language: z.literal('ru') }),
});

const chaptersEn = defineCollection({
  loader: glob({ pattern: '*.md', base: '../chapters/en' }),
  schema: z.object({ ...chapterFields, language: z.literal('en') }),
});

export const collections = { chapters, chaptersEn };
