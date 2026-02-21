---
title: Cartas Rápidas
description: Generador de cartas legales frecuentes para España, con plantillas
  guiadas, exportación a PDF, monetización con Google AdSense/Ezoic, suite de
  testing completa (Vitest + Playwright) y Lighthouse CI integrado en Netlify.
tags:
  - astro
  - netlify
  - seo
  - performance
  - core‑web‑vitals
  - ux
  - a11y
  - ci‑cd
  - '"cartas-rapidas"'
  - '"web"'
published: true
active: true
status: active
featured: true
date: 2025-12-31T00:00:00.000+01:00
updated: 2026-02-05T16:57:00.000+01:00
projectUrl: https://cartasrapidas.es
repoUrl: null
demoUrl: ""
changelog:
  - version: v1.4.0
    date: 2025-12-31
    changes:
      - type: added
        text: "Módulo de cuenta local cifrada: permite guardar, cargar y
          exportar/importar cartas, firmas y recordatorios en el navegador
          usando localStorage y WebCrypto sin recurrir a servidores."
      - type: added
        text: Soporte multilingüe (español, catalán y euskera) con rutas localizadas,
          traducciones centralizadas y sitemap por idioma.
      - type: added
        text: Componente de llamada a la acción para feedback y mejora del formulario de
          contacto con preselección de guía, motivo y mensaje.
      - type: added
        text: Modo oscuro y modo de alto contraste con tokens de diseño y conmutadores
          accesibles en la barra de navegación.
      - type: changed
        text: "Normalización de slugs y mejoras SEO: slugs uniformes con guiones,
          verificación de unicidad, nuevas opciones de Open Graph (campo
          og_image) y sitemap con prioridades y changefreq dinámico."
      - type: changed
        text: "Actualización de datos legales y de contacto: unificación del correo de
          contacto a info@cartasrapidas.es y añadido enlace al portfolio
          profesional."
      - type: devops
        text: Integración de workflows de GitHub Actions para CI, auditoría de paquetes,
          tests de Lighthouse y despliegues automáticos en Netlify, más
          configuración de Dependabot.
      - type: docs
        text: "Documentación ampliada: nuevos README, CONTRIBUTING.md y guías de
          agentes, además de plantillas de issues y PR para estandarizar
          contribuciones."
  - version: v0.2.5
    date: 2025-12-15
    changes:
      - type: added
        text: Generador de cartas basado en plantillas Markdown (colección de contenido)
          con campos dinámicos a partir de placeholders.
      - type: added
        text: Previsualización, copia al portapapeles y descarga en PDF (jsPDF) desde el
          navegador.
      - type: added
        text: Firma manuscrita opcional mediante canvas cuando la plantilla incluye el
          placeholder {firma}.
      - type: added
        text: Sección de guías/plantillas que lista las cartas disponibles y enlaza por
          slug.
      - type: changed
        text: Configuración del sitio en Astro (site=https://cartasrapidas.es) y
          prefetch habilitado.
      - type: devops
        text: Despliegue en Netlify con build estático (dist) y Node 20 en producción,
          branch deploys y deploy previews.
      - type: devops
        text: "GitHub Actions para auto-etiquetado: tags vX.Y.Z en main y vX.Y.Z-rc en
          staging a partir de package.json."
  - version: v2.35.0
    date: 2026-02-05T16:58:00.000+01:00
    changes:
      - type: added
        text: "Monetización con Google AdSense y Ezoic: integración de espacios
          publicitarios con banner de consentimiento CMP (Gatekeeper), ads.txt
          gestionado vía redirect y CSP ampliado para permitir scripts de ambas
          plataformas."
      - text: added
        type: Google Analytics 4 (G-QZ87TJZKM1) activado en producción a través de
          variable de entorno en netlify.toml, con web-vitals añadido como
          dependencia de producción para envío de métricas Core Web Vitals.
      - type: added
        text: "Suite de testing completa: tests unitarios con Vitest (jsdom), E2E con
          Playwright (Chromium en local; Chromium + Firefox + WebKit en CI) y
          script ci-playwright.sh que omite gracefully si no hay tests."
      - type: added
        text: "Lighthouse CI integrado en dos capas: GitHub Actions (lhci autorun,
          artefacto lhci-report) y plugin @netlify/plugin-lighthouse en Netlify
          con umbrales de performance ≥0.85, a11y ≥0.90 y SEO ≥0.90."
      - type: added
        text: "Sección de recursos ampliada con páginas independientes: derechos del
          consumidor, cambios legislativos, consejos de envío, protección de
          datos, ficheros de morosidad y cómo escalar una reclamación."
      - type: added
        text: "Páginas informativas: FAQ con datos estructurados FAQPage (Schema.org),
          página 'Sobre' con secciones y lista de enlaces legales, y brand-spec
          con paleta de colores, escala tipográfica, tokens de espaciado,
          radios, sombras y motion."
      - type: changed
        text: "Rutas i18n (ca/eu) redirigidas a / en netlify.toml: la infraestructura
          multilingüe permanece en código pero las rutas /ca y /eu no están
          activas en producción en esta versión."
      - type: changed
        text: jsPDF actualizado a ^4.1.0 (major bump desde v2.x).
      - type: changed
        text: Políticas legales (privacidad, cookies, aviso) actualizadas en enero de
          2026 para incluir Ezoic como tercero, transferencias internacionales
          de datos y base jurídica de publicidad personalizada.
      - type: devops
        text: "CI refactorizado en jobs independientes: lint, i18n:check, unit tests
          (Vitest), E2E (Playwright) y Lighthouse; workflow netlify-deploy.yml
          se dispara solo tras CI verde en staging/main."
      - type: devops
        text: "Headers de seguridad completos en netlify.toml: CSP granular con
          allowlist para AdSense, GTM, Ezoic y GA4; HSTS preload;
          X-Frame-Options DENY; Permissions-Policy restrictiva; política
          diferenciada para /ads/*."
      - type: refactor
        text: Script verify-ci.sh unifica el flujo completo (install, lint, unit, e2e,
          lhci) con NODE_ENV=development y HUSKY=0 para entornos CI.
---
## Resumen
Cartas Rápidas es una herramienta web para generar cartas legales claras y listas para enviar, orientada a casos frecuentes en España (baja de gimnasio, desistimiento, reclamaciones, devoluciones SEPA y solicitudes relacionadas con ASNEF). En la versión 2.x el proyecto evoluciona hacia un portal de información legal con sección de recursos extensa, monetización mediante Google AdSense y Ezoic, analítica GA4, y una suite de calidad completa (Vitest + Playwright + Lighthouse CI en Netlify y GitHub Actions).

## Contexto
Proyecto de utilidad pública: combina contenido legal "plantillable" con guías prácticas, páginas de recursos temáticos (derechos del consumidor, protección de datos, cambios legislativos, etc.) y FAQ estructurada. El despliegue sigue un flujo dev → staging → main con versiones etiquetadas automáticamente y builds estáticos en Netlify. Desde la v2.x incorpora monetización publicitaria (AdSense + Ezoic) con consentimiento CMP y políticas legales actualizadas, y cuenta con un sistema de CI/CD robusto que incluye E2E con Playwright y auditorías Lighthouse con umbrales de calidad obligatorios.

## Stack
- Astro 5 para sitio estático, content collections, rutas localizadas (i18n) y SEO configurado con datos estructurados (Schema.org).
- Tailwind CSS 4 con plugin Vite (`@tailwindcss/vite`) y tokens de tema para modo claro/oscuro y alto contraste.
- Preact para componentes interactivos (generador, feedback CTA, conmutadores de tema).
- jsPDF 4 para exportación de cartas a PDF en el cliente.
- WebCrypto API y localStorage para el módulo de cuenta local cifrada.
- web-vitals (producción) para reporte de métricas Core Web Vitals a GA4.
- Google Analytics 4 y Google AdSense + Ezoic para analítica y monetización, con banner CMP (Gatekeeper Consent).
- Netlify con Node 20, plugin @netlify/plugin-lighthouse (umbrales de quality gate), headers CSP granulares y redirect de ads.txt a Ezoic.
- GitHub Actions: CI con jobs de lint, i18n:check, Vitest (unit), Playwright (E2E) y LHCI (Lighthouse); Dependabot para npm y actions.
- Vitest + jsdom para tests unitarios y Playwright (Chromium/Firefox/WebKit) para E2E.

## Resultados (v2.35.0)
- **Monetización integrada:** Google AdSense y Ezoic activos en producción con banner de consentimiento CMP, ads.txt delegado vía redirect y CSP adaptado para ambas plataformas sin degradar la seguridad del resto del sitio.
- **Analítica real:** GA4 configurado mediante variable de entorno en Netlify y web-vitals integrado como dependencia de producción para enviar métricas CWV directamente a Google Analytics.
- **Quality gates en Lighthouse:** el plugin de Netlify falla el deploy si performance < 0.85, a11y < 0.90 o SEO < 0.90; adicionalmente LHCI corre en CI de GitHub Actions y sube artefactos del informe.
- **Testing completo:** Vitest para lógica unitaria (jsdom) y Playwright para E2E con soporte multi-navegador en CI; ambos integrados en el pipeline de CI de GitHub Actions y en el script `ci:verify` local.
- **Portal de recursos:** seis páginas de recursos temáticos independientes (con datos estructurados Article y Schema.org), FAQ con FAQPage schema, página "Sobre" e índice de recursos enlazado desde la home.
- **Sistema de diseño documentado:** página brand-spec con paleta de colores tokenizada, escala tipográfica, tokens de espaciado, radios, sombras y motion; accesible en `/brand-spec` para referencia interna.
- **Seguridad por capas:** headers HTTP completos (CSP, HSTS preload, X-Frame-Options DENY, Permissions-Policy restrictiva) con política diferenciada para `/assets/*`, `/*` y `/ads/*`.

## Resultados (v1.4.0)
- **Experiencia multilingüe:** la web está disponible en español, catalán y euskera con rutas localizadas y metadatos SEO por idioma, lo que amplía el alcance y mejora el posicionamiento.
- **Cuenta local cifrada:** los usuarios pueden guardar borradores de cartas, firmas y recordatorios en su dispositivo, exportarlos/importarlos con cifrado AES‑GCM y recuperarlos sin backend, mejorando la retención y la privacidad.
- **Feedback contextual:** cada guía incluye una llamada a la acción que abre el formulario de contacto pre‑rellenado, facilitando la recogida de sugerencias e incidencias específicas.
- **Accesibilidad y personalización:** se introducen modos oscuro y de alto contraste con persistencia en localStorage y conmutadores accesibles, mejorando la usabilidad en diferentes entornos.
- **SEO avanzado:** normalización de slugs, control de duplicados, campos opcionales og_image y un sitemap enriquecido con changefreq/priority elevan la indexación y la presentación en redes sociales.
- **Transparencia y profesionalidad:** actualización de todas las referencias al correo de contacto a info@cartasrapidas.es
 y añadido enlace al portfolio del autor en la sección "Quién está detrás".
- **DevOps y documentación:** nuevos workflows de CI/CD automatizan tests, auditorías y despliegues; documentación completa y plantillas de PR/issues facilitan contribuciones y mantienen la calidad del código.

## Resultados (v0.2.5)
- Generación de cartas completamente en el navegador: mejora de privacidad al no depender de backend para datos personales.
- Catálogo de plantillas en Markdown con placeholders: mantenimiento más simple (editar contenido sin tocar lógica de UI).
- Exportación a PDF y copia rápida: reduce fricción para el caso de uso principal (enviar por correo/registro).
- "Guías y plantillas" como capa de descubrimiento: facilita navegación a cada modelo disponible.
- Señales técnicas para SEO/performance: `site` configurado en Astro y prefetch activado para navegación más fluida.

## Roadmap corto
- Reactivar rutas i18n (ca/eu) en producción cuando las traducciones estén completas y validadas por revisores nativos; actualmente están redirigidas a `/` en Netlify.
- Sincronizar el módulo de cuenta local con almacenamiento en la nube opcional para que los usuarios puedan recuperar cartas en múltiples dispositivos.
- Ampliar la cobertura de tests E2E (Playwright) con escenarios de generación de carta, firma y descarga PDF.
- Incorporar analítica opt‑in anonimizada para priorizar nuevas plantillas y mejoras según el uso real (GA4 ya activo; pendiente dashboard de contenidos).
- Evaluar migración de rutas `/ca` y `/eu` a subdominio o dominio independiente para mejorar el SEO multilingüe cuando la localización esté completa.
