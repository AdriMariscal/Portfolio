---
title: Web/Portfolio Personal
description: Sitio personal y profesional hecho con Astro. Blog, proyectos y contacto.
tags:
  - portfolio
  - astro
  - ux
  - seo
  - performance
  - lighthouse
  - netlify
  - ci-cd
  - core-web-vitals
  - github-actions
published: true
active: true
status: active
featured: true
date: ""
projectUrl: https://adrianmariscal.es
repoUrl: null
demoUrl: ""
changelog:
  - version: v4.30.5
    changes:
      - type: added
        text: PWA completa con Service Worker y offline cache (Workbox vía
          @vite-pwa/astro); sitio instalable en Chrome/Edge con página /offline,
          manifest y estrategias CacheFirst/NetworkFirst.
      - type: added
        text: Tabla de contenidos auto-generada para posts de blog largos (≥3 headings
          H2), sticky en desktop y colapsable en móvil, con highlight del
          heading activo vía IntersectionObserver.
      - type: added
        text: Suscripción a newsletter vía Buttondown (GDPR, doble opt-in) integrada al
          final de cada post y en el footer global; nueva Netlify Function
          newsletter-subscribe y política de privacidad actualizada.
      - type: added
        text: Landing page dedicada /auditoria-web con schema.org FAQPage, anatomía
          SEO-first (H1→H2→CTA) y enlaces internos desde Home y /services.
      - type: added
        text: Sección de testimonios en Home y /services con componente tipado, flag
          draft para control de publicación y plantilla de consentimiento y
          anonimización documentada en docs/.
      - type: added
        text: Sección estandarizada "Antes/Después" en fichas de proyecto con tabla de
          métricas comparativas (componente BeforeAfter.astro) y plantilla de
          caso de estudio en docs/.
      - type: added
        text: OG images automáticas por página generadas en build time con  satori y
          sharp para posts, proyectos y páginas estáticas; diseño de marca con
          fondo Charcoal 900 y tipografía Sora; Twitter cards actualizadas a
          summary_large_image.
      - type: changed
        text: "Guía de marca v2.0 aplicada end-to-end: tokens Sand desaturados (#E2CC96,
          #C9B07A, #F0ECE4), light mode 'Neutral funcional', regla           de
          contención de color (máx. 2 marcas por sección) y
          Teal           restringido exclusivamente a interacción. Logo PNG
          reemplazado por SVG en navbar y footer."
      - type: changed
        text: Formulario de contacto rediseñado con campos de cualificación de lead
          (URL, stack, objetivo, plazo, presupuesto), honeypot y microcopy
          alineado con la guía §6; /services alineada con packs
          Corrección/Optimización/Excelencia con precios, descripciones
          completas y CTAs contextuales.
      - type: changed
        text: "SEO reforzado: meta titles keyword-first en todas las páginas, schema.org
          Person + ProfessionalService/LocalBusiness + BreadcrumbList con
          breadcrumb visual, hero con stats performance-first (referencia a
          Salesforce movida a About/Services)."
      - type: changed
        text: Web fonts migradas a self-hosting vía Fontsource (~115 KB subset latin),
          eliminando dependencia de Google Fonts CDN; Decap CMS simplificado a
          modo editorial simple (main → auto-deploy Netlify).
      - type: devops
        text: CSP completa en netlify.toml sin unsafe-inline en script-src; scripts
          inline extraídos a módulos TypeScript. axe-core/playwright integrado
          en CI, cobertura unitaria con umbral 60% (Vitest) y Lighthouse PWA
          elevado a error ≥0.85.
      - type: fixed
        text: Parches CSP para compatibilidad con Decap CMS (config.yml 404, unsafe-eval
          para AJV), scripts inline de Astro (hash explícito) y precache del
          Service Worker (HTML excluido de globIgnores para headers frescos).
      - type: docs
        text: Verificación de contraste WCAG 2.1 con valores exactos
          (docs/contraste-v2.md); plantillas de caso de estudio y testimonio
          creadas en docs/.
  - version: 3.55.6
    date: 2026-01-20T21:13:00.000+01:00
    changes:
      - type: added
        text: Buscador interno de alta velocidad con indexado de posts, proyectos y
          páginas, disponible en la ruta /search.
      - type: added
        text: Nuevas páginas ‘Sobre mí’ y ‘Servicios’ que amplían la información
          profesional y de consultoría.
      - type: added
        text: UI Kit accesible con componentes reutilizables (Botón, Tarjeta, Badge,
          Input, Alert) y tokens de diseño (colores, spacing y tipografías).
      - type: added
        text: Panel de métricas RUM (/metrics/rum) para visualizar Core Web Vitals con
          consentimiento de cookies y envío de datos a una función serverless.
      - type: added
        text: Funciones de Netlify para gestionar el formulario de contacto y la
          recolección de métricas RUM, con autenticación de staging y variables
          de entorno seguras.
      - type: changed
        text: Actualización a Astro 5 y Tailwind CSS 4; refactor de estilos globales y
          tokens para mejorar rendimiento, responsive design y modo oscuro por
          defecto.
      - type: changed
        text: Integración de MDX y publicación de más de 25 artículos técnicos con
          optimización de imágenes, enlaces automáticos en encabezados y
          slugificación coherente.
      - type: devops
        text: "Desglose de workflows en GitHub Actions: lint, typecheck, tests
          unitarios, e2e con Playwright, Lighthouse CI y pipelines editoriales
          para dev→staging→main."
      - type: devops
        text: Reconfiguración de netlify.toml con redirecciones, cabeceras de seguridad
          y plugin Lighthouse adaptado a nuevas rutas.
  - version: v2.16.0
    date: 2025-12-10
    changes:
      - type: added
        text: Componente de consentimiento de cookies con gestión granular y enlace a
          políticas.
      - type: changed
        text: Dominio principal migrado a adrianmariscal.es y redirecciones
          configuradas.
      - type: added
        text: Integración de Playwright y Lighthouse en GitHub Actions para pruebas e2e
          y presupuestos de rendimiento.
      - type: added
        text: Nuevos componentes Callout y FolderTree y mejoras de accesibilidad
          (QuoteHighlight, botón de cookies en el footer).
      - type: changed
        text: "Markdown mejorado: enlaces automáticos en encabezados y optimización de
          imágenes."
      - type: fixed
        text: Refactor de Netlify Edge Functions y autenticación de staging con
          variables de entorno seguras.
      - type: added
        text: Analítica RUM de Core Web Vitals y reCAPTCHA en formularios.
      - type: docs
        text: Actualización de contenidos y notas de lanzamiento v2.16.0.
  - version: v1.0.10
    date: 2025-11-06
    changes:
      - type: changed
        text: Migración a Astro 4 con content collections tipadas mediante
          content.config.ts.
      - type: added
        text: Paginación del blog y páginas de etiquetas con slugificación coherente.
      - type: changed
        text: "Nuevo sistema de diseño: componentes Hero, ProjectCard y PostCard
          refinados; tokens CSS para contenedores y espaciados."
      - type: added
        text: "SEO avanzado: meta canonical, OG/Twitter tags y JSON-LD en posts; botón
          'Volver' contextual."
      - type: added
        text: Utilidades en /lib/content.ts para slugify, contar proyectos y enlaces de
          vuelta.
      - type: docs
        text: Notas de lanzamiento v1.0.10 y reorganización de blog/páginas.
  - version: v0.4.1
    date: 2025-11-01
    changes:
      - type: changed
        text: Rediseño visual completo (home, tarjetas y tipografía) siguiendo la guía
          de marca.
      - type: added
        text: Listado de blog mejorado (grid), etiquetas clicables y página /tags/[tag]
          con diseño consistente.
      - type: added
        text: "Sección legal completa: Aviso legal, Privacidad, Cookies y Términos."
      - type: added
        text: Protección de STAGING con Netlify Edge Functions + variables de entorno.
      - type: changed
        text: "Página de proyectos: separación Activos/Inactivos y maquetación con
          márgenes adecuados."
      - type: changed
        text: "Detalle de proyecto: ficha armonizada y changelog con estilos; soporte de
          enlace principal (projectUrl)."
      - type: fixed
        text: Estado 'activo' del menú robusto en local, staging y producción.
      - type: docs
        text: Entrada del blog v0.4.1 (release notes) y contenidos legales.
  - version: v0.1.1
    date: 2026-03-16T14:22:00.000+01:00
    changes:
      - type: added
        text: Home mínima, listado de proyectos y blog.
      - type: added
        text: Contacto con Netlify Forms (honeypot + /thanks).
      - type: docs
        text: "Primera entrada del blog: lanzamiento v0.1.1."
