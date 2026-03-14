# Diario de desarrollo — v4.x

Notas rápidas de cambios durante el desarrollo de la línea major v4.
Regla: todas las versiones MINOR se registran; PATCH solo cuando aporte.

## v4.0.0 — 2026-03-13
- Inicio de la línea major v4 (bump:major).
- Motivo: comienzo del MVP v4 — aplicación de guía de marca v2.0 (paleta Sand desaturada, light mode rediseñado, principio de contención de color).

## v4.1.0 — 2026-03-13
- T-001 [BRAND]: tokens CSS actualizados a guía de marca v2.0 (`--palette-sand-100` `#FBE7B5→#F0ECE4`, `--palette-sand-200` `#E8D3A3→#C9B07A`, `--palette-sand-500` `#FBE7B5→#E2CC96`).
- Paleta Sand desaturada en cascada: rgba del tema light (overlay, header-bg, menu-bg) actualizados a los nuevos valores rgb de Sand 100.
- Comentario del archivo de tokens actualizado de v1.6 a v2.0.
- Refs: #577 / https://github.com/AdriMariscal/Portfolio/issues/577

## v4.3.0 — 2026-03-13
- T-003 [BRAND]: light mode 'Neutral funcional' aplicado end-to-end — fondo `#F0ECE4` (Sand 100), cards blanco (`#FFFFFF`), texto Charcoal 900.
- Corregidos `--color-bg`, `--color-surface`, `--color-surface-alt` y `--color-canvas` en `[data-theme="light"]`; eliminado el uso residual de Sand 200 y Sand 500 como fondos en modo claro.
- Resultado: ninguna sección muestra fondo perceptiblemente amarillo en light mode; el toggle de tema ya no produce regresión visual.
- Refs: #579 / https://github.com/AdriMariscal/Portfolio/issues/579

## v4.4.0 — 2026-03-14
- T-004 [BRAND]: auditada y corregida la regla de contención de color (máx. 2 marcas por sección) en Home, /services y /projects.
- Botón primario cambiado de gradiente Teal a Sand 500 (corrección fundamental: el CTA principal es el acento de marca Sand, no el color interactivo Teal).
- Barras decorativas de `.section__title` (barra vertical + subrayado) convertidas de Teal a gradiente Sand 500→Sand 200.
- Icono del theme-toggle, bandas de tarjetas de proyecto/gracias y punto decorativo de About: Teal reemplazado por Sand.
- Tags/chips: fondo y borde cambiados de teal-soft (`rgba(45,212,191,0.18)`) a sand-soft (`rgba(226,204,150,0.12)`).
- Glow del hero en dark mode: teal `rgba(45,212,191,0.24)` → sand cálido `rgba(226,204,150,0.10)`.
- Resultado: ninguna sección muestra Charcoal + Sand + Teal simultáneamente en reposo; Teal queda exclusivamente en estados hover/focus/activo.
- Refs: #580 / https://github.com/AdriMariscal/Portfolio/issues/580

