---
title: "Cartas Rápidas"
description: "Generador de cartas legales frecuentes para España, con plantillas guiadas y exportación a PDF, ejecutado 100% en el navegador."
tags: ["astro", "netlify", "seo", "performance", "core‑web‑vitals", "ux", "a11y", "ci‑cd", "cartas-rapidas", "web"]
repoUrl:
demoUrl: ""
projectUrl: "https://cartasrapidas.es"
featured: true
published: true
date: 2025-12-15
status: "active"
changelog:
  - version: "v0.2.5"
    date: "2025-12-15"
    changes:
      - { type: "added", text: "Generador de cartas basado en plantillas Markdown (colección de contenido) con campos dinámicos a partir de placeholders." }
      - { type: "added", text: "Previsualización, copia al portapapeles y descarga en PDF (jsPDF) desde el navegador." }
      - { type: "added", text: "Firma manuscrita opcional mediante canvas cuando la plantilla incluye el placeholder {firma}." }
      - { type: "added", text: "Sección de guías/plantillas que lista las cartas disponibles y enlaza por slug." }
      - { type: "changed", text: "Configuración del sitio en Astro (site=https://cartasrapidas.es) y prefetch habilitado." }
      - { type: "devops", text: "Despliegue en Netlify con build estático (dist) y Node 20 en producción, branch deploys y deploy previews." }
      - { type: "devops", text: "GitHub Actions para auto-etiquetado: tags vX.Y.Z en main y vX.Y.Z-rc en staging a partir de package.json." }
---

## Resumen
Cartas Rápidas es una herramienta web para generar cartas legales claras y listas para enviar, orientada a casos frecuentes en España (baja de gimnasio, desistimiento, reclamaciones, devoluciones SEPA y solicitudes relacionadas con ASNEF).

El flujo es guiado: eliges plantilla, rellenas tus datos y obtienes el texto final para copiar o descargar en PDF, sin enviar información a servidores.

## Contexto
Proyecto pensado como utilitario de autoservicio: contenido legal “plantillable” + guías prácticas alrededor de cada modelo.

El despliegue es estático (Astro) y la generación ocurre en cliente. El repositorio incluye flujo de versionado basado en `package.json` y automatización de tags en GitHub por rama (staging/main).

## Stack
- Astro 5 (sitio estático, content collections y SEO básico con `site` definido).
- Tailwind CSS 4 (estilos del generador y componentes).
- Preact (integración Astro para componentes/UX).
- jsPDF (exportación a PDF en cliente).
- Netlify (build `npm run build`, salida `dist`, Node 20).
- GitHub Actions (auto-tag en `main` y tags “rc” en `staging`).

## Resultados (v0.2.5)
- Generación de cartas completamente en el navegador: mejora de privacidad al no depender de backend para datos personales.
- Catálogo de plantillas en Markdown con placeholders: mantenimiento más simple (editar contenido sin tocar lógica de UI).
- Exportación a PDF y copia rápida: reduce fricción para el caso de uso principal (enviar por correo/registro).
- “Guías y plantillas” como capa de descubrimiento: facilita navegación a cada modelo disponible.
- Señales técnicas para SEO/performance: `site` configurado en Astro y prefetch activado para navegación más fluida.

## Roadmap corto
- Ampliar el catálogo de plantillas y homogeneizar slugs/títulos para URLs más consistentes.
- Añadir páginas por plantilla con metadatos específicos (title/description/canonical) y schema.org orientado a “HowTo/FAQ” cuando aplique.
- Incorporar validaciones de formulario (tipos de campo, formatos) y mejoras de accesibilidad en inputs (ayudas, errores y foco).
- Integrar analítica mínima (opt-in) para medir uso por plantilla y priorizar mejoras.
