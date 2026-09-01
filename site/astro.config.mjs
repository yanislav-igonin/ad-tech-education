import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import glossaryDefsPlugin from './src/lib/remark-glossary.mjs';

// Custom domain: https://adtech101.h0b0.dev/
export default defineConfig({
  site: 'https://adtech101.h0b0.dev',
  base: '/',
  markdown: {
    processor: satteri({ mdastPlugins: [glossaryDefsPlugin] }),
  },
});
