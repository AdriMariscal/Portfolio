// astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@tailwindcss/vite'; // Tailwind v4 (plugin de Vite)
import remarkImages from 'remark-images';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';

export default defineConfig({
  // Dominio canónico en producción
  site: 'https://adrianmariscal.es',

  // Configuración de Markdown / Shiki / plugins
  markdown: {
    // Shiki es el motor por defecto; aquí solo cambiamos el tema
    shikiConfig: {
      // Elige el que prefieras: 'dracula', 'dark-plus', 'one-light', etc.
      theme: 'dracula',
    },
    // Plugins remark aplicados a .md y .mdx
    remarkPlugins: [remarkImages],
    // Plugins rehype aplicados a .md y .mdx
    rehypePlugins: [
      // Asegura IDs de encabezados antes de crear los enlaces
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          // Envuelve el texto del heading en un enlace a sí mismo
          // <h2 id="foo"><a href="#foo">Texto</a></h2>
          behavior: 'wrap',
        },
      ],
    ],
  },

  integrations: [
    mdx(),
    sitemap(),
  ],

  vite: {
    plugins: [tailwind()],
  },
});
