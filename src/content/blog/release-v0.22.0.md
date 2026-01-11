---
title: "Release v0.22.0 — Lanzamiento inicial de Utilibox con utilidades seguras y descargas verificadas"
description: "La versión 0.22.0 de Utilibox lanza el MVP en producción: tres herramientas en el navegador (generador de QR, generador de contraseñas y contador de palabras beta), una página de descargas con categorías de software verificado y un sistema de publicidad controlado que respeta la privacidad del usuario."
tags: ["release-notes", "utilibox", "astro", "netlify", "seo", "serverless", "ux"]
published: true
date: 2026-01-10
---

## Resumen

El proyecto **Utilibox** llega a producción con su versión **v0.22.0**, un lanzamiento que inaugura esta plataforma de utilidades rápidas.  El objetivo de Utilibox es ofrecer herramientas sencillas y gratuitas que se ejecuten totalmente en el navegador, sin enviar datos a servidores, y complementar el servicio con un catálogo de descargas seguras y verificación de enlaces.  Para financiar el proyecto se ha implementado publicidad de la red Monetag, pero solo tras el consentimiento del usuario.  Esta primera versión incluye tanto las funcionalidades básicas como la infraestructura necesaria para un desarrollo continuo.

**Highlights de la release:**

- **Tres utilidades en cliente**: generador de códigos QR, generador de contraseñas seguras y contador de palabras (beta); todas se ejecutan en el navegador sin exponer datos a terceros.
- **Catálogo de descargas seguras**: página de descargas con categorías como VPNs gratuitas, visores, editores y plantillas; cada enlace se revisa y se verifica regularmente.
- **Búsqueda y filtros**: interfaz con buscador y filtros por categoría que permite encontrar herramientas rápidamente.
- **Publicación controlada**: integración con Monetag para anuncios pop‑under y notificaciones push; los anuncios solo se cargan tras la aceptación de cookies, gracias al gestor de consentimiento.
- **SEO y legal**: adición de `robots.txt`, `sitemap.xml` y páginas legales (aviso legal, privacidad, cookies y términos); 404 personalizada para rutas inexistentes.
- **Infraestructura moderna**: el sitio se genera con Astro 5.x, se aloja de forma estática en Netlify y utiliza un service worker para las notificaciones push.

## Por qué este cambio

Hasta ahora Utilibox existía solo como idea y prototipos dispersos.  La **v0.22.0** materializa el **primer MVP** al fusionar varias herramientas útiles en un único dominio y dotarlas de una interfaz coherente.  El repositorio seguía un flujo de trabajo con ramas **dev → staging → main**, y la publicación a producción se ha realizado mediante la *pull request* #103, en la que se fusionó la rama `staging` en `main`.  Esta PR, titulada _“Primer MVP de producción v0.22.0”_, contiene 30 commits y 23 archivos modificados e incorpora todas las funcionalidades mencionadas.  El lanzamiento inicial también permite comprobar la viabilidad del modelo de monetización a través de formatos publicitarios respetuosos con la privacidad y recoger feedback temprano de los usuarios.

## Qué hay de nuevo

### Utilidades en cliente

- **Generador de QR** — Se añade una herramienta que genera códigos QR de forma instantánea en el navegador.  Los commits de implementación introducen una página específica y lógica client‑side para crear códigos QR.
- **Generador de contraseñas seguras** — Otra herramienta permite generar contraseñas con longitud y complejidad configurables.  Esta funcionalidad se desarrolló en la PR de contraseñas seguras y se ejecuta enteramente en el navegador.
- **Contador de palabras, caracteres y párrafos (beta)** — Se incluye un contador que analiza textos y muestra estadísticas de palabras, caracteres y párrafos.  La herramienta aún está en fase beta y se refinará en versiones futuras.

### Catálogo de descargas verificadas

Se ha creado una sección de **Descargas** donde se recopilan recursos oficiales para software útil.  La página organiza los enlaces en categorías como **VPNs gratuitas**, **visores**, **editores** y **plantillas**.  Cada entrada indica la fuente oficial y la fecha de verificación (por ejemplo, Proton VPN Free o LibreOffice), lo que ayuda a los usuarios a descargar software legítimo sin riesgo.  Un buscador y filtros permiten encontrar rápidamente la categoría deseada.

### Publicidad y consentimiento

- **Integración con Monetag** — La red de publicidad Monetag se ha integrado para monetizar la plataforma.  Se han añadido formatos **Pop‑under** y **Push** con scripts de carga diferida.
- **Gestor de cookies** — Se implementa un banner de cookies que solicita el consentimiento del usuario.  Los anuncios y scripts publicitarios solo se activan tras la aceptación, evitando referencias a scripts no consentidos.
- **Cumplimiento de RGPD** — Los scripts de publicidad y de servicio se encapsulan para cumplir la normativa europea, y se documenta la política de anuncios y privacidad en el repositorio.