beforeAfter:
  - metric: Performance
    before: "68"
    after: "97"
    improvement: +29 pts
    description: Puntuación global Lighthouse Performance
    source: Lighthouse CI histórico (v0.1.1 → v3.55.6)
  - metric: LCP
    before: 4.8 s
    after: 1.2 s
    improvement: -75%
    description: Largest Contentful Paint
    source: Lighthouse CI histórico (v0.1.1 → v3.55.6)
  - metric: CLS
    before: "0.28"
    after: "0.02"
    improvement: -93%
    description: Cumulative Layout Shift
    source: Lighthouse CI histórico (v0.1.1 → v3.55.6)
  - metric: INP
    before: 320 ms
    after: 85 ms
    improvement: -73%
    description: Interaction to Next Paint
    source: Lighthouse CI histórico (v3.55.6)
  - metric: Bundle JS
    before: ~540 KB
    after: ~82 KB
    improvement: -85%
    description: Tamaño total de JavaScript transferido
    source: Análisis de build (webpack-bundle / astro build)
  - metric: Accessibility
    before: "82"
    after: "98"
    improvement: +16 pts
    description: Puntuación Lighthouse Accessibility
    source: Lighthouse CI histórico (v0.1.1 → v3.55.6)
  - metric: SEO
    before: "80"
    after: "100"
    improvement: +20 pts
    description: Puntuación Lighthouse SEO
    source: Lighthouse CI histórico (v0.1.1 → v3.55.6)
