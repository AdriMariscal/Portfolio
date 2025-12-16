---
title: "Release v0.2.5 — Generador de cartas, plantillas Markdown y PDF"
description: "Primera versión en producción de Cartas Rápidas con generador de cartas totalmente en cliente, plantillas en Markdown, exportación a PDF, firma manuscrita opcional, guías por modelo, configuración de Astro con SEO básico y prefetch, integración publicitaria renovada y pipeline de versiones automatizado."
tags: ["release-notes", "cartas-rapidas", "astro", "netlify", "ux", "ci‑cd", "seo"]
published: true
date: 2025-12-15
---

## Resumen

Con la **v0.2.5** publico la primera versión en producción de **Cartas Rápidas**, un generador de cartas legales orientado a casos frecuentes en España.  La aplicación pasa de ser un prototipo a un producto funcional con un **generador basado en plantillas Markdown** que se ejecuta al 100 % en el navegador, incorporando previsualización, copia al portapapeles, descarga en PDF y firma manuscrita opcional.  La web estrena un catálogo de modelos y guías enlazadas, se configura correctamente Astro para SEO/performance y prefetch, se renuevan las integraciones publicitarias y se implementa un flujo de versionado y despliegue con GitHub Actions y Netlify.

**Highlights de la release:**

- **Generación de cartas en el cliente**: selección de plantilla, formulario dinámico con placeholders, previsualización en vivo y exportación en PDF usando jsPDF.
- **Plantillas en Markdown y guías**: modelos para baja de gimnasio, desistimiento 14 días, reclamación a operadora, devolución de cargo SEPA y reclamación ASNEF, acompañados de introducción, puntos clave y FAQs.
- **Firma manuscrita opcional**: canvas integrado que inserta la firma cuando la plantilla define el placeholder `{firma}`.
- **Configuración de Astro 5**: site canónico (`https://cartasrapidas.es`), prefetch activado y dependencia actualizada a Astro 5.16 con mejoras de rendimiento y SEO.
- **Publicidad y service worker**: se eliminan los scripts de service worker remotos, se sustituye el antiguo Adsense por un banner de Monetag cargado con `requestIdleCallback` y se publica una versión “no‑op” del service worker para invalidar instalaciones previas.
- **DevOps**: automatización de versionado (tags `vX.Y.Z` en `main` y `vX.Y.Z-rc` en `staging`), despliegue estático a Netlify con Node 20 y rama `staging` protegida.

## Por qué este cambio

Las versiones previas eran experimentales: un generador sencillo escrito en Preact y un par de páginas estáticas no ofrecían una experiencia fluida ni escalable.  El objetivo de **v0.2.5** es convertir Cartas Rápidas en un producto utilitario: el usuario debe poder crear cartas legales completas **sin exponer sus datos personales** (todo ocurre en el navegador) y el mantenimiento del contenido tiene que ser sencillo para iterar rápidamente.  Además, era necesario alinear la web con las prácticas de **SEO y rendimiento** de Astro, eliminar dependencias innecesarias como un service worker de terceros y preparar el ciclo de despliegues con ramas `dev → staging → main` y etiquetado semántico en GitHub.

## Qué hay de nuevo

### Generador de cartas en el navegador

Se sustituye el antiguo componente Preact por un nuevo **generador de cartas** en Astro que carga plantillas desde una colección de contenido y genera formularios dinámicos.  Cada plantilla define sus placeholders (`{nombre_completo}`, `{dni}`, `{direccion}`, etc.), y el generador crea los campos de entrada adecuados.  Al rellenarlos, la carta se previsualiza en tiempo real y se puede **copiar** o **descargar en PDF** gracias a jsPDF.  La interfaz incluye botones para generar, limpiar el formulario y consejos de envío.  Todo el procesamiento se realiza en el cliente, mejorando la privacidad y eliminando la necesidad de un backend.

### Catálogo de plantillas y guías

Cartas Rápidas introduce una **colección de plantillas en Markdown** (definida en `src/content.config.ts`), con un esquema de frontmatter que tipa campos como `titulo`, `descripcion`, `clave` y orden de aparición.  Los modelos disponibles en esta versión son:

1. **Baja de gimnasio** — notifica la solicitud de baja e incluye fecha efectiva y número de cliente.
2. **Desistimiento 14 días** — ejerce el derecho de desistir de un contrato dentro del plazo legal.
3. **Reclamación a operadora** — reclama facturación indebida o incidencias con la operadora telefónica.
4. **Devolución de cargo SEPA** — exige la retrocesión de un recibo no autorizado o erróneo.
5. **Reclamación ASNEF** — solicita la cancelación de los datos en ASNEF tras regularizar la deuda.

Cada plantilla viene acompañada de una página de guía con **intro, puntos clave, pasos, consejos de envío y FAQ** que ayudan a comprender cuándo y cómo usarla.  Estas páginas están accesibles desde la sección “Guías y plantillas” de la home y enlazan con el generador ya preseleccionado.

### Firma manuscrita opcional

Para cartas que requieren una rúbrica se implementa un **canvas de firma**.  Cuando la plantilla contiene el placeholder `{firma}`, el generador muestra un área donde el usuario puede dibujar su firma.  Ésta se incrusta en la previsualización y en el PDF, manteniendo el flujo totalmente en cliente.

### Configuración de Astro y SEO/performance

El proyecto se actualiza a **Astro 5.16** y se configura correctamente el campo `site` (`https://cartasrapidas.es`) en `astro.config.mjs`, lo que permite generar URLs absolutas y metadatos adecuados para SEO.  Además se activa el **prefetch** de enlaces internos para una navegación más fluida.  La actualización trae consigo mejoras en la transformación de Markdown, compatibilidad con Shiki 3.20 y ajustes en Tailwind CSS y otras dependencias.

