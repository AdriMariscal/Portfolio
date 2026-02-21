---
title: Utilibox
description: Herramientas rápidas, generadores y descargas seguras para resolver
  tareas puntuales en minutos.
tags:
  - astro
  - netlify
  - performance
  - lighthouse
  - seo
  - core-web-vitals
  - a11y
  - ux
  - rgpd
  - release-notes
published: true
active: true
status: active
featured: true
date: 2026-01-10
updated: 2026-02-17T18:04:00.000+01:00
projectUrl: https://utilibox.app/
repoUrl: ""
demoUrl: ""
changelog:
  - version: v1.25.0
    date: 2026-02-17T18:04:00.000+01:00
    changes:
      - type: added
        text: "Migración a línea major v1 con foco en indexación SEO: sitemap.xml
          dinámico con prioridades por ruta, meta tags únicos por página, Open
          Graph y Twitter Cards, JSON-LD (WebApplication + HowTo) por
          herramienta, headings H1–H6 optimizados, linking interno y breadcrumbs
          con schema BreadcrumbList."
      - type: added
        text: "GA4 (configurable vía env) con Consent Mode v2: gtag con consentimiento
          denegado por defecto; eventos page_view, tool_used,
          tool_result_generated, tool_result_downloaded y ad_clicked; cola
          vaciada tras aceptar; expiración de consentimiento a 13 meses."
      - type: added
        text: "Historial local de herramientas sin cuenta: LocalStorage (<100 entradas)
          con migración automática a IndexedDB (≥100); schema {id, tool,
          timestamp, input, output, metadata}; auto-guardado en QR, contraseñas
          y contador; panel en header con filtro, búsqueda, exportar/importar
          JSON y borrado completo."
      - type: added
        text: "Ocho herramientas en total: las tres originales más Generador UUID v4,
          Lorem Ipsum, Hash (MD5/SHA-1/SHA-256), Base64 Encoder/Decoder y JSON
          Formatter/Validator; todas con URL SEO-friendly, schema.org, historial
          local e integración con Clipboard API."
      - type: added
        text: "PWA offline-first con @vite-pwa/astro: Service Worker (sw-pwa.js) con
          cache-first para estáticos y network-first para navegación; página
          /offline/; toast de instalación en primera visita
          (beforeinstallprompt); indicador En línea/Sin conexión en header."
      - type: added
        text: "Modo oscuro automático respetando prefers-color-scheme con toggle manual
          en header; paleta #1a1a1a/#0d0d0d y texto #e0e0e0; preferencia
          persistida en localStorage; transición 0.3s entre modos."
      - type: added
        text: "Verificador HIBP k-Anonymity en generador de contraseñas: badge ✅ Segura
          / ⚠️ Comprometida X veces, opt-in con checkbox, cache en memoria por
          prefijo hash, timeout 5s y fallback offline."
      - type: added
        text: "Análisis de legibilidad en contador de palabras: Flesch Reading Ease y
          Flesch-Kincaid Grade Level; panel expandible con score por color
          (verde >60, amarillo 30-60, rojo <30); activo desde 50 palabras."
      - type: added
        text: "Error monitoring con Sentry (@sentry/astro): DSN vía PUBLIC_SENTRY_DSN,
          source maps con filesToDeleteAfterUpload, beforeSend para filtrar
          errores de extensiones, feedbackIntegration en cliente y window.Sentry
          expuesto para debugging."
      - type: added
        text: "Implementación guía de marca v1.0: design tokens en CSS variables
          (colores, tipografía, espaciado, radios, sombras), tipografía DM Sans
          + JetBrains Mono vía Google Fonts, logo/favicon SVG con gradiente,
          rediseño visual integral con header sticky, tarjetas y filtros
          modernizados."
      - type: changed
        text: "Proveedor de publicidad migrado de Monetag a Ezoic (v1.25.0): Consent
          Mode v2, placementId desde variable de entorno, Banner.astro sin texto
          'pendiente' cuando no hay placement configurado; CSP en netlify.toml
          actualizada con dominios Ezoic."
      - type: changed
        text: "netlify.toml optimizado: headers de seguridad completos (HSTS, CSP,
          X-Content-Type-Options, X-XSS-Protection, Referrer-Policy,
          Permissions-Policy), cache immutable 1 año para estáticos, no-cache
          para HTML, redirects http→https, www→non-www y
          sitemap.xml→sitemap-index.xml."
      - type: removed
        text: "Eliminación completa de Monetag: PushNotifications.astro, Popunder.ts y
          scripts asociados retirados del código; documentación y CSP
          actualizadas sin referencias al proveedor anterior."
      - type: docs
        text: "Documentación técnica completa en /docs/: ADR-001 (Astro), ADR-002
          (Netlify), ARCHITECTURE.md con diagrama Mermaid y estructura /src/,
          BRAND.md, CONTRIBUTING.md, analytics.md, compliance.md,
          lighthouse-cwv.md, ads.md y devlog-v1.md."
  - version: v0.22.0
    date: 2026-01-10
    changes:
      - type: added
        text: Lanzamiento inicial del sitio con base Astro 5.x y generación estática en
          Netlify.
      - type: added
        text: "Tres utilidades disponibles: generador de QR, generador de contraseñas
          con aleatoriedad criptográfica y contador de palabras (beta),
          accesibles sin enviar datos a servidores."
      - type: added
        text: Página de descargas con categorías (VPNs gratuitas, visores, editores y
          plantillas) y enlaces verificados desde fuentes oficiales.
      - type: added
        text: Buscador instantáneo y filtros por categoría que permiten encontrar
          herramientas rápidamente.
      - type: added
        text: "Sistema de monetización basado en red Monetag: formatos Pop-under y Push
          activados tras interacción del usuario, con formato banner en
          preparación."
      - type: added
        text: Gestor de consentimiento de cookies que carga publicidad solo tras la
          aceptación del usuario.
