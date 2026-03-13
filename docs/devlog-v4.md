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

## v4.2.0 — 2026-03-13
- T-002 [BRAND]: verificados con fórmula WCAG 2.1 todos los ratios de contraste de §10.1 de la guía de marca.
- Las 4 combinaciones Sand nuevas pasan su nivel esperado: Sand 500/Charcoal 900 → 7.98:1 AAA; Teal 700/Sand 100 → 4.65:1 AA; Charcoal 900/Sand 100 → 10.69:1 AAA; Charcoal 950/Sand 500 → 9.94:1 AAA.
- Tabla §10.1 actualizada con valores exactos (sin `~`); Teal 500/Charcoal 900 corregido de 7.30:1 AAA → 6.77:1 AA (uso interactivo, no texto primario).
- Nuevo archivo `docs/contraste-v2.md` con informe completo de verificación.
- Refs: #578 / https://github.com/AdriMariscal/Portfolio/issues/578
