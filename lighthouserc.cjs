// lighthouserc.cjs
/** Configuración de Lighthouse CI para el portfolio de Adrián.
 *
 * - collect.staticDistDir: usa la build estática generada por `npm run build` (carpeta `dist`).
 * - collect.url: lista de rutas a auditar (relativas a la raíz de `dist`).
 * - assert.assertions: umbrales mínimos para accesibilidad y SEO.
 * - upload.target: sube los informes a un almacenamiento temporal para poder consultarlos.
 */
module.exports = {
  ci: {
    collect: {
      // Build estática de Astro (Netlify también publica `dist`)
      staticDistDir: './dist',

      // Rutas a auditar (puedes añadir más, por ejemplo '/blog')
      url: ['/',],

      // Opcional: varias pasadas para reducir la variabilidad
      numberOfRuns: 2,
    },

    assert: {
      assertions: {
        // Exige al menos 90/100 en accesibilidad y SEO
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },

    upload: {
      // Almacén temporal (enlaces a los informes en los logs de CI)
      target: 'temporary-public-storage',
    },
  },
};
