---
title: "Release v1.4.0 — Cuenta local cifrada, multilingüe y temas accesibles"
description: "La versión 1.4.0 de Cartas Rápidas incorpora una cuenta local cifrada para guardar borradores y recordatorios, soporte multilingüe (es, ca, eu), un nuevo componente de feedback, modos oscuro y de alto contraste, búsqueda y filtros para plantillas, mejoras SEO, actualización de datos legales y un pipeline de CI/CD integral."
tags: ["release-notes", "cartas-rapidas", "astro", "netlify", "a11y", "ci‑cd", "seo"]
published: true
date: 2025-12-31
---

## Resumen

La **v1.4.0** de **Cartas Rápidas** es el salto de un generador de cartas legal a una plataforma más completa.  Esta release introduce un **módulo de cuenta local cifrada** que permite guardar cartas, firmas y recordatorios en tu dispositivo de manera segura.  También inaugura el **soporte multilingüe** (español, catalán y euskera), un **componente de feedback contextual** para recoger sugerencias, conmutadores de **modo oscuro y alto contraste** accesibles, buscador y filtros para encontrar rápidamente el modelo adecuado y un catálogo ampliado de plantillas.  La web se beneficia de una **normalización de slugs y mejoras SEO**, actualización de datos legales, workflows de CI/CD y documentación reforzada.

**Highlights de la release:**

- **Cuenta local cifrada**: guarda cartas y firmas en localStorage con cifrado AES‑GCM y permite exportar/importar tus datos sin servidor.
- **Multilingüe (es, ca, eu)**: la interfaz está preparada para español, catalán y euskera con traducciones centralizadas y rutas localizadas.
- **Feedback contextual**: cada guía muestra una llamada a la acción que abre el formulario de contacto pre‑relleno.
- **Modo oscuro y alto contraste**: conmutadores accesibles en la barra de navegación y persistencia de la preferencia.
- **Buscador y filtros**: el generador y las guías incorporan búsqueda de modelos y filtros por tema.
- **SEO avanzado y slugs uniformes**: se normalizan los slugs, se mejoran las metaetiquetas y el sitemap es más rico.
- **CI/CD y documentación**: nuevos workflows de GitHub Actions para auditorías, Lighthouse y despliegues, dependabot y guías de contribución.

## Por qué este cambio

Desde la publicación de la **v0.2.5**, Cartas Rápidas ha evolucionado de un generador en el navegador a un proyecto utilizado por usuarios reales.  Muchos solicitaban poder **guardar sus borradores y firmas** sin perder privacidad; de ahí nace la cuenta local cifrada.  El proyecto aspira a llegar a más comunidades lingüísticas, por lo que se han añadido traducciones a **catalán y euskera**.  Para mejorar la iteración, se introduce un **componente de feedback** que pre‑rellena el motivo y la guía desde la que se envía el mensaje.  También era necesario mejorar la **accesibilidad** con modos de contraste y oscurecer la interfaz en ambientes con poca luz.  Finalmente, se aborda la deuda técnica incorporando **workflows de CI/CD**, dependabot y documentación completa para que nuevos colaboradores puedan sumarse con confianza.  Estos cambios preparan la plataforma para escalar a más plantillas, idiomas y funcionalidades.

## Qué hay de nuevo

### Cuenta local cifrada y gestión de borradores

El nuevo **módulo de cuenta local cifrada** permite a los usuarios guardar cartas generadas, firmas manuscritas y recordatorios de envío en su dispositivo.  Los datos se almacenan en `localStorage` y se cifran con la API WebCrypto (AES‑GCM); de este modo no se exponen a terceros ni se envían a servidores.  La interfaz incluye opciones para **exportar** tus datos cifrados y **importarlos** de vuelta, de modo que puedes trasladar tu cuenta entre dispositivos o hacer copias de seguridad.  Los recordatorios permiten indicar una fecha y una nota para que no olvides enviar tu reclamación.

### Experiencia multilingüe

