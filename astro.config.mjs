// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // Static brochure site — no server adapter. Cloudflare Pages serves dist/ directly.
  site: 'https://hillfordpartners.com',

  output: 'static',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.endsWith('/thank-you/') && !page.endsWith('/thank-you'),
    }),
  ],
  adapter: cloudflare()
});