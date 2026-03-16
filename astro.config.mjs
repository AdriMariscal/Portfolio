// astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import AstroPWA from '@vite-pwa/astro';
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
    AstroPWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Adrián Mariscal · Diseñador Web Performance',
        short_name: 'AM Portfolio',
        description: 'Web performance end-to-end con Astro y Node para sitios rápidos, claros y listos para convertir.',
        theme_color: '#2F3437',
        background_color: '#2F3437',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        lang: 'es',
        icons: [
          { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Excluir HTML del precache: el SW servía respuestas cacheadas con CSP obsoleta.
        // Las páginas se obtienen por NetworkFirst (runtimeCaching) con headers frescos de Netlify.
        globIgnores: ["**/*.html"],
        runtimeCaching: [
          {
            // Clean URLs (pages) — paths without file extensions
            urlPattern: /\/[^.]*$/,
            handler: 'NetworkFirst',
            options: { cacheName: 'pages-cache', expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 } },
          },
          {
            urlPattern: /\.(?:css|js)$/,
            handler: 'CacheFirst',
            options: { cacheName: 'static-assets', expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 } },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif|ico)$/,
            handler: 'CacheFirst',
            options: { cacheName: 'image-cache', expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 30 } },
          },
          {
            urlPattern: /\.(?:woff|woff2|ttf|otf)$/,
            handler: 'CacheFirst',
            options: { cacheName: 'font-cache', expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 } },
          },
        ],
      },
      devOptions: { enabled: false },
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