---
## Resumen

Utilibox es una plataforma web de utilidades rápidas y descargas verificadas, construida con Astro 5.x y desplegada estáticamente en Netlify. Ofrece ocho herramientas que se ejecutan íntegramente en el navegador —generador de QR con preview y descarga multi-formato, generador de contraseñas con verificación HIBP, contador de palabras con análisis de legibilidad, UUID v4, Lorem Ipsum, Hash (MD5/SHA), Base64 y JSON Formatter— sin instalar software ni enviar datos sensibles a servidores. Incluye historial local sin cuenta (LocalStorage/IndexedDB), modo oscuro, PWA offline-first y un catálogo de descargas desde fuentes oficiales. La monetización se realiza mediante Ezoic con Consent Mode v2, cargando anuncios solo tras consentimiento explícito del usuario.

## Contexto

Utilibox nació como proyecto personal con objetivos duales: centralizar utilidades online en un único sitio y experimentar con modelos de monetización de bajo coste. Arrancó como MVP en v0.22.0 y evolucionó en la línea major v1 con prioridad en indexación SEO y cumplimiento técnico: sitemap dinámico, meta tags completos, JSON-LD, GA4 con Consent Mode v2 y optimizaciones de rendimiento (Lighthouse/CWV). El flujo de trabajo sigue un pipeline dev → staging → main documentado en AGENTS.md, con versionado SemVer automatizado. La guía de marca v1.0 establece design tokens, tipografía y paleta de colores coherentes en todo el sitio. La publicidad migró de Monetag a Ezoic en v1.25.0, manteniendo el bloqueo de scripts hasta consentimiento RGPD.

## Stack

