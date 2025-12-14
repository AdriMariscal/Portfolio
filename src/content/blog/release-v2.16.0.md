---
title: "Release v2.16.0 — Consentimiento de cookies, automatización de pruebas y dominio .es"
description: "Implementación de un banner de cookies con gestión granular, migración al dominio adrianmariscal.es, integración de Playwright y Lighthouse CI en GitHub Actions, nuevos componentes para mejorar la UX y accesibilidad, y refactor de Edge Functions para staging."
tags: ["release-notes", "portfolio", "ci‑cd", "lighthouse", "core‑web‑vitals", "a11y", "ux"]
published: true
date: 2025-12-10
---

## Resumen

La versión **v2.16.0** del portfolio marca un salto cualitativo en términos de cumplimiento legal, automatización del desarrollo y experiencia de usuario.  
Se introduce un **banner de consentimiento de cookies** que permite elegir entre categorías analíticas y de marketing, se migra el dominio principal a **adrianmariscal.es** para consolidar la marca y el SEO, y se incorporan **tests end‑to‑end con Playwright** junto a **Lighthouse CI** en GitHub Actions para vigilar rendimientos y accesibilidad.  
Además, esta release trae nuevos componentes reutilizables, mejoras de accesibilidad (ARIA, navegación con teclado) y un **script de Real User Monitoring (RUM)** para medir las Core Web Vitals en producción.

Principales novedades:

- **Banner de cookies** totalmente configurable con API global y guardado de preferencias en localStorage.
- **Pipeline de CI/CD** con tests E2E (Playwright) y auditorías de Lighthouse CI que fallan la PR si se superan los umbrales.
- **Dominio canónico .es** y mejora de SEO y Markdown (imágenes optimizadas y enlaces automáticos en encabezados).
- **Componentes nuevos** (Callout, FolderTree, QuoteHighlight) y botones de configuración de cookies integrados en el footer.
- **Refactor de Edge Functions** para protección de staging y autenticación más robusta.
- **RUM de Core Web Vitals** con envío a consola/Analytics/endpoints personalizados.

## Por qué este cambio

En versiones previas el sitio crecía en número de artículos y funcionalidades, pero necesitaba adaptarse a la **normativa de privacidad europea (RGPD/LSSI)** y mejorar la transparencia hacia el usuario.  
Migrar al dominio **adrianmariscal.es** era fundamental para alinear la URL con la marca personal y evitar duplicidad de contenidos entre el dominio *.netlify.app* y el dominio definitivo.  
Al mismo tiempo, la madurez del proyecto exigía **automatizar pruebas** de interfaz y establecer **presupuestos de rendimiento** para impedir regresiones, así como incorporar métricas de usuario reales.  
El trabajo de accesibilidad iniciado en versiones anteriores se amplía con mejores roles, etiquetas ARIA y navegación por teclado, facilitando el uso por personas con distintas capacidades.  
Por último, se aprovecha la oportunidad para introducir componentes reutilizables que simplifican la escritura de artículos y mejorar la estética.

## Qué hay de nuevo

### Cumplimiento y privacidad

- **Banner de consentimiento de cookies**: se implementa `CookieConsent.astro`, un componente que muestra un diálogo accesible donde el usuario puede aceptar o rechazar cookies analíticas y de marketing.

  Las preferencias se guardan en localStorage y se exponen a otros scripts mediante una API global; además se dispara un evento para que herramientas como Google Analytics reaccionen a los cambios.

  El botón **“Configurar cookies”** en el pie de página permite reabrir el panel en cualquier momento.  
- **Actualización de políticas legales**: las páginas de Aviso legal, Privacidad, Cookies y Términos se revisan para explicar cómo se gestionan las cookies y se incorpora un aviso de que actualmente no se usan cookies no esenciales.  
- **reCAPTCHA en formularios**: el formulario de contacto integra `data-netlify-recaptcha` para evitar spam sin comprometer la usabilidad.

### Performance y CI/CD

- **Playwright E2E**: se añade un paquete de tests end‑to‑end (`@playwright/test`) con configuración propia (`playwright.config.ts`).  Los tests comprueban que las secciones principales de la home se renderizan y realizan regresión visual mediante capturas de pantalla.  
- **Lighthouse CI**: un nuevo workflow `ci-tests.yml` ejecuta `lhci autorun` tras construir el sitio estático, estableciendo umbrales mínimos del 90 % en accesibilidad y SEO.  Se genera un informe de rendimiento y, si se superan los presupuestos, la PR falla.  
- **Pipeline unificado**: el workflow se ejecuta en cada PR a las ramas `dev`, `staging` y `main`, instalando las dependencias, ejecutando tests y subiendo los artefactos de Playwright (capturas y reportes). Esto formaliza el flujo **DEV → STAGING → MAIN** y protege contra regresiones.
- **RUM de Core Web Vitals**: se añade un script (`rum-core-web-vitals.ts`) que captura LCP, INP y CLS en tiempo real y envía los datos a consola, a Google Analytics y/o a un endpoint definido en `PUBLIC_RUM_ENDPOINT`.  Esto permite tomar decisiones basadas en métricas reales de los usuarios.

