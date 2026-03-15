# Diario de desarrollo — v4.x

Notas rápidas de cambios durante el desarrollo de la línea major v4.
Regla: todas las versiones MINOR se registran; PATCH solo cuando aporte.

## v4.26.0 — 2026-03-15
- T-022 [PERF]: Auditoría y subconjunto de carga de web fonts (Sora, Inter).
- Migración de Google Fonts CDN a self-hosting vía Fontsource: elimina 2 orígenes externos (fonts.googleapis.com + fonts.gstatic.com), 1 stylesheet render-blocking y 2 preconnects.
- Pesos cargados alineados con guía de marca: Inter 400/500/600 (UI), Sora 600/700/800 (Display). Se elimina Inter 700 (no especificado en brand guide §11).
- Nuevo token `--font-mono` en tokens.css; bloques de código unificados con el token en vez de pilas hardcodeadas.
- CSP, Link headers y reglas Workbox actualizados para reflejar el self-hosting.
- Peso total de fuentes descargado por el navegador (subset latin): ~115 KB (<120 KB objetivo).
- Refs: #598

## v4.24.0 — 2026-03-15
- T-020 [FEAT]: tabla de contenidos auto-generada para posts de blog largos (≥3 headings H2).
- Componente `TableOfContents.astro` extraído: sticky sidebar en desktop (≥1024px), colapsable en móvil.
- Highlight del heading activo con IntersectionObserver (smooth scroll, indicador visual).
- Layout de post refactorizado a grid 2 columnas en desktop para acomodar sidebar ToC.
- Anchors verificados con `rehypeHeadingIds` + `rehype-autolink-headings` existentes.
- Refs: #596
  - Patch v4.24.1 — Fix: ToC invisible en Chrome 131+ (`<details>` usa `content-visibility`; ahora se renderiza con `open` + JS cierra en móvil). Fix: página "Sin conexión" en navegación a posts por `navigateFallback: '/offline'` en Workbox que interceptaba todas las navegaciones en modo App Shell (incompatible con MPA); eliminado en favor de `NetworkFirst` por runtimeCaching para URLs limpias.

## v4.23.0 — 2026-03-15
- T-019 [FEAT]: PWA completa con Service Worker + offline cache (Workbox) — sitio instalable en Chrome/Edge.
- Integración `@vite-pwa/astro` v1.2.0 con estrategia `generateSW`: auto-genera `sw.js` y `manifest.webmanifest` en build.
- Manifest configurado con `theme_color`/`background_color: #2F3437` (Charcoal 900), `display: standalone`, iconos 192×192 y 512×512 generados desde el logo SVG existente vía sharp.
- Estrategias de caché Workbox: `NetworkFirst` para HTML, `CacheFirst` para CSS/JS, imágenes, fuentes y Google Fonts; 124 entradas precacheadas (~3.2 MB).
- Nueva página `/offline` con diseño coherente (icono WiFi off, mensaje en español, botón reintentar) que se muestra automáticamente al navegar sin conexión.
- CSP actualizada con `worker-src 'self'`; umbral PWA añadido en `lighthouserc.cjs` (≥ 0.85) y `netlify.toml`.
- Eliminado `site.webmanifest` manual (el plugin lo genera); `apple-touch-icon` corregido a `pwa-192x192.png`.
- Refs: #595

## v4.22.0 — 2026-03-15
- T-018 [FEAT]: sección de prueba social / testimonios en Home y /services (guía §14 Q5).
- Componente `Testimonial.astro` con datos tipados: nombre/iniciales (anonimizable), empresa/sector, texto, resultado cuantificado opcional; flag `draft` para no publicar hasta tener consentimiento.
- En producción (amariscalcantudo.es, ENVIRONMENT=production) la sección solo se muestra si hay al menos un testimonio no draft; en dev/staging (dev.adrianmariscal.es, staging.adrianmariscal.es) se muestra siempre, incluyendo placeholders draft.
- Variable de build `PUBLIC_SITE_ENV` inyectada desde `ENVIRONMENT` en `astro.config.mjs`; `netlify.toml` ya define `context.production` / `context.dev` / `context.branch:staging`.
- Plantilla `docs/plantilla-testimonio.md` con proceso de obtención de consentimiento y anonimización.
- Refs: #594

## v4.19.0 — 2026-03-14
- T-009 [BRAND]: logo del navbar reemplazado de PNG a SVG (`logo_cuadrado_transparente.svg`).
- Añadido logo SVG al footer (no existía previamente) con `loading="lazy"` y clase `footer__logo` a 60px de alto.
- SVG creado con PNG embebido en base64 (solución transitoria equivalente a `favicon.svg`); sustituir por vector real cuando se exporte desde archivos fuente.
- Verificado: `width/height="800"` + CSS `height:auto/60px` garantizan mínimo 160px y no deforma la imagen; `filter:invert()` en light mode aplicado a ambos logos.
- Refs: #585 / https://github.com/AdriMariscal/Portfolio/issues/585