Cartas Rápidas ya no está limitada al castellano: toda la interfaz se ha traducido al **catalán** y al **euskera**, y las rutas están preparadas para mostrar el contenido localizado.  Las claves de traducción se centralizan en un archivo de i18n, lo que simplifica añadir nuevos idiomas.  Además, el sitemap se genera por idioma para mejorar el posicionamiento SEO internacional.

### Feedback contextual y formulario de contacto

Cada guía incluye ahora un **botón de feedback** que anima al usuario a comentar su experiencia o sugerir mejoras.  Al pulsar, se abre el formulario de contacto con la guía y el motivo ya seleccionados, reduciendo fricción.  Este sistema permitirá priorizar nuevas plantillas y detectar errores rápidamente.  También se ha unificado el correo de contacto a **info@cartasrapidas.es** y se añade un enlace visible al portfolio profesional en la sección “Quién está detrás”.

### Apariencia personalizable y accesibilidad

La navegación incorpora conmutadores para **modo claro/oscuro** y **contraste normal/alto**, con persistencia de la preferencia en localStorage.  Estos conmutadores son accesibles con teclado y lectores de pantalla.  El tema oscuro utiliza una paleta basada en tokens de diseño, mientras que el modo de alto contraste incrementa los ratios de color para personas con visión reducida.  Además se actualizan los metaetiquetas `color-scheme` para que los navegadores adapten el scroll y las barras de sistema.

### Buscador y filtros en el generador y las guías

Para agilizar la selección de plantillas, se ha añadido un **buscador** que filtra modelos según el texto introducido y un selector de **temas** (bajas, contratos, datos personales, desistimiento, reclamaciones, etc.).  Las mismas funcionalidades se replican en la sección de guías, permitiendo buscar por título y filtrar por categoría.  Estos filtros se combinan con la lista de modelos disponibles, que ahora incluye contratos de arrendamiento, cancelación de servicios SaaS, contrato de compraventa de vehículo usado y modelos tradicionales como desistimiento 14 días o reclamación a operadora.

### Catálogo ampliado de plantillas

El repertorio de cartas se amplía con nuevos modelos, entre ellos:

1. **Cancelación de suscripción a SaaS** — Modelo para solicitar la baja de un servicio de software y la cancelación de futuras renovaciones.
2. **Contrato de arrendamiento de vivienda** — Documento orientativo con cláusulas básicas de duración, renta y fianza.
3. **Contrato de compraventa de vehículo usado** — Modelo para formalizar la venta de un vehículo entre particulares.
4. **Carta de reclamación de factura indebida** y nuevos modelos de reclamación a ASNEF/Equifax y devoluciones de cargo SEPA.

Todas estas plantillas están acompañadas de guías completas con contexto legal, pasos y FAQs.  El listado de modelos se mantiene actualizado y accesible desde la página principal.

### SEO avanzado y normalización de slugs

Para mejorar la indexación y la presentación en redes sociales, se revisan todas las rutas y se **normalizan los slugs** con guiones y control de duplicados.  El sitemap se enriquece con `priority` y `changefreq` dinámicos y se añade el campo opcional **og_image** para personalizar la imagen social.  Se actualiza la configuración de Astro para generar metaetiquetas canónicas y Open Graph coherentes.  Estos cambios, junto con la inclusión de traducciones, elevan el rendimiento SEO del sitio.

### Datos legales y contacto actualizados

Se han revisado las páginas de **Aviso legal**, **Política de privacidad** y **Contacto**, unificando el correo a `info@cartasrapidas.es` y añadiendo un enlace al portfolio del autor.  Esto aporta transparencia y facilita el contacto profesional.

### DevOps, CI/CD y mejoras de infraestructura

El proyecto adopta un **pipeline de CI/CD** integral.  Se añaden workflows de GitHub Actions para ejecutar auditorías de paquetes, tests de Lighthouse con presupuestos mínimos y despliegues automáticos en Netlify.  Dependabot gestiona la actualización de dependencias y se introduce un workflow de seguridad que ejecuta `npm audit` programado.  La versión de Node para builds se fija en 20, y el flujo de ramas se mantiene `dev → staging → main` con etiquetas semánticas automáticas.  Todo ello reduce la deuda técnica y permite detectar regresiones antes de llegar a producción.

