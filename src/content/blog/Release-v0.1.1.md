---
title: "Release v0.1.1 — portfolio MVP (home, projects, blog y contacto)"
description: "Primera versión en producción del portfolio: estructura base en Astro, colecciones de contenido, rutas dinámicas y formulario de contacto con Netlify Forms."
tags: ["astro", "portfolio", "release-notes", "netlify", "github-actions"]
published: true
date: 2025-10-30
---

Acabo de publicar **v0.1.1** de mi web/portfolio: <https://adrianmariscal.es/>.  
Es la **primera versión en producción** y mi punto de partida para consolidar un portfolio público.

Mi objetivo con este MVP es doble: por un lado disponer de un sitio rápido y estático donde pueda **mostrar proyectos reales**, y por otro experimentar con **Astro y Netlify** para construir una base técnica robusta. Para los clientes potenciales y la comunidad dev, esto supone un ejemplo práctico de mis conocimientos de arquitectura web, devops y SEO.

## Qué incluye

- **Home** mínima con cabecera, navegación y pie.
- **Projects**: colección de contenidos + listado en `/projects` y página de detalle en `/projects/[slug]`.
- **Blog**: colección + listado en `/blog` y posts en `/blog/[slug]`.
- **Diseño base**: layout común, tipografías del sistema y estilos globales sencillos para empezar.
- **Contacto**: formulario en `/contact` con **Netlify Forms** (incluye *honeypot*) y página de confirmación en `/thanks`.
- **Ciclo de versiones**: ramas `dev` → `staging` → `main` con **etiquetado automático**:
  - pre-releases en `dev`: `v0.1.1-dev.N`
  - release candidates en `staging`: `v0.1.1-rc.N`
  - release en `main`: `v0.1.1`

## Notas técnicas

- **Astro Content Collections** para `projects` y `blog`, con tipado y *frontmatter* consistente.
- **Rutas dinámicas** con `getStaticPaths()` y `getEntryBySlug()` para servir cada proyecto/post.
- **Netlify Forms**: `<form name="contact" data-netlify="true">` + campo oculto `bot-field` (honeypot) y `action="/thanks"` para el *redirect* tras el envío.
- **CI/CD**: GitHub Actions para etiquetado de versiones en cada rama y deploy automático a **Netlify** (staging y prod).

## Estado actual

Funcionalidad completa para:
- Publicar proyectos y artículos rápidamente gracias a las **content collections** tipadas y a las rutas dinámicas.
- Probar cambios en **staging** antes de subir a **producción** mediante ramas `dev`/`staging`/`main` y despliegues automáticos.
- Recibir mensajes desde el formulario (con protección básica anti‑spam mediante honeypot).
- Garantizar una base de **SEO** mínima (títulos, descripciones, metadatos) y una estructura de enlaces amigable.

## Próximo objetivo

- **Aplicar la nueva guía de marca** (colores, tipografías, componentes).
- Mejorar **estilos de navegación y tarjetas**.
- Pulir **SEO/OG** y accesibilidad.
- Añadir página **About** y más proyectos.

---

Si te interesa el detalle técnico o has visto algún fallo, ¡**[Escríbeme](/contact)** por el formulario!