---
## Resumen
Portfolio personal en **Astro 5** que impulsa el rendimiento web, la optimización SEO y una experiencia de usuario cuidada. El sitio agrupa artículos técnicos, proyectos personales y servicios profesionales, añadiendo un buscador instantáneo, un panel de métricas, suscripción a newsletter y un conjunto de componentes reutilizables. Con la línea major v4, se implementa la guía de marca v2.0 (paleta Sand desaturada, light mode "Neutral funcional", contención de color), se rediseña el embudo de captación (formulario con cualificación de lead, packs cerrados con precios, landing /auditoria-web) y se incorporan PWA con offline cache, OG images automáticas y prueba social estructurada. La arquitectura está pensada para ser rápida, accesible y fácil de mantener.

## Contexto
Este proyecto es mi carta de presentación como **web designer con enfoque performance-first**. La web se despliega en **Netlify** a partir de una rama `main` protegida; el flujo de trabajo sigue **DEV → STAGING → PROD**, con revisión en staging mediante autenticación y pruebas automatizadas. Decap CMS opera en modo editorial simple publicando directamente a main con auto-deploy. El repo sigue SemVer y cada versión se documenta mediante notas de lanzamiento públicas. La guía de marca v2.0 se respeta en cada iteración, con modo oscuro por defecto, paleta Charcoal/Sand/Teal desaturada, regla de contención de color (máx. 2 marcas por sección) y Teal restringido a interacción.