### Documentación y plantillas de contribución

Para facilitar colaboraciones se ha ampliado la **documentación**: un nuevo `README` describe la arquitectura del proyecto, `CONTRIBUTING.md` define el flujo de trabajo y las normas de codificación, y **AGENTS.md** detalla la filosofía de los agentes inteligentes.  Se añaden plantillas de issues y PR para estandarizar las aportaciones【212224749823922†L38-L40】.  También se incluyen configuraciones de `.editorconfig`, Prettier y ESLint, scripts de Husky y lint‑staged para validar antes de hacer commit.  Todo ello alinea el proyecto con las mejores prácticas de desarrollo.

## Notas técnicas

- **Stack actualizado**: el proyecto sigue basado en **Astro 5** con content collections tipadas e integración i18n, **Tailwind CSS 4** para estilos y tokens de color, **Preact** para componentes interactivos y **jsPDF** para exportación a PDF.
- **WebCrypto y localStorage**: el cifrado de la cuenta local utiliza AES‑GCM, con contraseña definida por el usuario y derivada mediante `PBKDF2`; los datos se serializan en JSON y se guardan en localStorage.
- **Internacionalización**: las traducciones se gestionan con un módulo centralizado y se cargan dinámicamente según el prefijo de la URL.  Los campos del sitemap incluyen `hreflang` para cada idioma.
- **Tema y contraste**: se definen variables CSS (`--color-bg`, `--color-text`, etc.) para los distintos temas, y un script ligero detecta la preferencia del sistema o la última selección del usuario.
- **Workflows de CI/CD**: se crean varios YAML en `.github/workflows` que instalan dependencias, ejecutan ESLint y Prettier, corren auditorías de seguridad, lanzan `lhci autorun` para medir LCP, INP y CLS, y despliegan a Netlify.  Dependabot configura las actualizaciones semanales de librerías.

## Resultados / Impacto

Esta actualización hace que Cartas Rápidas sea más potente y confiable para los usuarios:

- **Privacidad y control**: la cuenta local cifrada permite guardar borradores y firmas sin exponer datos a servidores, lo que mejora la confianza y la retención.
- **Mayor alcance**: el soporte multilingüe amplía el público objetivo y mejora el SEO internacional.
- **Usabilidad y accesibilidad**: el buscador, los filtros y los conmutadores de tema facilitan la navegación y permiten adaptarse a diferentes condiciones de visión.
- **Mejor SEO y profesionalidad**: los slugs uniformes, el sitemap enriquecido y las metaetiquetas mejoradas aumentan la indexación en buscadores y la presentación en redes sociales.
- **Transparencia**: la actualización de las páginas legales y del correo de contacto clarifica la identidad del proyecto.
- **Calidad de código y fiabilidad**: la automatización de pruebas, auditorías y despliegues reduce los errores y facilita la colaboración.

## Próximos pasos

El roadmap del proyecto apunta a varias mejoras en el corto plazo:

1. **Ampliar la localización a más idiomas** como el inglés y revisar las traducciones actuales con hablantes nativos.
2. **Sincronizar la cuenta local con almacenamiento en la nube** opcional, para que los usuarios puedan recuperar cartas en varios dispositivos.
3. **Validaciones y mensajes de error accesibles** en los formularios, con controles de DNI, fechas y códigos postales.
4. **Pruebas automatizadas y auditorías**: integrar tests unitarios (Vitest), análisis de código estático y auditorías de rendimiento para detectar regresiones.
5. **Analítica responsable**: incorporar métricas de uso anónimas y opt‑in que permitan priorizar nuevas plantillas sin comprometer la privacidad.

Cartas Rápidas continúa evolucionando como una herramienta legal autoservicio.  Si encuentras un problema o tienes ideas para nuevas plantillas, abre un issue en GitHub o envía tu mensaje desde el formulario de contacto.  ¡Gracias por tu confianza!