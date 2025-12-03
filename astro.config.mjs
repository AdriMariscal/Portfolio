// astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@tailwindcss/vite'; // Tailwind v4 (plugin de Vite)

export default defineConfig({
  // Dominio canónico en producción: se usa para sitemap y URLs canónicas
  // https://docs.astro.build/en/reference/configuration-reference/#site
  site: 'https://adrianmariscal.es',

  integrations: [
    mdx(),
    sitemap(),
  ],

  vite: {
    plugins: [tailwind()],
  },
});
