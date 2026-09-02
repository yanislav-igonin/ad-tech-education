import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import pagefind from 'astro-pagefind';
import sitemap from '@astrojs/sitemap';
import glossaryDefsPlugin from './src/lib/remark-glossary.mjs';

// Custom domain: https://adtech101.h0b0.dev/
export default defineConfig({
  site: 'https://adtech101.h0b0.dev',
  base: '/',
  i18n: {
    locales: ['ru', 'en'],
    defaultLocale: 'ru',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    pagefind(),
    sitemap({
      i18n: {
        defaultLocale: 'ru',
        locales: { ru: 'ru-RU', en: 'en-US' },
      },
    }),
  ],
  markdown: {
    processor: satteri({ mdastPlugins: [glossaryDefsPlugin] }),
  },
});