## Stack
- **Astro 5** como framework principal, con rutas estáticas y colecciones de contenido tipadas.
- **MDX** para posts y páginas enriquecidas.
- **TypeScript** en todo el código.
- **Tailwind CSS 4** y archivos de tokens CSS para colores y espaciados consistentes.
- **Fontsource** para self-hosting de web fonts (Sora, Inter, JetBrains Mono).
- **Netlify** para el despliegue (build, Edge Functions y Netlify Functions).
- **Netlify Functions** para formularios de contacto, newsletter y recolección de RUM.
- **Buttondown** como proveedor de newsletter (GDPR, doble opt-in).
- **@vite-pwa/astro** con Workbox para PWA, Service Worker y offline cache.
- **satori** y **sharp** para generación de OG images automáticas en build time.
- **Core Web Vitals** y Real User Monitoring mediante script `rum-core-web-vitals.ts` y panel `/metrics/rum`.
- **Playwright**, **@axe-core/playwright** y **Lighthouse CI** para pruebas end‑to‑end, accesibilidad automatizada y presupuestos de rendimiento.
- **Vitest** con cobertura de tests unitarios (umbral 60%).
- **GitHub Actions** con workflows segmentados para linting, typecheck, tests unitarios, cobertura, e2e, accesibilidad (axe) y Lighthouse.
- **Decap CMS** en modo editorial simple (publicación directa a main → auto-deploy).

## Resultados (v0.4.1)
- **Diseño** coherente con la guía de marca: tipografías, espaciados y color.
- **UX de contenido**: blog con etiquetas, página de tags y tarjetas legibles.
- **Legal**: Aviso legal, Privacidad, Cookies y Términos publicados.
- **DevOps**: STAGING con login, despliegues automáticos y PR previews.

## Resultados (v0.1.1)
- Sitio navegable y rápido.
- Flujo de versiones automatizado (dev → rc → release).
- Base lista para escalar diseño y contenido.

## Resultados (v1.0.10)
- **Arquitectura escalable:** migración a Astro v4 y adopción de content collections tipadas, con utilidades de contenido reutilizables.
- **Diseño modular:** nuevo sistema de diseño con tokens y componentes (Hero, ProjectCard, PostCard) que unifican la experiencia visual.
- **Blog paginado:** navegación organizada con páginas numeradas y páginas de etiquetas con slugificación coherente.
- **SEO avanzado:** meta canonical, OG/Twitter tags y JSON‑LD para posts; estructura de enlaces amigable y botón "Volver" para mejorar la navegación.
- **Accesibilidad y UX:** colores y contraste revisados, jerarquías de encabezados lógicas y navegación con teclado optimizada.

## Resultados (v2.16.0)

- **Cumplimiento y privacidad:** implementación de un banner de cookies con gestión granular (analítica y marketing), integración de reCAPTCHA en formularios y actualización de políticas legales.
- **Performance y pruebas:** se añaden tests end‑to‑end con Playwright y presupuestos de rendimiento con Lighthouse CI en GitHub Actions, además de un script RUM para monitorizar Core Web Vitals en producción.
- **UX y accesibilidad:** nuevos componentes Callout, FolderTree y QuoteHighlight enriquecen el blog; mejor distribución del contenido y botón para configurar cookies desde el footer; mejoras de contraste y navegación.
- **SEO y contenido:** migración al dominio canónico **adrianmariscal.es**, actualización de metadatos y canonical; optimización de imágenes y autogeneración de enlaces en encabezados gracias a remark/rehype; reorganización de artículos y etiquetas.
- **Arquitectura y DevOps:** refactor de Edge Functions para login protegido en staging, variables de entorno seguras y adopción de GitHub Actions como pipeline principal.

## Resultados (v3.55.6)

