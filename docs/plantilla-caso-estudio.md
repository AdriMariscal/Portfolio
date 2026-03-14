# Plantilla de Caso de Estudio — Antes/Después

Guía para añadir la sección estandarizada **Antes/Después** a cualquier ficha de proyecto.

---

## ¿Para qué sirve?

La sección muestra una tabla de métricas comparativas entre la versión inicial y la versión actual del proyecto. Es el diferenciador más potente para convertir visitas de pymes técnicas: ningún competidor directo ofrece este nivel de transparencia con métricas verificables.

---

## Cómo añadir la sección a un proyecto nuevo

1. Abre el archivo `.md` del proyecto en `src/content/projects/`.
2. Añade el bloque `beforeAfter` en el frontmatter **antes** de `changelog:`.
3. Rellena las métricas reales con fuente verificable (Lighthouse CI, analítica, etc.).

---

## Estructura del campo `beforeAfter`

```yaml
beforeAfter:
  - metric: "Nombre de la métrica"
    before: "Valor inicial"
    after: "Valor actual"
    improvement: "+X pts / -Y%"    # opcional
    description: "Descripción breve de la métrica"  # opcional
    source: "Fuente del dato"       # opcional, recomendado
```

### Campos

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `metric` | string | ✅ | Nombre corto de la métrica (ej. `Performance`, `LCP`) |
| `before` | string | ✅ | Valor antes de la optimización (ej. `"68"`, `"4.8 s"`) |
| `after` | string | ✅ | Valor después de la optimización (ej. `"97"`, `"1.2 s"`) |
| `improvement` | string | — | Delta formateado (ej. `"+29 pts"`, `"-75%"`) |
| `description` | string | — | Explicación de la métrica para usuarios no técnicos |
| `source` | string | — | Fuente del dato para verificabilidad |

---

## Métricas recomendadas por tipo de proyecto

### Web / Portfolio / SaaS

| Métrica | Descripción | Herramienta de medición |
|---|---|---|
| Performance | Puntuación global Lighthouse | Lighthouse CI |
| LCP | Largest Contentful Paint | Lighthouse CI / CrUX |
| CLS | Cumulative Layout Shift | Lighthouse CI / CrUX |
| INP | Interaction to Next Paint | Lighthouse CI / CrUX |
| Bundle JS | Tamaño total JS transferido | `astro build` / bundle analyzer |
| Accessibility | Puntuación Lighthouse Accessibility | Lighthouse CI |
| SEO | Puntuación Lighthouse SEO | Lighthouse CI |

### E-commerce / Lead generation

Añadir también: tasa de conversión (%), tiempo en página, tasa de rebote, Core Web Vitals en campo (CrUX).

### Aplicación con backend

Añadir también: TTFB, tiempo de respuesta de API (p50/p95), errores por minuto.

---

## Ejemplo completo (proyecto Portfolio)

```yaml
beforeAfter:
  - metric: "Performance"
    before: "68"
    after: "97"
    improvement: "+29 pts"
    description: "Puntuación global Lighthouse Performance"
    source: "Lighthouse CI histórico (v0.1.1 → v3.55.6)"
  - metric: "LCP"
    before: "4.8 s"
    after: "1.2 s"
    improvement: "-75%"
    description: "Largest Contentful Paint"
    source: "Lighthouse CI histórico (v0.1.1 → v3.55.6)"
  - metric: "CLS"
    before: "0.28"
    after: "0.02"
    improvement: "-93%"
    description: "Cumulative Layout Shift"
    source: "Lighthouse CI histórico (v0.1.1 → v3.55.6)"
  - metric: "Bundle JS"
    before: "~540 KB"
    after: "~82 KB"
    improvement: "-85%"
    description: "Tamaño total de JavaScript transferido"
    source: "Análisis de build (astro build)"
```

---

## Dónde aparece en la UI

El componente `BeforeAfter.astro` se renderiza automáticamente en la ficha de proyecto (`/projects/[slug]`) si el frontmatter contiene el campo `beforeAfter` con al menos un elemento. La sección aparece entre el cuerpo del proyecto y el changelog.

---

## Criterios de calidad

- **Verificabilidad:** incluye siempre el campo `source` con la herramienta y las versiones comparadas.
- **Honestidad:** usa valores reales de Lighthouse CI histórico, analítica o capturas. No inventes métricas.
- **Contexto:** añade `description` para métricas técnicas que pueden no ser obvias para el cliente.
- **Consistencia:** usa siempre el mismo formato de unidades (segundos para tiempos, puntos para scores, % para mejoras relativas).

---

*Plantilla creada con la issue T-017 (#593) · v4.12.0*