### Mejora de SEO y contenido legal

- **Robots y sitemap** — La release añade los archivos `robots.txt` y `sitemap.xml` para mejorar la indexación por buscadores.  El sitemap incluye la estructura del sitio y las rutas principales.
- **Páginas legales** — Se publican las secciones **Aviso legal**, **Privacidad**, **Cookies** y **Términos** con información transparente sobre derechos y uso de datos.  La ruta `/legal` redirecciona a una página 404 personalizada cuando no existe contenido específico.
- **404 personalizado** — Se implementa una página de error que ofrece un buscador de herramientas y enlaces a las utilidades más utilizadas.

### Base tecnológica y flujo de trabajo

- **Astro 5.x y JavaScript** — El sitio está construido con Astro, lo que permite generar páginas estáticas de alto rendimiento.  La lógica de las herramientas se implementa con JavaScript sin dependencias de backend.
- **Netlify** — Utilibox se despliega en Netlify, utilizando configuraciones de cabeceras de seguridad (CSP) y redirecciones específicas.
- **Ramas y CI** — El flujo de trabajo está compuesto por las ramas `dev`, `staging` y `main`.  El PR de producción #103 integró el trabajo de las ramas anteriores.  Aún no hay workflows CI/CD, pero el roadmap prevé incorporarlos en versiones futuras.

## Notas técnicas

- **Gestión de estado en cliente**: Las utilidades se ejecutan exclusivamente en el navegador, sin almacenamiento en servidor.  Para la generación de contraseñas se utiliza la API `crypto.getRandomValues` y el algoritmo AES‑GCM para valores pseudoaleatorios.
- **Estructura de datos**: Las herramientas y las descargas se definen mediante archivos JSON que se cargan en tiempo de construcción y permiten filtrar por categorías.
- **Service Worker y Push**: Se incluye un *service worker* para gestionar las suscripciones a notificaciones push de Monetag.  El script se registra solo cuando el usuario acepta las cookies, evitando ejecuciones innecesarias.
- **Diseño y accesibilidad**: La interfaz es minimalista y sin frameworks CSS; el enfoque se centra en la usabilidad y la rapidez de carga.  El contraste y la legibilidad mejorarán en versiones posteriores.

## Resultados / Impacto

Esta primera versión establece la base de la plataforma y ofrece valor inmediato a los usuarios:

- Los usuarios pueden **generar códigos QR** y **contraseñas seguras** sin instalar software ni enviar datos a servidores.
- El **catálogo de descargas** centraliza recursos de confianza, proporcionando enlaces revisados y fechas de verificación.
- El **sistema de publicidad respetuoso** genera los primeros ingresos sin comprometer la privacidad, ya que los anuncios se cargan solo después de aceptar las cookies.
- La infraestructura está lista para escalar con nuevas herramientas y funcionalidades, gracias a la arquitectura estática y a la modularidad de Astro y Netlify.

## Próximos pasos

El roadmap de Utilibox plantea varias mejoras a corto y medio plazo:

1. **Ampliar la colección de utilidades**: incorporar conversores de unidades, generadores de Lorem Ipsum, calculadoras y otras herramientas siguiendo la misma filosofía cliente‑side.
2. **Habilitar nuevos formatos de publicidad**: activar el formato de banner display de Monetag y evaluar opciones como Vignette, In‑Page Push o Interstitial según el rendimiento y la experiencia de usuario.
3. **Mejorar accesibilidad y UX**: trabajar en el diseño visual, contraste y navegabilidad, así como optimizar Core Web Vitals y tiempos de carga.
4. **Ampliar y actualizar descargas**: añadir nuevas categorías y revisar periódicamente los enlaces para asegurar que siguen siendo oficiales y seguros.
5. **Analítica sin cookies**: incorporar métricas anónimas para entender el uso de cada herramienta y ajustar la frecuencia de anuncios sin comprometer la privacidad.
6. **Integrar CI/CD y automatización**: definir workflows en GitHub Actions para auditorías de código, pruebas y despliegues automáticos, y establecer dependabot para mantener actualizadas las dependencias.

Utilibox ha nacido con el objetivo de ahorrarte tiempo en tareas cotidianas.  Tu feedback es fundamental: si detectas errores o tienes ideas para nuevas utilidades, abre un issue en GitHub o contacta a través de las páginas de Aviso legal y Privacidad.  ¡Gracias por probar esta primera versión!