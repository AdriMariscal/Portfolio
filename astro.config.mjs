// astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@tailwindcss/vite'; // Tailwind v4 (plugin de Vite)

export default defineConfig({
  // Dominio canónico en producción
  site: 'https://adrianmariscal.es',

  // ⬇️ NUEVO: configuración de Markdown/Shiki
  markdown: {
    // Shiki es el motor por defecto; aquí solo cambiamos el tema
    shikiConfig: {
      // Elige el que prefieras: 'dracula', 'dark-plus', 'one-light', etc.
      theme: 'dracula',
    },
  },

  integrations: [
    mdx(),
    sitemap(),
  ],

  vite: {
    plugins: [tailwind()],
  },
});