## v4.5.0 — 2026-03-14
- T-005 [BRAND]: auditoría y corrección del uso de Teal — solo interacción y estado, nunca decorativo.
- `--color-success` corregido de `teal-500` a `--palette-success-500` (`#22C55E`); sus derivados `--color-success-border` y `--color-success-soft` actualizados a RGBA de verde (#22C55E).
- Light mode: `--color-accent`, `--color-accent-strong` y `--color-focus` cambiados de `teal-500` a `teal-600` (`#0F766E`) para cumplir la guía (mejor contraste en fondo Sand 100) y coherencia con la regla de Teal por modo.
- Todos los RGBA derivados de teal-500 en light mode actualizados a RGBA de teal-600.
- Resultado: `--color-success` ya no es Teal (era incorrecto semánticamente); en light mode el foco y las interacciones usan el teal con contraste adecuado (4.65:1 AA sobre Sand 100 según §10.1).
- Refs: #581 / https://github.com/AdriMariscal/Portfolio/issues/581

## v4.6.0 — 2026-03-14
- T-007 [BRAND]: formulario de contacto rediseñado con campos de cualificación de lead (URL, Stack, Objetivo, Plazo, Presupuesto).
- Objetivo pasa a ser campo requerido; URL y Plazo son campos nuevos opcionales.
- Placeholders alineados con la guía de marca §6; mensaje de confirmación actualizado a "Recibido. En breve te respondo con los siguientes pasos."
- Honeypot `bot-field` añadido al formulario y verificado en la Netlify Function; hidden input `form-name` para registro en Netlify Forms.
- Netlify Function actualizada para recoger y reenviar `url`, `deadline`, `goal` como obligatorio; bloque Slack ampliado con los nuevos campos.
- Refs: #583 / https://github.com/AdriMariscal/Portfolio/issues/583

## v4.7.0 — 2026-03-14
- T-010 [SEO]: meta title del Home optimizado para keyword al inicio — cambiado de "Rendimiento web · Portfolio de Adrián Mariscal" (47 chars) a "Diseñador Web Performance · Adrián Mariscal" (44 chars).
- Keyword principal "Diseñador Web" en los primeros 25 caracteres (criterio: ≤30); título ≤60 caracteres (44 chars) — cumple §7 de la guía de marca.
- Añadida constante `HOME_META_TITLE` en `src/lib/seo.ts`; `SEO_KEYWORD` global sin cambios (no impacta otras páginas).
- Test unitario añadido en `tests/unit/seo.test.ts` verificando los dos criterios de aceptación.
- Refs: #586 / https://github.com/AdriMariscal/Portfolio/issues/586

## v4.10.0 — 2026-03-14
- T-015 [FEAT]: Decap CMS simplificado a modo editorial `simple` — `publish_mode` cambiado de `editorial_workflow` a `simple`.
- `branch` cambiado de `dev` a `main`: los commits del CMS van directamente a `main` y Netlify auto-despliega en producción sin pasar por staging.
- `site_url` y `display_url` ya apuntaban a `https://adrianmariscal.es` (configuración previa correcta).
- Pendiente (configuración externa): verificar variables de entorno `CMS_SITE_URL` y `CMS_DISPLAY_URL` en contexto `production` de Netlify.
- Refs: #591 / https://github.com/AdriMariscal/Portfolio/issues/591

## v4.9.0 — 2026-03-14
- T-012 [SEO]: schema.org `BreadcrumbList` verificado en ambas páginas de detalle; añadido breadcrumb visual (UI) que refleja la jerarquía Inicio › Blog/Proyectos › Título en `/blog/[slug]` y `/projects/[slug]`.
- El JSON-LD `BreadcrumbList` ya existía y es correcto (3 ítems, `item` con URL absoluta); esta versión añade el `<nav aria-label="Ruta de navegación">` visible para que la UI coincida con el schema, cumpliendo el criterio de Rich Results Test.
- CSS `.breadcrumb` añadido en `global.css` con tokens de texto muted, truncado de título largo y hover en `--color-accent`.
- Refs: #588 / https://github.com/AdriMariscal/Portfolio/issues/588

## v4.8.0 — 2026-03-14
- T-011 [SEO]: schema.org `Person` ampliado con `sameAs` (LinkedIn + GitHub) y `jobTitle` corregido a "Diseñador Web" (alineado con guía de marca v2.0).
- Nodo `Organization` en BaseLayout elevado a `["ProfessionalService", "LocalBusiness"]` con `areaServed: "España"` y `priceRange: "€€"` para Google Knowledge Graph y featured snippets de marca.
- URLs de redes sociales centralizadas en `SITE.linkedin` y `SITE.github` (`src/lib/config.ts`); accesibles desde cualquier componente.
- 4 tests unitarios nuevos en `tests/unit/schema-org.test.ts` que verifican los campos críticos del schema.
- Refs: #587 / https://github.com/AdriMariscal/Portfolio/issues/587

## v4.2.0 — 2026-03-13
- T-002 [BRAND]: verificados con fórmula WCAG 2.1 todos los ratios de contraste de §10.1 de la guía de marca.
- Las 4 combinaciones Sand nuevas pasan su nivel esperado: Sand 500/Charcoal 900 → 7.98:1 AAA; Teal 700/Sand 100 → 4.65:1 AA; Charcoal 900/Sand 100 → 10.69:1 AAA; Charcoal 950/Sand 500 → 9.94:1 AAA.
- Tabla §10.1 actualizada con valores exactos (sin `~`); Teal 500/Charcoal 900 corregido de 7.30:1 AAA → 6.77:1 AA (uso interactivo, no texto primario).
- Nuevo archivo `docs/contraste-v2.md` con informe completo de verificación.
- Refs: #578 / https://github.com/AdriMariscal/Portfolio/issues/578
