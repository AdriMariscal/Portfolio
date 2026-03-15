// astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@tailwindcss/vite'; // Tailwind v4 (plugin de Vite)
import remarkImages from 'remark-images';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';

// En Netlify, DEPLOY_PRIME_URL apunta al deploy específico (dev.adrianmariscal.es,
// preview-xxx.netlify.app, etc.). En local y en producción no está definida,
// por lo que se usa el dominio canónico. Esto permite que og:image y otros
// recursos estáticos resuelvan correctamente en cada entorno.
const deployUrl = process.env.DEPLOY_PRIME_URL ?? 'https://adrianmariscal.es';

export default defineConfig({
  site: deployUrl,

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
    sitemap({
      filter: (page) => !page.pathname?.startsWith('/staging/'),
    }),
  ],

  vite: {
    plugins: [tailwind()],
    define: {
      // ENVIRONMENT en Netlify: production (main/amariscalcantudo.es), development (dev), staging (branch:staging)
      // Solo en producción ocultamos la sección de testimonios si todos son draft
      'import.meta.env.PUBLIC_SITE_ENV': JSON.stringify(process.env.ENVIRONMENT || 'development'),
    },
  },
});
