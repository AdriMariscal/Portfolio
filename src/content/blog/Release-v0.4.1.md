---
title: "Release v0.4.1 — Rediseño visual, blog con etiquetas y sección legal completa"
description: "Nueva versión mayor del portfolio: identidad visual consolidada, tarjetas de proyectos y posts mejoradas, páginas legales conforme a LSSI y RGPD, y flujo de despliegue con staging protegido."
tags: ["release-notes", "portfolio", "astro", "netlify", "seo", "lighthouse"]
published: true
date: 2025-11-01
---

## Resumen

Con la **v0.4.1** he dado un salto importante respecto al MVP inicial: la web ya no solo funciona, sino que se presenta con una **imagen profesional coherente** y una arquitectura de contenidos preparada para crecer.

Esta versión introduce un **rediseño completo** del home, de las tarjetas de **proyectos y posts**, y refuerza el cumplimiento **legal**. Además añade **etiquetas** y páginas dedicadas para agrupar artículos, y protege el entorno de **staging** con autenticación. Todo esto manteniendo un objetivo de **Lighthouse ≥90** en rendimiento, accesibilidad, SEO y buenas prácticas.

---

## Por qué este cambio

Este salto nace de la necesidad de evolucionar el MVP hacia algo más sólido.

Quería dos cosas:  

1) Buscaba reflejar mi **identidad de marca** con tipografías, colores y espaciados que transmitan confianza y profesionalidad.
2) Quería una **arquitectura escalable** que soportara más proyectos, artículos y secciones sin perder claridad.

A nivel de negocio, el portfolio ya no es solo un escaparate: también **capta demanda orgánica** (SEO), cualifica leads mediante contenido técnico y **acelera ventas** al mostrar entregables reales. Por ello la experiencia de usuario y la legalidad debían estar a la altura.

---

## Qué hay de nuevo

### 1) UI/UX: más claro, más rápido

Esta versión pone el foco en la experiencia de usuario:

- **Hero** renovado con propuesta de valor y CTAs diferenciados (“Contacto” y “Leer el blog”), plus métricas destacadas (años de experiencia en Salesforce, número de proyectos y objetivo Lighthouse). Estas métricas sirven como muestra pública de calidad y rendimiento. 
- **Tarjetas de proyecto**: incluyen badges de estado (Activo/Inactivo) y etiquetas; muestran enlaces condicionales a **Código**, **Demo** y **Ver proyecto**. También se ha dividido la página de proyectos en secciones de proyectos activos e inactivos para dar contexto a cada proyecto. 
- **Tarjetas de post** y listado de blog: rejilla limpia con los últimos tres artículos, etiquetas clicables y extractos legibles.
- **Cabecera y pie** actualizados con estilos consistentes y detección del estado activo para la navegación.
- **Página 404** revisada con mensaje amigable y enlace para regresar a la home.

### 2) Blog con etiquetas y página `/tags/[tag]`

- **Colección de contenidos tipada de Astro** para consultar posts y proyectos con seguridad de tipos. Esto facilita listados, filtros y paginación. 
- **Página de etiquetas** que agrupa artículos por tema (p. ej., /tags/astro, /tags/salesforce), ordenados por fecha, con el mismo look que el listado principal.

### 3) Sección legal completa (España/EU)

- **Aviso legal** conforme al **art. 10 LSSI** (datos de identificación del prestador).
- **Privacidad** alineada con **RGPD** (finalidades, base jurídica, derechos, DPO si aplica). 
- **Cookies** siguiendo la **Guía AEPD**: información clara, clasificación y consentimiento cuando proceda. (Aunque ahora no cargo cookies no técnicas).

> Nota: Cuando incorpore analítica o herramientas de terceros, aplicaré la guía de cookies de AEPD (clasificación, información por capas y consentimiento válido).

### 4) Flujo de despliegue y formularios

- **Staging protegido** con **Edge Functions** (Netlify) y variables `STAGING_USER` / `STAGING_PASS`. Declaraciones en `netlify.toml` para ejecutar la función en `/`. 
- **Formulario de contacto** con **Netlify Forms** (`data-netlify="true"` + nombre de formulario), envío y gestión desde el panel.

---

## Notas técnicas

Algunos detalles bajo el capó:

- **Astro Content Collections** para `blog` y `projects`: uso de esquemas tipados para asegurar consistencia y ordenar por fecha o estado.
- **Generación de slugs** para etiquetas y posts de forma consistente (slugificación) para rutas amigables (`/tags/<tag>`). 
- **Accesibilidad** mejorada: jerarquías de encabezados lógicas, focus states en enlaces y un contraste adecuado en la paleta de marca.
- **Build & Deploy**: pipelines a **Netlify** para producción y despliegues de preview para PRs. El entorno de **staging** se protege con autenticación básica vía Edge Functions. 
- **Versionado**: uso de etiquetas semánticas (`vMAJOR.MINOR.PATCH`) y ramas `dev → staging → main`. GitHub Actions automatiza el versionado y despliegue.

---

## Resultados de calidad (objetivo)

- **Lighthouse**: mantener **90–100** en rendimiento, accesibilidad, SEO y buenas prácticas. Estos rangos son recomendados por la documentación oficial. 
- **PSI**: comprobar que los valores se mantienen estables en móvil y escritorio, dado que PSI usa Lighthouse bajo el capó.

---

## Próximos pasos

1. **Sistema de diseño** (tokens y componentes reutilizables en Astro) para unificar visuales a lo largo del sitio. 
2. **Contenido evergreen**: guías técnicas y casos reales sobre Salesforce, Astro, Netlify y rendimiento web.
3. **Analítica conforme a AEPD** cuando se active: revisar cookies y consentimiento.  
4. **Mejoras DevEx**: entornos de preview por PR, test visuales y automatización de informes Lighthouse.

---

## ¿Necesitas algo parecido?

Si quieres un **portfolio rápido, accesible y optimizado** (Astro + Netlify / Vercel) o una **página corporativa con cumplimiento legal** (LSSI/RGPD) y buen SEO técnico, cuéntame qué necesitas desde la **[página de contacto](/contact)**.