- **Búsqueda instantánea**: se añade un buscador en `/search` que indexa posts, proyectos y páginas, facilitando el acceso a contenidos.
- **Nuevas páginas**: se incorporan secciones de **Sobre mí** y **Servicios** que describen mi trayectoria y las soluciones que ofrezco.
- **UI Kit modular**: implementación de componentes accesibles (botones, tarjetas, badges, inputs, alertas) basados en tokens de diseño; mejora de consistencia y reusabilidad.
- **Métricas RUM integradas**: panel `/metrics/rum` para consultar Core Web Vitals y latencias reales; envío opcional a endpoint propio según preferencias de cookies.
- **Flujo DevOps maduro**: workflows separados en GitHub Actions para lint, typecheck, unit tests, pruebas e2e y auditorías de rendimiento; CI se ejecuta en ramas dev, staging y main:.
- **Despliegue optimizado**: configuración de Netlify con redirecciones SEO, cabeceras de seguridad, plugin Lighthouse y protección de staging mediante Edge Functions.
- **Contenido ampliado**: más de 25 artículos técnicos publicados en MDX, con imágenes localizadas y enlaces automáticos; mejora de SEO mediante meta tags, OG/Twitter y JSON‑LD.

## Resultados (v4.30.5)

- **Guía de marca v2.0 completa**: paleta Sand desaturada (#E2CC96, #C9B07A, #F0ECE4), light mode "Neutral funcional" sin amarillo, regla de contención de color (máx. 2 marcas por sección), Teal exclusivamente interactivo, logo SVG en navbar y footer, botones y CTAs auditados contra especificación de diseño; ratios de contraste verificados con fórmula WCAG 2.1 (docs/contraste-v2.md).
- **PWA instalable**: Service Worker con Workbox (NetworkFirst para HTML, CacheFirst para assets), página /offline, manifest con iconos generados desde logo SVG; sitio instalable en Chrome/Edge.
- **Embudo de captación rediseñado**: formulario de contacto con campos de cualificación de lead (URL, stack, objetivo, plazo, presupuesto); /services con packs Corrección/Optimización/Excelencia con precios y descripciones completas; landing /auditoria-web con schema.org FAQPage y anatomía SEO-first.
- **Prueba social estructurada**: sección de testimonios con componente tipado, flag draft para control de publicación, variable de entorno por contexto (producción vs staging) y plantilla de consentimiento documentada.
- **Blog enriquecido**: tabla de contenidos auto-generada (≥3 H2, sticky en desktop), suscripción a newsletter vía Buttondown (GDPR, doble opt-in) en posts y footer, OG images automáticas por página (satori + sharp).
- **SEO reforzado**: meta titles keyword-first en todas las páginas, schema.org Person + ProfessionalService/LocalBusiness + BreadcrumbList con breadcrumb visual, hero con estadísticas performance-first (referencia a Salesforce reubicada en About/Services).
- **Web fonts self-hosted**: migración a Fontsource (~115 KB subset latin), eliminando 2 orígenes externos de Google Fonts CDN.
- **DevOps y calidad**: CSP completa sin unsafe-inline, axe-core/playwright en CI (falla en violaciones critical/serious), cobertura unitaria ≥60% (Vitest), Lighthouse PWA como regress guard (≥0.85), notificación por email del formulario verificada.
- **Corrección**: múltiples parches CSP (v4.30.1–v4.30.5) para compatibilidad con Decap CMS, scripts inline de Astro y precache del Service Worker; fix ToC en Chrome 131+ y navegación offline con Workbox.

## Roadmap corto

- **Analítica avanzada**: explorar integración con paneles de FinOps o dashboards para visualizar costes de nube y rendimiento.
- **Validación de paleta v2.0**: nueva ronda de feedback rápida (2–3 personas) para confirmar que los nuevos Sand resuelven la percepción de saturación en condiciones reales de pantalla.
- **RSS feed**: distribución complementaria a newsletter para lectores técnicos que prefieran agregadores.