- **Astro 5.x** como framework de generación estática (SSG), componentes `.astro` con Vite y sin JS innecesario en cliente.
- **Vanilla JavaScript / TypeScript** para la lógica de herramientas (QR, contraseñas, contador, UUID, Hash, Base64, JSON) y utilidades de breadcrumbs y schema.
- **JSON** como fuente de datos estructurados para herramientas (`tools.json`) y descargas (`downloads.json`).
- **Netlify** para alojamiento estático, deploy preview por rama (dev/staging/main) y cabeceras de seguridad (CSP, HSTS) en `netlify.toml`.
- **@vite-pwa/astro** para la integración PWA con Service Worker (Workbox), caché offline y manifiesto de instalación.
- **Sentry** (`@sentry/astro`) para error monitoring en cliente y servidor, con source maps y filtrado de errores de extensiones.
- **GA4** con Consent Mode v2: gtag con consentimiento denegado por defecto, eventos personalizados de herramientas y cola de eventos hasta aceptación del usuario.
- **Ezoic** como red de publicidad: script y anuncios solo tras consentimiento; placementId configurable mediante variable de entorno.
- **LocalStorage / IndexedDB** para el historial local de herramientas sin necesidad de cuenta de usuario.
- **HIBP API** (k-Anonymity) para verificación de contraseñas comprometidas sin enviar la contraseña completa.
- **DM Sans + JetBrains Mono** vía Google Fonts como tipografía del sistema de diseño.

## Resultados (v0.22.0)

- Consolidación de tres herramientas funcionales: generador de QR, generador de contraseñas y contador de palabras (beta), todas ejecutándose en el navegador sin enviar datos sensibles.
- Interfaz unificada con buscador de texto y filtros por categorías que facilita encontrar herramientas.
- Implementación de un catálogo de descargas con más de cuatro categorías (VPNs, visores, editores y plantillas) y verificación de enlaces oficiales para asegurar descargas seguras.
- Integración de formatos de publicidad OnClick (pop-under) y notificaciones push de Monetag con políticas de frecuencia y activación solo tras consentimiento.
- Desarrollo de un banner de cookies/privacidad que cumple RGPD y bloquea scripts hasta la aceptación del usuario.
- Despliegue estático en Netlify con configuraciones de seguridad (HTTPS y CSP) y dominio personalizado utilibox.app.

## Resultados (v1.25.0)

- Plataforma con ocho herramientas funcionales, todas con URL SEO-friendly, schema.org (WebApplication + HowTo), historial local automático e integración con Clipboard API; las tres originales ampliadas con UUID v4, Lorem Ipsum, Hash, Base64 y JSON Formatter.
- Indexación SEO corregida: sitemap.xml dinámico, meta tags únicos, Open Graph y Twitter Cards, breadcrumbs con BreadcrumbList y verificación en Google Search Console implementada.
- Historial local sin cuenta con almacenamiento dual LocalStorage/IndexedDB, exportación/importación JSON y panel completo en header; feature diferenciadora frente a competidores que requieren registro.
- PWA instalable con soporte offline para todas las herramientas client-side; indicador de conectividad en header y página de fallback `/offline/`.
- Modo oscuro automático con override manual, paleta coherente con la guía de marca v1.0 y transición fluida entre modos.
- Error monitoring activo con Sentry, source maps en build y filtrado de ruido de extensiones de navegador.
- Migración a Ezoic como proveedor de publicidad con Consent Mode v2; CSP en netlify.toml actualizada; banner de cookies sin texto residual de proveedor anterior.
- Documentación técnica completa en `/docs/`: ADRs, arquitectura, guía de marca, guía de contribución, analytics, compliance y devlog-v1.md como diario de desarrollo.

## Roadmap corto

- Ampliar el catálogo de herramientas hacia las 15–25 herramientas con foco en long-tail SEO (conversores de unidades, regex tester, URL parser, meta tags generator, placeholder de imágenes, CSV to JSON, etc.).
- Activar y configurar los placement IDs de Ezoic en Netlify y evaluar formatos adicionales (sidebar, in-content) según rendimiento de ingresos.
- Implementar analíticas avanzadas en GA4: configurar conversiones por uso de herramientas, audiencias para remarketing y vinculación con Google Search Console.
- Mejorar el generador QR con personalización de color de fondo/foreground y corrección de errores, y restaurar opciones desde historial (QR settings).
- Internacionalización básica (EN) para ampliar audiencia y capturar tráfico en inglés con las mismas herramientas.
