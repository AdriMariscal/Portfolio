---
title: "Utilibox"
description: "Herramientas rápidas, generadores y descargas seguras para resolver tareas puntuales en minutos."
tags: ["astro", "netlify", "performance", "lighthouse", "seo", "core-web-vitals", "a11y", "serverless", "ux", "ci-cd"]
repoUrl: ""
demoUrl: ""
projectUrl: "https://utilibox.app/"
featured: false
published: true
date: 2026-01-10
status: "active"
changelog:
  - version: "v0.22.0"
    date: "2026-01-10"
    changes:
      - { type: "added", text: "Lanzamiento inicial del sitio con base Astro 5.x y generación estática en Netlify." }
      - { type: "added", text: "Tres utilidades disponibles: generador de QR, generador de contraseñas con aleatoriedad criptográfica y contador de palabras (beta), accesibles sin enviar datos a servidores." }
      - { type: "added", text: "Página de descargas con categorías (VPNs gratuitas, visores, editores y plantillas) y enlaces verificados desde fuentes oficiales." }
      - { type: "added", text: "Buscador instantáneo y filtros por categoría que permiten encontrar herramientas rápidamente." }
      - { type: "added", text: "Sistema de monetización basado en red Monetag: formatos Pop-under y Push activados tras interacción del usuario, con formato banner en preparación." }
      - { type: "added", text: "Gestor de consentimiento de cookies que carga publicidad solo tras la aceptación del usuario." }
---

## Resumen

Utilibox es una plataforma web de utilidades rápidas y descargas verificadas. Está pensada para resolver tareas puntuales en segundos — como generar códigos QR, crear contraseñas seguras o contar palabras y caracteres— sin instalar software ni enviar datos a servidores. Además, ofrece un catálogo de descargas recomendadas (VPNs, visores, editores y plantillas) desde fuentes oficiales. El sitio busca monetizarse mediante formatos de publicidad controlados y siempre respeta la privacidad del usuario.

## Contexto

Utilibox nació como un proyecto personal con objetivos duales: centralizar distintas utilidades online en un único sitio y experimentar con modelos de monetización de bajo coste. El flujo de trabajo se apoya en un repositorio Git con ramas de desarrollo, staging y producción. La plataforma se lanza en su versión 0.22.0 con enfoque MVP y se despliega como sitio estático para garantizar tiempos de carga rápidos y SEO óptimo. La publicidad se activa únicamente cuando el visitante acepta las cookies, en línea con la normativa RGPD.

## Stack

- **Astro 5.x** como framework de generación estática, permitiendo componer páginas con rendimiento alto y construir un sitio completamente estático.
- **Vanilla JavaScript** para implementar la lógica de herramientas (generación de QR, contraseñas y contador).
- **JSON** como fuente de datos estructurados para las herramientas y las descargas.
- **Netlify** para el alojamiento estático y la configuración de cabeceras de seguridad (CSP, redirecciones).
- **Monetag** como red de publicidad, con formatos OnClick/Pop-under y Push activados tras interacción.
- **Service Worker** para la suscripción a notificaciones push.
- **Gestor de consentimiento de cookies** que bloquea scripts publicitarios hasta recibir el consentimiento.

## Resultados (v0.22.0)

- Consolidación de tres herramientas funcionales: generador de QR, generador de contraseñas y contador de palabras (beta), todas ejecutándose en el navegador sin enviar datos sensibles.
- Interfaz unificada con buscador de texto y filtros por categorías que facilita encontrar herramientas.
- Implementación de un catálogo de descargas con más de cuatro categorías (VPNs, visores, editores y plantillas) y verificación de enlaces oficiales para asegurar descargas seguras.
- Integración de formatos de publicidad OnClick (pop-under) y notificaciones push de Monetag con políticas de frecuencia y activación solo tras consentimiento.
- Desarrollo de un banner de cookies/privacidad que cumple RGPD y bloquea scripts hasta la aceptación del usuario.
- Despliegue estático en Netlify con configuraciones de seguridad (HTTPS y CSP) y dominio personalizado utilibox.app.

## Roadmap corto

- Completar y lanzar nuevas utilidades (p. ej., conversores de unidades, generadores de lorem ipsum) siguiendo la misma arquitectura de ejecución en cliente.
- Habilitar el formato de publicidad banner display de Monetag y evaluar formatos adicionales (Vignette, In-Page Push, Interstitial) según resultados de ingresos.
- Mejorar la accesibilidad (a11y) y experiencia de usuario, con foco en Core Web Vitals y tiempos de carga.
- Ampliar el catálogo de descargas con nuevas categorías y mantener actualizado el control de verificación de fuentes oficiales.
- Implementar analíticas sin cookies para comprender el uso de cada herramienta y ajustar la frecuencia de anuncios sin comprometer la privacidad.
