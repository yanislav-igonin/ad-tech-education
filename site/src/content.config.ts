import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const chapters = defineCollection({
  loader: glob({ pattern: '*.md', base: '../chapters/ru' }),
  schema: z.object({
    id: z.string(),
    type: z.literal('chapter'),
    part: z.string(),
    chapter: z.number(),
    slug: z.string(),
    title: z.string(),
    language: z.literal('ru'),
    status: z.string(),
    toc_requirements: z.array(z.string()),
    prerequisites: z.array(z.string()),
  }),
});

export const collections = { chapters };
