---
title: "Release v1.0.10 — Astro 4, paginación de blog y SEO avanzado"
description: Migración a Astro v4 con content collections tipadas, paginación de posts y etiquetas, nuevo sistema de diseño (Hero, ProjectCard y PostCard), mejoras de SEO y accesibilidad y utilidades para escalar."
tags: ["release-notes", "astro", "portfolio", "seo", "pagination"]
published: true
date: 2025-11-06
---

## Resumen

Después de varias iteraciones desde la v0.4.x, he alcanzado la **v1.0.10**, que marca la madurez del portfolio tanto a nivel de código como de contenido.

Esta versión recoge la migración a **Astro v4** y añade un sistema de diseño modular, paginación en el blog y mejoras de SEO y accesibilidad que elevan el proyecto a un nivel profesional. Además, consolidamos herramientas utilitarias para gestionar contenido y mejorar la experiencia de desarrollo.

---

## Por qué este cambio

Desde la v0.4.x el sitio creció en número de artículos y proyectos. Era necesario **optimizar la arquitectura** para manejar paginación, etiquetas y colecciones de forma tipada, así como modernizar el diseño y mejorar el rendimiento técnico y SEO.

Con Astro v4 llegan los **content collections tipados** que permiten definir esquemas de datos. Aprovecho para crear un **sistema de diseño** con tokens CSS y componentes reutilizables y para afinar la SEO (meta canonicals, OG/Twitter y JSON‑LD). También he añadido paginación para mantener el blog legible a medida que crece.

---

## Qué hay de nuevo

### 1) Migración a Astro v4 y content collections

- `content.config.ts`: Adopto el nuevo archivo de configuración de Astro para definir colecciones tipadas (`blog` y `projects`) con esquemas. Esto asegura que todos los posts y proyectos sigan un formato coherente y facilita el autocompletado en VS Code.
- **Archivo** `/lib/content.ts`: Centraliza utilidades como `countProjects`, `getRecentPosts`, `slugifyTag` o `computeBackHref`, que ayudan a crear slugs, contar proyectos y generar enlaces de vuelta contextuales.

### 2) Sistema de diseño y componentes

- **Hero, ProjectCard y PostCard** completamente rediseñados con un enfoque modular. El Hero calcula dinámicamente el número de proyectos, las tarjetas de proyecto permiten múltiples enlaces (código, demo, sitio) y las de post muestran fecha, lectura estimada y etiquetas.
- **Tokens de diseño** en `global.css` para tamaños de contenedor, espacios y colores, lo que unifica el look&feel y simplifica futuras variaciones.
- **Layout y navegación** refinados: detección del nav activo usando `Astro.url.pathname`, cabecera y pie armonizados, y mejor espaciado general.

### 3) Blog paginado y etiquetas mejoradas

- **Paginación** para el blog: Los artículos se muestran en lotes de 9 entradas por página (`/blog/pages/[page]`), con enlaces de “Anterior/Siguiente”.
- **Páginas de etiquetas** revisadas: Cada etiqueta (`/blog/tags/[tag]`) incluye su propia paginación (`/blog/tags/[tag]/pages/[page]`) y slugificación consistente para SEO.
- **Botón “Volver” contextual** en cada post: Usa `document.referrer` para regresar a la página anterior (blog o tag) y mejorar la navegación.

### 4) SEO y accesibilidad avanzados

- **Meta tags mejorados**: Se generan `title`, `description`, `canonical` y meta OG/Twitter para cada página, incluyendo imagen y tipo (`og:type`).
- **JSON‑LD** en los posts: Se añade marcado estructurado de `BlogPosting` con campos como autor, fecha, descripción y tags para favorecer el SEO en buscadores.
- **Accesibilidad**: Se refinan colores, contrastes y estados de foco; se reestructuran jerarquías de encabezados y se mejora la página 404.
- **Botón de vuelta**: Navegación con teclado mejorados.

### 5) Experiencia de desarrollo y despliegue

- **Separación de contenido y lógica**: El nuevo módulo `/lib/content.ts` aísla la generación de slugs y el recuento de proyectos, facilitando pruebas y mantenimiento.
- **Refactor de rutas**: Se organizan las páginas en carpetas (`blog/pages/[page]`, `blog/tags/[tag]/pages/[page]`) para claridad.
- **GitHub Actions**: Actualizadas y scripts de versionado para etiquetas semánticas (`v1.0.x`), más compatibilidad con el ecosistema de Astro v4.
- **Lighthouse**: Seguimos persiguiendo ≥90 en rendimiento, accesibilidad, SEO y best practices.

---

## Notas técnicas

- **Slugificación**: Las etiquetas y títulos se convierten a slugs seguros usando utilidades personalizadas (`toSlug`, `slugifyTag`).
- **Paginación dinámica**: Se usan parámetros de URL en `getStaticPaths()` para generar las rutas necesarias y se calculan los índices de posts para cada página.
- **Campos frontmatter ampliados**: Los posts ahora soportan `ogImage`, `ogType`, tiempo de lectura y resumen, lo que se refleja en los meta tags.
- **Back button**: Un pequeño script en el componente Post detecta el `document.referrer` para decidir a dónde volver, mejorando la UX.

---

## Resultados

- **Mejor estructura**: Con Astro v4 y las colecciones tipadas, el contenido es más seguro, escalable y fácil de mantener.
- **Blog legible**: La paginación y las páginas de tags mantienen el listado ordenado a medida que crece el número de artículos.
- **Diseño coherente**: El sistema de diseño modular unifica componentes y facilita futuras iteraciones.
- **SEO técnico**: Mejoras de meta, canonicals y JSON‑LD incrementan la visibilidad en buscadores y la calidad de los enlaces.
- **Accesibilidad**: Cumplimiento de pautas WCAG con colores y jerarquías de encabezado revisadas.

---

## Próximos pasos

1. **Internacionalización (i18n)**: Permitir que el contenido esté disponible en español e inglés.
2. **Modo oscuro**: Implementar un switch de tema manteniendo la consistencia de tokens.
3. **Buscador interno**: Añadir búsqueda rápida por título o tag para el blog.
4. **Analítica**: Integrar medición conforme a la normativa (AEPD) y revisar la política de cookies cuando se active.

---
Esta versión marca un hito: el portfolio deja de ser un experimento y se convierte en un producto completo. Si quieres saber más detalles técnicos o necesitas un desarrollo a medida con Astro, Netlify y buenas prácticas de SEO/accesibilidad, no dudes en **[escribirme](/contact)**.