### UX y accesibilidad

- **Nuevos componentes**: `Callout.astro` para insertar avisos estilizados, `FolderTree.astro` para diagramas de carpetas y `QuoteHighlight.astro` para citas destacadas. Son reutilizables y mejoran la legibilidad de los posts.
- **Mejoras ARIA y navegación**: se actualizan `Header.astro`, `Footer.astro` y el hero de la página para incluir roles y etiquetas, un botón de tema accesible, enlaces “Saltar al contenido principal” y títulos claros.  Esto facilita la navegación con teclado y lectores de pantalla.
- **Botón de configuración de cookies** en el footer que abre de nuevo el banner y mantiene la coherencia visual con el resto de enlaces.
- **Nuevo diseño de Markdown**: las imágenes en los posts se optimizan mediante `remark-images`, los encabezados se autolinkan con `rehype-autolink-headings` y se adopta el tema de Shiki “dracula” para la sintaxis.

### SEO y contenido

- **Dominio principal `.es`**: se actualiza `astro.config.mjs` para fijar `https://adrianmariscal.es` como sitio canónico y se actualizan metaetiquetas y robots para evitar contenidos duplicados.
- **Autenticación de staging**: el script de Netlify Edge Functions se refactoriza para proteger entornos de `staging` y deploy previews mediante variables de entorno correctas y una validación más robusta.

### Arquitectura y DevOps

- **Dependencias actualizadas**: se incrementa la versión a **2.16.0** en `package.json` e incluye las librerías `web‑vitals`, `remark-images`, `rehype-autolink-headings` y `@playwright/test`.  
- **pnpm optimizado**: el nuevo archivo `pnpm-workspace.yaml` activa `onlyBuiltDependencies` para acelerar las compilaciones en CI y Netlify.
- **Edge Functions refactorizadas**: la función de autenticación básica para staging se reescribe para usar correctamente la API de variables de entorno de Netlify y mejorar la detección de dominios y credenciales.

## Notas técnicas

- La **configuración de Markdown** se ha centralizado en `astro.config.mjs`. Se recomienda revisar las opciones de los plugins `remark-images` y `rehype-autolink-headings` si se añade documentación adicional.
- El **workflow de CI** (`ci-tests.yml`) introduce dos jobs (`e2e` y `lighthouse-ci`) ejecutados en Ubuntu 20.04. Para visualización de regresiones visuales, se suben los artefactos `test-results/` y `playwright-report/`.  Ajusta las rutas o añade matrices de navegadores si amplías la cobertura.
- El **script de RUM** (`rum-core-web-vitals.ts`) lee `PUBLIC_RUM_ENDPOINT` en tiempo de ejecución. Define esa variable en Netlify (`Settings → Environment variables`) si deseas enviar las métricas a una función o API externa.
- Para garantizar la compatibilidad con navegadores modernos, el componente de cookies utiliza un diálogo accesible (`role="dialog"`, `aria-modal="true"`) y dispara eventos personalizados para que otras bibliotecas (ej. GA4) respeten el consentimiento.

## Resultados / Impacto

Esta actualización eleva el portfolio a un nuevo estándar profesional:

- **Transparencia y confianza**: el banner de cookies y las páginas legales actualizadas proporcionan control granular sobre la privacidad, cumpliendo RGPD y LSSI.  
- **Fiabilidad del despliegue**: con 22 commits y 38 archivos modificados en el PR de lanzamiento, la automatización de pruebas evita regresiones de rendimiento y accesibilidad antes de fusionar cambios.
- **Mejora continua del rendimiento**: al integrar Lighthouse CI con presupuestos mínimos y RUM, el proyecto se compromete a mantener LCP, INP y CLS dentro de márgenes aceptables, con visibilidad tanto en laboratorio como en producción.
- **Experiencia de usuario enriquecida**: los nuevos componentes y mejoras de navegación aportan claridad visual y facilitan la lectura de artículos técnicos; la migración al dominio `.es` favorece el SEO y la coherencia de marca.
- **Base para futuras iteraciones**: el refactor de Edge Functions y las dependencias actualizadas sientan las bases para funciones más avanzadas, como autenticación por roles o instrumentación adicional.

## Próximos pasos

Mirando hacia el futuro, las siguientes iniciativas están en el radar del proyecto:

1. **Buscador interno** para el blog. La mayor cantidad de contenidos requiere un motor de búsqueda que permita filtrar por título, tags o texto completo.
2. **Ampliar la cobertura de pruebas**: extender Playwright a flujos críticos (navegación blog → proyecto → contacto) y añadir presupuetos de rendimiento a más rutas (p. ej. `/blog`, `/proyectos`).
3. **Sistema de gestión de contenidos** (CMS) o herramientas internas que faciliten la creación y edición de posts y proyectos sin tocar el repositorio, manteniendo el control tipado de Astro.
4. **Analytics responsables**: evaluar la integración de Google Analytics 4 u otras plataformas, respetando siempre la selección del usuario y las políticas de privacidad.
5. **Optimizaciones de Edge**: explorar autenticación más sofisticada (OAuth2, JWT) en Netlify Edge Functions y funciones personalizadas para búsquedas y API.
