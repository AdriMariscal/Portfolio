# Verificación de ratios de contraste — Paleta v2.0

**Fecha:** 2026-03-13
**Herramienta:** Cálculo WCAG 2.1 (fórmula de luminancia relativa) — verificado con WebAIM Contrast Checker
**Referencia:** guía de marca v2.0 §10.1
**Issue:** #578 — T-002 [BRAND] Verificar ratios de contraste con herramienta para nueva paleta Sand

---

## Resultados

| Combinación | Texto | Fondo | Ratio real | Nivel real | Guía esperaba | Estado |
|-------------|-------|-------|-----------|------------|---------------|--------|
| Sand 500 / Charcoal 900 | `#E2CC96` | `#2F3437` | **7.98:1** | AAA | ~8.5:1 AAA | ✅ Pasa |
| Blanco / Charcoal 900 | `#F9FAFB` | `#2F3437` | **12.05:1** | AAA | 12.60:1 AAA | ✅ Pasa |
| Teal 500 / Charcoal 900 | `#2DD4BF` | `#2F3437` | **6.77:1** | AA | 7.30:1 **AAA** | ⚠️ Pasa AA, no AAA |
| Teal 700 / Sand 100 | `#0F766E` | `#F0ECE4` | **4.65:1** | AA | ~6.8:1 AA | ✅ Pasa |
| Charcoal 900 / Sand 100 | `#2F3437` | `#F0ECE4` | **10.69:1** | AAA | ~11.2:1 AAA | ✅ Pasa |
| Charcoal 950 / Sand 500 | `#1F2426` | `#E2CC96` | **9.94:1** | AAA | ~9.5:1 AAA | ✅ Pasa |
| Charcoal 700 / Charcoal 900 | `#4B555B` | `#2F3437` | **1.65:1** | No texto | 1.65:1 No texto | ✅ Confirmado |

---

## Conclusión

**Las 4 combinaciones Sand de la issue #578 pasan su nivel WCAG documentado:**

- Sand 500 / Charcoal 900: 7.98:1 → **AAA** ✅
- Teal 700 / Sand 100: 4.65:1 → **AA** ✅
- Charcoal 900 / Sand 100: 10.69:1 → **AAA** ✅
- Charcoal 950 / Sand 500: 9.94:1 → **AAA** ✅

No se requieren tareas derivadas para la paleta Sand.

---

## Hallazgo adicional — Teal 500 / Charcoal 900 ⚠️

La guía listaba Teal 500 / Charcoal 900 como `7.30:1 AAA`. El valor real es `6.77:1 AA`.

- La combinación **pasa AA** (≥ 4.5:1) y es segura para texto normal.
- **No alcanza AAA** (< 7.0:1), al contrario de lo que indicaba la guía.
- Teal 500 (`#2DD4BF`) se usa principalmente como color interactivo (hover, focus, link activo), no como color de texto primario. Su rol está dentro del umbral AA seguro.
- La guía v2.0 §10.1 ha sido corregida con el valor real.

---

## Notas metodológicas

Los ratios se calculan con la fórmula WCAG 2.1:
- Luminancia relativa: `L = 0.2126·R + 0.7152·G + 0.0722·B` (canales linearizados)
- Ratio de contraste: `(L_claro + 0.05) / (L_oscuro + 0.05)`
- Umbrales: AA ≥ 4.5:1 (texto normal), AA Large ≥ 3:1 (texto grande ≥18pt), AAA ≥ 7:1
