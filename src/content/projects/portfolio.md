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
  - version: 3.55.4
    date: 2026-01-18T21:13:00.000+01:00
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
    date: 2025-10-24
    changes:
      - type: added
        text: Home mínima, listado de proyectos y blog.
      - type: added
        text: Contacto con Netlify Forms (honeypot + /thanks).
      - type: docs
        text: "Primera entrada del blog: lanzamiento v0.1.1."
---

## Resumen
Portfolio personal en **Astro 5** que impulsa el rendimiento web, la optimización SEO y una experiencia de usuario cuidada. El sitio agrupa artículos técnicos, proyectos personales y servicios profesionales, añadiendo un buscador instantáneo, un panel de métricas y un conjunto de componentes reutilizables. La arquitectura está pensada para ser rápida, accesible y fácil de mantener.

## Contexto
Este proyecto es mi carta de presentación como **arquitecto Salesforce y especialista en performance web**. La web se despliega en **Netlify** a partir de una rama `main` protegida; el flujo de trabajo sigue **DEV → STAGING → PROD**, con revisión en staging mediante autenticación y pruebas automatizadas. El repo sigue SemVer y cada versión se documenta mediante notas de lanzamiento públicas. Las guías de marca se respetan en cada iteración, con modo oscuro por defecto y paleta Charcoal/Sand/Teal

## Stack
- **Astro 5** como framework principal, con rutas estáticas y colecciones de contenido tipadas.
- **MDX** para posts y páginas enriquecidas.
- **TypeScript** en todo el código.
- **Tailwind CSS 4** y archivos de tokens CSS para colores y espaciados consistentes.
- **Netlify** para el despliegue (build, Edge Functions y Netlify Functions).
- **Netlify Functions** para formularios de contacto y recolección de RUM.
- **Core Web Vitals** y Real User Monitoring mediante script `rum-core-web-vitals.ts` y panel `/metrics/rum`.
- **Playwright** y **Lighthouse CI** para pruebas end‑to‑end y presupuestos de rendimiento.
- **GitHub Actions** con workflows segmentados para linting, typecheck, tests unitarios, e2e, Lighthouse y revisiones editoriales.

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

## Resultados (v3.55.4)

- **Búsqueda instantánea**: se añade un buscador en `/search` que indexa posts, proyectos y páginas, facilitando el acceso a contenidos.
- **Nuevas páginas**: se incorporan secciones de **Sobre mí** y **Servicios** que describen mi trayectoria y las soluciones que ofrezco.
- **UI Kit modular**: implementación de componentes accesibles (botones, tarjetas, badges, inputs, alertas) basados en tokens de diseño; mejora de consistencia y reusabilidad.
- **Métricas RUM integradas**: panel `/metrics/rum` para consultar Core Web Vitals y latencias reales; envío opcional a endpoint propio según preferencias de cookies.
- **Flujo DevOps maduro**: workflows separados en GitHub Actions para lint, typecheck, unit tests, pruebas e2e y auditorías de rendimiento; CI se ejecuta en ramas dev, staging y main:.
- **Despliegue optimizado**: configuración de Netlify con redirecciones SEO, cabeceras de seguridad, plugin Lighthouse y protección de staging mediante Edge Functions.
- **Contenido ampliado**: más de 25 artículos técnicos publicados en MDX, con imágenes localizadas y enlaces automáticos; mejora de SEO mediante meta tags, OG/Twitter y JSON‑LD.

## Roadmap corto

- **PWA y offline**: habilitar capacidades de aplicación web progresiva, con caché de assets y carga sin conexión.
- **Analítica avanzada**: explorar integración con paneles de FinOps o dashboards para visualizar costes de nube y rendimiento.
- **Pruebas de accesibilidad**: ampliar la cobertura de a11y usando herramientas como Axe y automatizar informes en la CI.