### Publicidad y service worker

La web dejaba de utilizar un **service worker remoto** para cargar anuncios y notificaciones push.  En su lugar se publica un service worker vacío que únicamente define eventos `install` y `activate` para invalidar cualquier versión previa.  La integración publicitaria se renueva: se eliminan los componentes de Adsense (`HeaderDisplayAd` y `FooterMultiplexAd`) y se implementa un **script de Monetag** que se inyecta con `requestIdleCallback` al final de `BaseLayout.astro`, cargando un banner en páginas idle y manteniendo la eficiencia .

### DevOps, versionado y despliegue

Para profesionalizar el ciclo de vida se crean ramas **`dev`**, **`staging`** y **`main`**; el flujo de cambios pasa por `dev` (features), `staging` (pre‑release) y finalmente `main` (producción).  Un workflow de GitHub Actions lee la versión del `package.json` y genera etiquetas semánticas en cada rama: `vX.Y.Z-dev.N` en `dev`, `vX.Y.Z-rc.N` en `staging` y `vX.Y.Z` en `main`.  El despliegue es estático en **Netlify**, usando Node 20 y generando la carpeta `dist`; se aprovechan los deploy previews para validar antes de fusionar.  Esta release agrupa decenas de commits y cambios en múltiples archivos (incluyendo la conversión de plantillas, la eliminación del antiguo generador y la actualización de `package-lock.json`).

## Notas técnicas

- **Colección `cartas`**: Se define con `defineCollection` y el loader de Astro, cargando todos los `.md` en `src/content/cartas` y validando frontmatter mediante un esquema de `zod`.  Esto permite que cada carta sea un documento autónomo y facilita añadir nuevas plantillas sin tocar el generador.
- **Eliminación del antiguo generador**: el componente Preact `Generator.tsx` se elimina completamente (junto con sus utilidades de renderizado y PDF), simplificando la base de código【913093105772454†L7-L24】.  Ahora la lógica de campos y renderizado está en un componente Astro reactivo más ligero.
- **Actualización de dependencias**: se incrementan numerosas librerías: `astro` y `@astrojs` a 5.16, `@shikijs/renderer` a 3.20, `tailwindcss` 4 y otras dependencias.  El `package.json` actualiza la versión a `0.2.5` y el `package-lock.json` refleja los cambios.
- **Service worker no‑op**: el archivo `public/sw.js` contiene solo los eventos `install` y `activate` para asegurar que los navegadores abandonan el antiguo comportamiento.  No se registran fetch ni push listeners, mejorando la privacidad y el rendimiento.
- **Monetag inyección**: en `BaseLayout.astro` se incluye un script que, al dispararse `DOMContentLoaded` o mediante `requestIdleCallback`, inserta un banner de Monetag con zona `10327676`.  Esto reemplaza la anterior inyección de anuncios y evita el uso de iframes pesados.

## Resultados / Impacto

Esta versión transforma Cartas Rápidas en una herramienta útil y segura para usuarios:

- **Privacidad mejorada**: al eliminar el backend y procesar todo en el navegador, ningún dato personal sale del dispositivo.  Además, la sustitución del service worker remueve scripts externos y reduce superficie de ataque.
- **Experiencia de usuario y accesibilidad**: la generación en tiempo real, el canvas de firma y la navegación con prefetch proporcionan una experiencia fluida tanto en escritorio como en móvil.  Las plantillas guían al usuario paso a paso y las páginas de guía incluyen consejos y FAQs.
- **Mantenibilidad**: las plantillas en Markdown facilitan que cualquier cambio legal o nuevo modelo se integre rápidamente sin modificar la lógica de UI.  El contenido está tipado y probado.
- **SEO y rendimiento**: con Astro configurado, metaetiquetas canónicas, prefetch y mejoras de dependencias, el sitio ofrece tiempos de carga bajos y métricas Core Web Vitals óptimas.  Los cambios de anuncios reducen el coste de recursos y eliminan el service worker remoto, mejorando el CLS/LCP.
- **Profesionalización del ciclo de vida**: el uso de ramas `dev`/`staging`/`main` y tagging automático permite realizar pruebas en staging y deploy previews antes de llegar a producción, reduciendo riesgos y permitiendo revertir fácilmente.  El despliegue estático en Netlify asegura que la página es rápida y escalable.

## Próximos pasos

Según el **roadmap** del proyecto, los siguientes hitos previstos incluyen:

1. **Ampliar el catálogo de plantillas** incorporando más modelos (por ejemplo, baja de servicios de suscripción, reclamaciones frente a administraciones o avisos por impago) y homogeneizar slugs/títulos para URLs consistentes.
2. **Páginas de plantilla con metadatos**: crear páginas dedicadas por modelo con `title`, `description` y `schema.org` de tipo `HowTo/FAQ` para mejorar aún más el SEO y la estructuración del contenido.
3. **Validaciones y accesibilidad**: añadir validaciones de formato en los campos (DNI, código postal, fecha) y mejorar la accesibilidad de los formularios con ayudas contextuales, mensajes de error y foco, siguiendo las pautas WCAG.
4. **Analítica responsable**: integrar un módulo de analítica minimalista y opt‑in para entender el uso por plantilla y priorizar mejoras sin violar la privacidad de los usuarios.

Esta versión sienta las bases de un generador de cartas legal autoservicio.  Si detectas algún problema o tienes sugerencias de nuevas plantillas, no dudes en abrir un issue en **GitHub** o enviarme un mensaje desde el formulario de contacto.