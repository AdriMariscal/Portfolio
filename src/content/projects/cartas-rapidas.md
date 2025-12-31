---
title: "Cartas Rápidas"
description: "Generador de cartas legales frecuentes para España, con plantillas guiadas, exportación a PDF y ahora funcionalidades multilingües y de accesibilidad."
tags: ["astro", "netlify", "seo", "performance", "core‑web‑vitals", "ux", "a11y", "ci‑cd", "cartas-rapidas", "web"]
repoUrl:
demoUrl: ""
projectUrl: "https://cartasrapidas.es"
featured: true
published: true
date: 2025-12-31
status: "active"
changelog:
  - version: "v1.4.0"
    date: "2025-12-31"
    changes:
    - { type: "added", text: "Módulo de cuenta local cifrada: permite guardar, cargar y exportar/importar cartas, firmas y recordatorios en el navegador usando localStorage y WebCrypto sin recurrir a servidores." }
    - { type: "added", text: "Soporte multilingüe (español, catalán y euskera) con rutas localizadas, traducciones centralizadas y sitemap por idioma." }
    - { type: "added", text: "Componente de llamada a la acción para feedback y mejora del formulario de contacto con preselección de guía, motivo y mensaje." }
    - { type: "added", text: "Modo oscuro y modo de alto contraste con tokens de diseño y conmutadores accesibles en la barra de navegación." }
    - { type: "changed", text: "Normalización de slugs y mejoras SEO: slugs uniformes con guiones, verificación de unicidad, nuevas opciones de Open Graph (campo og_image) y sitemap con prioridades y changefreq dinámico." }
    - { type: "changed", text: "Actualización de datos legales y de contacto: unificación del correo de contacto a info@cartasrapidas.es y añadido enlace al portfolio profesional." }
    - { type: "devops", text: "Integración de workflows de GitHub Actions para CI, auditoría de paquetes, tests de Lighthouse y despliegues automáticos en Netlify, más configuración de Dependabot." }
    - { type: "docs", text: "Documentación ampliada: nuevos README, CONTRIBUTING.md y guías de agentes, además de plantillas de issues y PR para estandarizar contribuciones." }
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
Cartas Rápidas es una herramienta web para generar cartas legales claras y listas para enviar, orientada a casos frecuentes en España (baja de gimnasio, desistimiento, reclamaciones, devoluciones SEPA y solicitudes relacionadas con ASNEF). Con la nueva versión incorpora un módulo de cuenta local cifrada, modos de visualización accesibles y multilingüe (es, ca, eu), así como mecanismos para recabar feedback y mejorar continuamente.

## Contexto
Proyecto de utilidad pública y portfolio profesional: combina contenido legal “plantillable” con guías prácticas y ahora con soporte multilingüe. El despliegue sigue un flujo dev → staging → main, con versiones etiquetadas automáticamente y despliegues estáticos en Netlify. Desde la versión 1.4.0 se integran workflows de CI/CD, dependabot y plantillas de contribución para facilitar colaboraciones externas.

## Stack
- Astro 5 para sitio estático y content collections con traducciones (i18n) y SEO configurado.
- Tailwind CSS 4 y tokens de tema para modo claro/oscuro y alto contraste.
- Preact para componentes interactivos (generador, feedback CTA, conmutadores de tema).
- jsPDF para exportación de cartas a PDF en cliente.
- WebCrypto API y localStorage para el módulo de cuenta local cifrada (exportación/importación de datos).
- Netlify con Node 20 para builds y deploys; workflows de GitHub Actions para CI, Lighthouse y auditoría.
- GitHub Actions y Dependabot para auto‑tag, actualización de dependencias y despliegues continuos.

## Resultados (v1.4.0)
- **Experiencia multilingüe:** la web está disponible en español, catalán y euskera con rutas localizadas y metadatos SEO por idioma, lo que amplía el alcance y mejora el posicionamiento.
- **Cuenta local cifrada:** los usuarios pueden guardar borradores de cartas, firmas y recordatorios en su dispositivo, exportarlos/importarlos con cifrado AES‑GCM y recuperarlos sin backend, mejorando la retención y la privacidad.
- **Feedback contextual:** cada guía incluye una llamada a la acción que abre el formulario de contacto pre‑rellenado, facilitando la recogida de sugerencias e incidencias específicas.
- **Accesibilidad y personalización:** se introducen modos oscuro y de alto contraste con persistencia en localStorage y conmutadores accesibles, mejorando la usabilidad en diferentes entornos.
- **SEO avanzado:** normalización de slugs, control de duplicados, campos opcionales og_image y un sitemap enriquecido con changefreq/priority elevan la indexación y la presentación en redes sociales.
- **Transparencia y profesionalidad:** actualización de todas las referencias al correo de contacto a info@cartasrapidas.es
 y añadido enlace al portfolio del autor en la sección “Quién está detrás”.
- **DevOps y documentación:** nuevos workflows de CI/CD automatizan tests, auditorías y despliegues; documentación completa y plantillas de PR/issues facilitan contribuciones y mantienen la calidad del código.

## Resultados (v0.2.5)
- Generación de cartas completamente en el navegador: mejora de privacidad al no depender de backend para datos personales.
- Catálogo de plantillas en Markdown con placeholders: mantenimiento más simple (editar contenido sin tocar lógica de UI).
- Exportación a PDF y copia rápida: reduce fricción para el caso de uso principal (enviar por correo/registro).
- “Guías y plantillas” como capa de descubrimiento: facilita navegación a cada modelo disponible.
- Señales técnicas para SEO/performance: `site` configurado en Astro y prefetch activado para navegación más fluida.

## Roadmap corto
- Extender la localización a otros idiomas (inglés u otros) y revisar las traducciones actuales con revisores nativos.
- Sincronizar el módulo de cuenta local con almacenamiento en la nube opcional para que los usuarios puedan compartir y recuperar cartas en múltiples dispositivos.
- Añadir validaciones de formularios y mensajes de error accesibles para mejorar la usabilidad del generador en dispositivos móviles.
- Integrar pruebas automatizadas (vitest), linter completo y auditorías de rendimiento para mantener la calidad y detectar regresiones.
- Incorporar analítica opt‑in anonimizada para priorizar nuevas plantillas y mejoras según el uso real.
