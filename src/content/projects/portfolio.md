---
title: "Portfolio Personal"
description: "Sitio personal hecho con Astro. Blog, proyectos y contacto."
tags: ["astro", "netlify", "edge-functions", "seo", "lighthouse", "portfolio", "ci‑cd", "github‑actions", "ux", "a11y"]
repoUrl:
demoUrl:
projectUrl: "https://adrianmariscal.es"
featured: true
published: true
date: 2025-10-24
status: "active"
changelog:
  - version: "v2.16.0"
    date: "2025-12-10"
    changes:
      - { type: "added", text: "Componente de consentimiento de cookies con gestión granular y enlace a políticas." }
      - { type: "changed", text: "Dominio principal migrado a adrianmariscal.es y redirecciones configuradas." }
      - { type: "added", text: "Integración de Playwright y Lighthouse en GitHub Actions para pruebas e2e y presupuestos de rendimiento." }
      - { type: "added", text: "Nuevos componentes Callout y FolderTree y mejoras de accesibilidad (QuoteHighlight, botón de cookies en el footer)." }
      - { type: "changed", text: "Markdown mejorado: enlaces automáticos en encabezados y optimización de imágenes." }
      - { type: "fixed", text: "Refactor de Netlify Edge Functions y autenticación de staging con variables de entorno seguras." }
      - { type: "added", text: "Analítica RUM de Core Web Vitals y reCAPTCHA en formularios." }
      - { type: "docs", text: "Actualización de contenidos y notas de lanzamiento v2.16.0." }
  - version: "v1.0.10"
    date: "2025-11-06"
    changes:
      - { type: "changed", text: "Migración a Astro 4 con content collections tipadas mediante content.config.ts." }
      - { type: "added", text: "Paginación del blog y páginas de etiquetas con slugificación coherente." }
      - { type: "changed", text: "Nuevo sistema de diseño: componentes Hero, ProjectCard y PostCard refinados; tokens CSS para contenedores y espaciados." }
      - { type: "added", text: "SEO avanzado: meta canonical, OG/Twitter tags y JSON-LD en posts; botón 'Volver' contextual." }
      - { type: "added", text: "Utilidades en /lib/content.ts para slugify, contar proyectos y enlaces de vuelta." }
      - { type: "docs", text: "Notas de lanzamiento v1.0.10 y reorganización de blog/páginas." }
  - version: "v0.4.1"
    date: "2025-11-01"
    changes:
      - { type: "changed", text: "Rediseño visual completo (home, tarjetas y tipografía) siguiendo la guía de marca." }
      - { type: "added", text: "Listado de blog mejorado (grid), etiquetas clicables y página /tags/[tag] con diseño consistente." }
      - { type: "added", text: "Sección legal completa: Aviso legal, Privacidad, Cookies y Términos." }
      - { type: "added", text: "Protección de STAGING con Netlify Edge Functions + variables de entorno." }
      - { type: "changed", text: "Página de proyectos: separación Activos/Inactivos y maquetación con márgenes adecuados." }
      - { type: "changed", text: "Detalle de proyecto: ficha armonizada y changelog con estilos; soporte de enlace principal (projectUrl)." }
      - { type: "fixed", text: "Estado 'activo' del menú robusto en local, staging y producción." }
      - { type: "docs", text: "Entrada del blog v0.4.1 (release notes) y contenidos legales." }
  - version: "v0.1.1"
    date: "2025-10-24"
    changes:
      - { type: "added", text: "Home mínima, listado de proyectos y blog." }
      - { type: "added", text: "Contacto con Netlify Forms (honeypot + /thanks)." }
      - { type: "docs", text: "Primera entrada del blog: lanzamiento v0.1.1." }
---

## Resumen
Portfolio en **Astro** con enfoque en rendimiento, SEO y accesibilidad. Incluye blog técnico, catálogo de proyectos y se apoya en content collections tipadas. Evoluciona por iteraciones, manteniendo un diseño consistente, una base legal al día y una arquitectura preparada para escalar.

## Contexto
El sitio es mi carta de presentación como **arquitecto Salesforce y desarrollador web**. A nivel operativo, mantengo un flujo **DEV → STAGING (protegido) → PROD** con CI/CD en GitHub Actions, tests automatizados y versionado SemVer con notas de versión públicas.

## Stack
- **Astro** (content collections, rutas estáticas tipadas, remark y rehype para Markdown)
- **TypeScript**
- **Netlify** (build/deploy, Forms y gestión de cookies)
- **Edge Functions** (protección de STAGING y autenticación)
- **Playwright & Lighthouse** (tests e2e y presupuestos de rendimiento)
- **GitHub Actions** (CI/CD con Playwright y Lighthouse)

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
- **SEO avanzado:** meta canonical, OG/Twitter tags y JSON‑LD para posts; estructura de enlaces amigable y botón “Volver” para mejorar la navegación.
- **Accesibilidad y UX:** colores y contraste revisados, jerarquías de encabezados lógicas y navegación con teclado optimizada.

## Resultados (v2.16.0)

- **Cumplimiento y privacidad:** implementación de un banner de cookies con gestión granular (analítica y marketing), integración de reCAPTCHA en formularios y actualización de políticas legales.
- **Performance y pruebas:** se añaden tests end‑to‑end con Playwright y presupuestos de rendimiento con Lighthouse CI en GitHub Actions, además de un script RUM para monitorizar Core Web Vitals en producción.
- **UX y accesibilidad:** nuevos componentes Callout, FolderTree y QuoteHighlight enriquecen el blog; mejor distribución del contenido y botón para configurar cookies desde el footer; mejoras de contraste y navegación.
- **SEO y contenido:** migración al dominio canónico **adrianmariscal.es**, actualización de metadatos y canonical; optimización de imágenes y autogeneración de enlaces en encabezados gracias a remark/rehype; reorganización de artículos y etiquetas.
- **Arquitectura y DevOps:** refactor de Edge Functions para login protegido en staging, variables de entorno seguras y adopción de GitHub Actions como pipeline principal.

## Roadmap corto
- **Buscador interno** en el blog.
- **Mejorar la cobertura de pruebas**: ampliar tests end‑to‑end y presupuestos de rendimiento para mayor robustez.
- **Gestión de contenido**: desarrollar herramientas o integrar un CMS que facilite la edición de posts y proyectos.