## v4.18.0 — 2026-03-14
- T-008 [BRAND]: auditoría de componentes Button/CTA contra especificación de diseño v2.0.
- Corregido `.btn--secondary`: `border-color` ahora usa `var(--palette-sand-500)` (#E2CC96) en lugar del token genérico `--color-border`; cumple "outline Sand 500" de §12.
- Corregido `.btn--tertiary`: `color` ahora usa `var(--color-accent)` (Teal) en lugar de `--color-heading`; cumple "link Teal" de §12.
- El resto de la especificación ya estaba correcta: altura 44px, radius 12px (--radius-md), focus ring Teal (`--color-focus`/`--color-focus-ring`), primary Sand 500 (#E2CC96).
- Refs: #584 / https://github.com/AdriMariscal/Portfolio/issues/584

## v4.0.0 — 2026-03-13
- Inicio de la línea major v4 (bump:major).
- Motivo: comienzo del MVP v4 — aplicación de guía de marca v2.0 (paleta Sand desaturada, light mode rediseñado, principio de contención de color).

## v4.1.0 — 2026-03-13
- T-001 [BRAND]: tokens CSS actualizados a guía de marca v2.0 (`--palette-sand-100` `#FBE7B5→#F0ECE4`, `--palette-sand-200` `#E8D3A3→#C9B07A`, `--palette-sand-500` `#FBE7B5→#E2CC96`).
- Paleta Sand desaturada en cascada: rgba del tema light (overlay, header-bg, menu-bg) actualizados a los nuevos valores rgb de Sand 100.
- Comentario del archivo de tokens actualizado de v1.6 a v2.0.
- Refs: #577 / https://github.com/AdriMariscal/Portfolio/issues/577

## v4.3.0 — 2026-03-13
- T-003 [BRAND]: light mode 'Neutral funcional' aplicado end-to-end — fondo `#F0ECE4` (Sand 100), cards blanco (`#FFFFFF`), texto Charcoal 900.
- Corregidos `--color-bg`, `--color-surface`, `--color-surface-alt` y `--color-canvas` en `[data-theme="light"]`; eliminado el uso residual de Sand 200 y Sand 500 como fondos en modo claro.
- Resultado: ninguna sección muestra fondo perceptiblemente amarillo en light mode; el toggle de tema ya no produce regresión visual.
- Refs: #579 / https://github.com/AdriMariscal/Portfolio/issues/579

## v4.4.0 — 2026-03-14
- T-004 [BRAND]: auditada y corregida la regla de contención de color (máx. 2 marcas por sección) en Home, /services y /projects.
- Botón primario cambiado de gradiente Teal a Sand 500 (corrección fundamental: el CTA principal es el acento de marca Sand, no el color interactivo Teal).
- Barras decorativas de `.section__title` (barra vertical + subrayado) convertidas de Teal a gradiente Sand 500→Sand 200.
- Icono del theme-toggle, bandas de tarjetas de proyecto/gracias y punto decorativo de About: Teal reemplazado por Sand.
- Tags/chips: fondo y borde cambiados de teal-soft (`rgba(45,212,191,0.18)`) a sand-soft (`rgba(226,204,150,0.12)`).
- Glow del hero en dark mode: teal `rgba(45,212,191,0.24)` → sand cálido `rgba(226,204,150,0.10)`.
- Resultado: ninguna sección muestra Charcoal + Sand + Teal simultáneamente en reposo; Teal queda exclusivamente en estados hover/focus/activo.
- Refs: #580 / https://github.com/AdriMariscal/Portfolio/issues/580

## v4.5.0 — 2026-03-14
- T-005 [BRAND]: auditoría y corrección del uso de Teal — solo interacción y estado, nunca decorativo.
- `--color-success` corregido de `teal-500` a `--palette-success-500` (`#22C55E`); sus derivados `--color-success-border` y `--color-success-soft` actualizados a RGBA de verde (#22C55E).
- Light mode: `--color-accent`, `--color-accent-strong` y `--color-focus` cambiados de `teal-500` a `teal-600` (`#0F766E`) para cumplir la guía (mejor contraste en fondo Sand 100) y coherencia con la regla de Teal por modo.
- Todos los RGBA derivados de teal-500 en light mode actualizados a RGBA de teal-600.
- Resultado: `--color-success` ya no es Teal (era incorrecto semánticamente); en light mode el foco y las interacciones usan el teal con contraste adecuado (4.65:1 AA sobre Sand 100 según §10.1).
- Refs: #581 / https://github.com/AdriMariscal/Portfolio/issues/581

## v4.6.0 — 2026-03-14
- T-007 [BRAND]: formulario de contacto rediseñado con campos de cualificación de lead (URL, Stack, Objetivo, Plazo, Presupuesto).
- Objetivo pasa a ser campo requerido; URL y Plazo son campos nuevos opcionales.
- Placeholders alineados con la guía de marca §6; mensaje de confirmación actualizado a "Recibido. En breve te respondo con los siguientes pasos."
- Honeypot `bot-field` añadido al formulario y verificado en la Netlify Function; hidden input `form-name` para registro en Netlify Forms.
- Netlify Function actualizada para recoger y reenviar `url`, `deadline`, `goal` como obligatorio; bloque Slack ampliado con los nuevos campos.
- Refs: #583 / https://github.com/AdriMariscal/Portfolio/issues/583

## v4.7.0 — 2026-03-14
- T-010 [SEO]: meta title del Home optimizado para keyword al inicio — cambiado de "Rendimiento web · Portfolio de Adrián Mariscal" (47 chars) a "Diseñador Web Performance · Adrián Mariscal" (44 chars).
- Keyword principal "Diseñador Web" en los primeros 25 caracteres (criterio: ≤30); título ≤60 caracteres (44 chars) — cumple §7 de la guía de marca.
- Añadida constante `HOME_META_TITLE` en `src/lib/seo.ts`; `SEO_KEYWORD` global sin cambios (no impacta otras páginas).
- Test unitario añadido en `tests/unit/seo.test.ts` verificando los dos criterios de aceptación.
- Refs: #586 / https://github.com/AdriMariscal/Portfolio/issues/586

## v4.11.0 — 2026-03-14
- T-016 [FEAT]: /services alineada con guía de marca v2.0 — packs renombrados a `Corrección / Optimización / Excelencia` (§14), descripciones completas (objetivo + incluye + ideal para), precios visibles (490€ / 990€ / 2.490€).
- Pack "Optimización" destacado como "Más popular" con badge visual y borde de acento.
- Informe Completo etiquetado con precio 149€ y nota de descuento; sección "Servicios futuros" eliminada (era placeholder visible en producción).
- CTA "Consultar disponibilidad" reemplazado por "Pedir presupuesto cerrado" (§6); meta title corregido a "Auditoría web y packs de mejora · Adrián Mariscal" (49 chars, keyword al inicio — §7).
- Constante `SERVICES_META_TITLE` añadida a `src/lib/seo.ts`; schema.org ampliado con `Service` + `Offer` por cada pack.
- Refs: #592 / https://github.com/AdriMariscal/Portfolio/issues/592

## v4.10.0 — 2026-03-14
- T-015 [FEAT]: Decap CMS simplificado a modo editorial `simple` — `publish_mode` cambiado de `editorial_workflow` a `simple`.
- `branch` cambiado de `dev` a `main`: los commits del CMS van directamente a `main` y Netlify auto-despliega en producción sin pasar por staging.
- `site_url` y `display_url` ya apuntaban a `https://adrianmariscal.es` (configuración previa correcta).
- Pendiente (configuración externa): verificar variables de entorno `CMS_SITE_URL` y `CMS_DISPLAY_URL` en contexto `production` de Netlify.
- Refs: #591 / https://github.com/AdriMariscal/Portfolio/issues/591
  - Patch v4.10.1 — añadido workflow `editorial-localize-images-simple.yml` para localizar imágenes remotas en commits directos a `main`

## v4.9.0 — 2026-03-14
- T-012 [SEO]: schema.org `BreadcrumbList` verificado en ambas páginas de detalle; añadido breadcrumb visual (UI) que refleja la jerarquía Inicio › Blog/Proyectos › Título en `/blog/[slug]` y `/projects/[slug]`.
- El JSON-LD `BreadcrumbList` ya existía y es correcto (3 ítems, `item` con URL absoluta); esta versión añade el `<nav aria-label="Ruta de navegación">` visible para que la UI coincida con el schema, cumpliendo el criterio de Rich Results Test.
- CSS `.breadcrumb` añadido en `global.css` con tokens de texto muted, truncado de título largo y hover en `--color-accent`.
- Refs: #588 / https://github.com/AdriMariscal/Portfolio/issues/588

## v4.8.0 — 2026-03-14
- T-011 [SEO]: schema.org `Person` ampliado con `sameAs` (LinkedIn + GitHub) y `jobTitle` corregido a "Diseñador Web" (alineado con guía de marca v2.0).
- Nodo `Organization` en BaseLayout elevado a `["ProfessionalService", "LocalBusiness"]` con `areaServed: "España"` y `priceRange: "€€"` para Google Knowledge Graph y featured snippets de marca.
- URLs de redes sociales centralizadas en `SITE.linkedin` y `SITE.github` (`src/lib/config.ts`); accesibles desde cualquier componente.
- 4 tests unitarios nuevos en `tests/unit/schema-org.test.ts` que verifican los campos críticos del schema.
- Refs: #587 / https://github.com/AdriMariscal/Portfolio/issues/587

## v4.13.0 — 2026-03-14
- T-024 [A11Y]: integrado `@axe-core/playwright` en el CI para auditoría de accesibilidad automatizada.
- Nuevo test `tests/e2e/a11y.spec.ts` que visita 5 páginas principales (/, /about, /services, /blog, /contact) y falla en violaciones "critical" o "serious"; "moderate" y "minor" no bloquean.
- Nuevo workflow `.github/workflows/ci-a11y.yml` que se ejecuta en cada PR a dev/staging/main con reporte como artefacto.
- Script `test:e2e:a11y` añadido a `package.json` para ejecución local aislada.
- Refs: #600 / https://github.com/AdriMariscal/Portfolio/issues/600

## v4.12.0 — 2026-03-14
- T-017 [FEAT]: sección estandarizada "Antes/Después" implementada en fichas de proyecto.
- Nuevo componente `BeforeAfter.astro` con tabla de métricas (Métrica / Antes / Después / Mejora), estilos con tokens del design system y scroll horizontal en móvil.
- Fichas de Portfolio y Cartas Rápidas actualizadas con métricas reales de Lighthouse CI histórico (Performance, LCP, CLS, INP, Bundle JS, Accessibility, SEO).
- `[slug].astro` actualizado para renderizar la sección automáticamente si el frontmatter incluye `beforeAfter`.
- Plantilla de caso de estudio creada en `docs/plantilla-caso-estudio.md` para futuros proyectos.
- Refs: #593 / https://github.com/AdriMariscal/Portfolio/issues/593

## v4.14.0 — 2026-03-14
- T-026 [NETLIFY]: verificación y confirmación del hook de notificación por email del formulario de contacto.
- Hook `submission_created` tipo `email` ya presente y activo: destino `amariscalcantudo@gmail.com`, subject "Nuevo mensaje en Portfolio", ID `6901f8ecb7b9b4445575987e`.
- Netlify CLI (v24.2.0) instalado y autenticado en local: el MCP de Netlify queda operativo para futuras issues de configuración sin intervención manual.
- Refs: #602 / https://github.com/AdriMariscal/Portfolio/issues/602

## v4.15.0 — 2026-03-14
- T-027 [NETLIFY]: CSP implementada en `netlify.toml` — de header vacío a política completa sin `'unsafe-inline'` en `script-src`.
- Scripts inline de Header, CookieConsent y BaseLayout extraídos a módulos TypeScript externos (`src/scripts/header-ui.ts`, `cookie-consent-ui.ts`, `theme-init.ts`) para que Vite los bundlee en `/_astro/`, cumpliendo `script-src 'self'`.
- `onload` inline eliminado del `<link>` de Google Fonts — reemplazado por carga sincrónica con `rel=preload` previo (sin penalización de rendimiento por HTTP/2).
- CSP del admin (`/admin/*`) configurada por separado con directivas relajadas para Decap CMS (unpkg.com, api.github.com, etc.).
- Directives clave añadidas: `frame-ancestors 'none'`, `base-uri 'self'`, `form-action 'self'`, `object-src 'none'`, `upgrade-insecure-requests`.
- Objetivo: Mozilla Observatory ≥ B+ (A esperada).
- Refs: #603 / https://github.com/AdriMariscal/Portfolio/issues/603

## v4.17.0 — 2026-03-14
- T-006 [BRAND]: corregido microcopy del CTA secundario del hero de "Ver metodología de performance" a "Ver mi metodología de performance", alineando con la guía de marca §6.
- Cambio mínimo de 1 carácter ("mi") que refuerza la voz personal de marca en el primer impacto visual del Home.
- Refs: #582 / https://github.com/AdriMariscal/Portfolio/issues/582

## v4.20.0 — 2026-03-14
- T-013 [SEO]: nueva landing page dedicada `/auditoria-web` con anatomía de conversión SEO-first.
- Estructura H1→H2→CTA alineada a featured snippets; schema.org FAQPage con 5 preguntas + WebPage + Service + BreadcrumbList.
- Meta title (≤60ch): "Auditoría Web Gratuita: rendimiento y SEO · Adrián Mariscal". Página indexable con canonical correcto.
- Banner de enlace interno añadido en Home (`/`) y enlace de texto en `/services` para cumplir criterio de mínimo 1 link interno.
- Constante `AUDITORIA_META_TITLE` añadida a `src/lib/seo.ts` siguiendo el patrón existente.
- Refs: #589 / https://github.com/AdriMariscal/Portfolio/issues/589

## v4.25.0 — 2026-03-15
- T-021 [FEAT]: suscripción a newsletter del blog con Buttondown (GDPR-compliant, doble opt-in).
- Netlify Function `newsletter-subscribe` que valida email, honeypot anti-spam y envía IP del cliente a Buttondown para detección de abuso.
- Componente `NewsletterForm.astro` reutilizable con dos variantes: `inline` (al final de cada post) y `compact` (footer del sitio).
- Formulario integrado al final de cada artículo del blog y en el footer global.
- Política de privacidad actualizada: datos tratados, finalidad, base jurídica, proveedor (Buttondown) y plazos de conservación.
- Microcopy alineado con la guía de marca §6: CTA "Suscribirme a novedades", confirmación "Listo. Te avisaré cuando publique algo relevante."
- Refs: #597

## v4.27.0 — 2026-03-15
- T-023 [PERF]: umbral Lighthouse CI para PWA elevado de `warn` a `error` con `minScore: 0.85`.
- El CI ahora **falla** si el score PWA cae por debajo de 85, actuando como regress guard tras la implementación de la PWA en T-019.
- Umbrales del resto de categorías (performance 0.9, accessibility 0.9, SEO 0.9) sin cambios.
- Refs: #599

## v4.16.0 — 2026-03-14
- T-028 [DX]: variables de entorno `CMS_SITE_URL` y `CMS_DISPLAY_URL` actualizadas en Netlify para contexto `production` → valor `https://adrianmariscal.es`.
- Valores de `branch-deploy` (staging) confirmados intactos: `https://staging.adrianmariscal.es`.
- Redeploy de producción forzado vía Netlify CLI; sitio live en `https://adrianmariscal.es` con las nuevas variables activas.
- Refs: #604

## v4.21.0 — 2026-03-14
- T-014 [SEO]: OG images automáticas por página generadas en build time (`satori` + `sharp`). Cubre blog (41 posts), proyectos (3 fichas + índice), 7 páginas estáticas (home, about, services, auditoria-web, contact, /blog/, /projects/).
- Diseño de marca: fondo Charcoal 900, borde lateral Sand 500, badge de tipo, título Sora 700, CTA en Teal 500, footer con autor + dominio.
- Posts con `image:` en frontmatter: pipeline de 3 pasos (sharp resize 1200×630 → overlay negro 55% → composite de texto satori transparente → JPEG ≤600KB). Resuelve dimensiones erróneas, peso excesivo y añade branding consistente sobre la foto.
- Meta titles estandarizados a 50-60 chars en todas las páginas: nuevas constantes `HOME/ABOUT/SERVICES/PROJECTS/BLOG/CONTACT_META_TITLE` + función `buildProjectMetaTitle` para fichas dinámicas de proyecto.
- `og:image` y `twitter:image` resuelven al dominio del deploy actual (`DEPLOY_PRIME_URL` → `Astro.site`); `canonical` siempre a producción.
- Twitter cards actualizadas a `summary_large_image`; JSON-LD (`BlogPosting.image`, `CreativeWork.image`) referencia la OG dinámica.
- Deps añadidas: `satori@0.25.0`, `sharp@0.34.5`.
- Refs: #590

## v4.2.0 — 2026-03-13
- T-002 [BRAND]: verificados con fórmula WCAG 2.1 todos los ratios de contraste de §10.1 de la guía de marca.
- Las 4 combinaciones Sand nuevas pasan su nivel esperado: Sand 500/Charcoal 900 → 7.98:1 AAA; Teal 700/Sand 100 → 4.65:1 AA; Charcoal 900/Sand 100 → 10.69:1 AAA; Charcoal 950/Sand 500 → 9.94:1 AAA.
- Tabla §10.1 actualizada con valores exactos (sin `~`); Teal 500/Charcoal 900 corregido de 7.30:1 AAA → 6.77:1 AA (uso interactivo, no texto primario).
- Nuevo archivo `docs/contraste-v2.md` con informe completo de verificación.
- Refs: #578 / https://github.com/AdriMariscal/Portfolio/issues/578
