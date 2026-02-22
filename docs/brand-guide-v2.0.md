# GUÍA DE IMAGEN DE MARCA — ADRIÁN MARISCAL

> **Versión:** v2.0  
> **Fecha de actualización:** 22/02/2026  
> **Estado:** Actualización basada en feedback — pendiente validación  
> **Basado en:** brand-guide-v1.6 (10/01/2026)

---

## Historial de versiones

| Versión | Fecha | Nivel de intervención | Resumen del cambio |
|---------|-------|-----------------------|--------------------|
| v1.0–v1.5 | — | — | Historial previo (ver archivo) |
| v1.6 | 10/01/2026 | — | Versión base pre-feedback |
| v2.0 | 22/02/2026 | Nivel 2 — Revisión parcial | Paleta Sand desaturada, light mode rediseñado, principio de contención de color, tokens actualizados en cascada |

---

## ═══ PASO 0 — DIAGNÓSTICO PREVIO ═══

*(Sección de edición interna — preservar para trazabilidad)*

### 0.1 Lectura del documento de entrada

- **Formato recibido:** PDF (15 páginas) — extraído correctamente.
- **Pérdidas detectadas:** Tablas recuperadas con fidelidad estructural. Bloques de código CSS/JSON recuperados pero con posibles pérdidas de espaciado; regenerados íntegramente en §12. SVGs de logo no recuperables desde PDF → no afectados por este feedback (ver §ENTREGABLE C).
- **Versión identificada:** v1.6 (fecha 10/01/2026).
- **Secciones contenidas:**
  1. Meta
  2. Resumen ejecutivo
  3. Contexto del proyecto / Objetivo
  4. Audiencia
  5. Personalidad de marca
  6. Voz y tono / Do·Don't / Microcopy
  7. Sistema visual (direcciones)
  8. Logo (versiones, restricciones)
  9. Color (paleta, uso recomendado, accesibilidad)
  10. Tipografía
  11. Layout y Design System (breakpoints, espaciado, componentes)
  12. Iconografía
  13. Oferta comercial / Packs
  14. Imagen y fotografía / Motion / Accesibilidad
  15. Tokens de implementación (CSS y JSON)
  16. Firma desde proyectos
  17. Suposiciones y preguntas abiertas

### 0.2 Análisis del feedback

| ID | Extracto del feedback | Categoría | Sección(es) afectada(s) | Impacto en cascada |
|----|-----------------------|-----------|-------------------------|--------------------|
| F1 | "Satura un poco la vista" / "un amarillo que no sature tanto al leer" (Jordao) | **Cosmético → Funcional** | Color → Sand 500/700 | Tokens CSS/JSON, componentes (CTA, botón primary), tabla de contraste |
| F2 | "Muy amarilla aún" en light mode / "no la veo acorde para ofrecer servicios" (Jordao, Adoración) | **Estratégico** | Color → Sand 100, Tokens light theme, Direcciones visuales | Light theme completo (bg, surface, text), CSS tokens, Design directions table |
| F3 | "Mala elección de colores" / "da sensación de sucio/pesadez" (Anabel) | **Cosmético + Estratégico** | Color, Direcciones visuales | Principio de contención de color (nueva regla), guía de uso por sección |
| F4 | "Con 2 colores o 3 puedes hacer todo" / "tanto cambio de color le resta coherencia" (Anabel) | **Estratégico** | Color — reglas de uso | Nueva regla: máx. 2 colores de marca visibles por sección simultáneamente |
| F5 | "El amarillo con el gris da marrón muy feo" / "el verde con el gris crea un azul extraño" (Anabel) | **Funcional** | Color — Teal 500 como interacción visible | Restricción: Teal exclusivamente en estados interactivos, no decorativo |
| F6 | Oscuro: 8–9/10 / Claro: 6/10 (Jordao, Adoración) | **Confirmación** | Sistema visual — reafirma dark como principal | Light mode debe estar correctamente resuelto, no solo "disponible" |
| F7 | "Amateur/barata" (Anabel) — diverge con "premium/profesional" (Jordao, Adoración) | **Contradictorio** | Toda la guía | Ver resolución en §0.2a |

**§0.2a — Resolución del conflicto F7:**  
Anabel valora el modo claro como referencia y lo encuentra poco profesional; Jordao y Adoración evalúan mayoritariamente el modo oscuro y lo califican premium. La divergencia no invalida la dirección creativa: el 75% del feedback confirma calidad premium en dark. La percepción "amateur" de Anabel tiene origen concreto y accionable: el Sand demasiado amarillo en light mode y la sobreexposición simultánea de colores. Se resuelve vía F1+F2+F4 sin cambiar la identidad central. *Pregunta abierta en §14.*

### 0.3 Cálculo del nivel de intervención

**Nivel elegido: NIVEL 2 — Revisión parcial → v2.0**

**Justificación:**
- F2 es estratégico: el light mode pasa de "alternativa coherente" a requerer rediseño de su base de color.
- F4 añade un principio de sistema (regla de contención) que no existía en v1.6 y afecta la guía de uso de color globalmente.
- Las secciones afectadas son: Color, Tokens CSS/JSON, Design directions, componentes (propagación). Representan ~35% del documento.
- El core intacto: posicionamiento, paleta Charcoal, Teal como acento, tipografía, logo, voz y tono, oferta comercial, layout.
- No hay invalidación del posicionamiento central → Nivel 3 descartado.

---

## §1 — Meta

| Campo | Valor |
|-------|-------|
| Dominio | adrianmariscal.es |
| Versión guía | v2.0 |
| Fecha | 22/02/2026 |
| Descriptor | WEB DESIGNER |
| Posicionamiento publicitario | Web Performance + capacidad end-to-end (Astro + Node cuando aporta) |
| Capacidad Secundaria | Salesforce (Selectivo sin protagonismo) |
| Arquitectura de marca | House of Brands (cada proyecto con identidad propia) + firma estándar hacia web principal |
| Colores Núcleo | Charcoal y Sand *(paleta Sand ajustada en v2.0)* |
| Tema | Oscuro principal + claro como alternativa funcional accesible. Toggle discreto en navbar. |
| Oferta comercial | Auditoría gratuita + Informe Base Gratis (48–72h) + Informe Completo 149€ descontable (incluye sesión de 30 min) + 3 packs cerrados |
| Línea editorial prevista | 70% contenido técnico (performance/SEO/stack) + 30% contenido híbrido/no técnico (producto/negocio/proceso), revisable según tracción |

---

## §2 — Resumen Ejecutivo

Marca personal orientada a diseño web con rigor técnico, centrada en rendimiento, SEO, y UX.

**Promesa:** Webs rápidas, mantenibles y medibles, con un proceso claro y decisiones justificadas.

**Identidad:** precisión (sistema), calma (espacio editorial) y confianza (métricas + transparencia).

El modo oscuro es la expresión primaria de la marca y su versión premium. El modo claro existe como alternativa funcional para preferencias de accesibilidad: se ha reformulado para ser neutral, limpio y coherente, sin reproducir la paleta de marca en clave amarilla.

---

## §3 — Contexto del proyecto

### Objetivo

- Captar clientes como Web Designer con enfoque performance-first.
- Convertir contenido técnico (blog) en autoridad y leads.
- Línea editorial inicial (revisable): 70% contenido técnico y 30% contenido híbrido/no técnico.
- Posicionar "reconstrucción performance-first" para casos WP/Landing.

### Audiencia

- Pymes y producto digital.
- Agencias/equipos técnicos.

### Diferenciadores

- Métricas y plan priorizado (P0, P1, P2).
- End-to-End con criterio (Astro + Node cuando aporta).
- Pragmatismo comercial (packs cerrados).

**Palabras clave:** Rendimiento, Claridad, SEO técnico, Accesibilidad, Modularidad, Sistema, Escalabilidad, End-to-End, Pragmatismo.

---

## §4 — Personalidad de marca

### Atributos
Rigurosa · Clara · Pragmática · Sobria · Cálida · Orientada a resultados

### ES / NO ES

| ES | NO ES |
|----|-------|
| Performance-first | "Bonita" pero lenta |
| Diseño con sistema | Improvisación visual |
| Transparente con trade-offs | Promesas grandilocuentes |
| Técnica con foco negocio | Técnica por postureo |
| End-to-End cuando aporta | "Todo vale" sin criterio |
| Premium sobria | Recargada u ostentosa |

---

## §5 — Voz y tono

### Por situación

| Situación | Tono | Claves |
|-----------|------|--------|
| Home/Servicios | Seguro y conciso | Beneficio → Prueba → CTA |
| Blog técnico | Didáctico y riguroso | Pasos, Snippets, Checklist |
| Reconstrucción WordPress | Consultivo | Cuándo Sí/No, riesgos, plan |
| Contacto | Cercano y eficiente | Preguntas mínimas, siguiente paso |
| Errores | Empático y útil | Qué pasó + qué hacer ahora |
| Legalidad/Privacidad | Formal y claro | Transparencia y control |

### Do / Don't

| Situación | Do | Don't |
|-----------|----|-------|
| Promesa | "Te propongo objetivos medibles y un plan priorizado" | "Te dejo la web perfecta en 48h" |
| Wordpress | "Si tu WP actúa como landing, quizás pagas un coste innecesario" | "WordPress es basura; hay que tirarlo" |
| Métricas | "Antes/después con explicación de trade-offs" | "Mira el numerito; confía" |
| Venta | "Tres packs comparables y cerrados por escrito" | "Depende, ya veremos sobre la marcha" |
| Errores | "No se pudo guardar. Reintenta o contacta" | "Error 500" |
| CTA | CTA contextual por defecto: "Solicitar auditoría gratuita" | CTAs genéricos sin contexto |

---

## §6 — Microcopy

### CTAs

- Solicitar auditoría gratuita
- Ver mi metodología de performance
- Evaluar reconstrucción (15 min)
- Cuéntame tu proyecto
- Ver resultados y métricas
- Descargar checklist de performance
- Ver packs de mejora
- Quiero una web más rápida
- Revisar mi WordPress
- Pedir presupuesto cerrado
- Ver casos (cuando existan)
- Abrir formulario de contacto
- Ver servicios
- Leer blog
- Suscribirme a novedades (si aplica)

### Mensajes de error

| Caso | Mensaje recomendado |
|------|---------------------|
| Formulario incompleto | Revisa los campos marcados. Hay información obligatoria pendiente. |
| Email inválido | Ese email no parece válido. Comprueba el formato e inténtalo de nuevo. |
| Error de red | No se pudo conectar. Revisa tu conexión y vuelve a intentarlo. |
| Timeout | La operación tardó más de lo esperado. Reintenta en unos segundos. |
| Guardar falló | No se pudo guardar. Reintenta o contacta si el problema continúa. |
| 404 | No encontramos esta página. Vuelve al inicio o usa el buscador del blog. |
| 403 | No tienes permiso para ver ese contenido. |
| 500 | Algo falló por nuestra parte. Ya lo estamos revisando. |
| Pago/Checkout | No se pudo completar el pago. Verifica los datos o prueba otro método. |
| Consentimiento Cookies | Necesitamos tu consentimiento para activar analítica. Puedes cambiarlo cuando quieras. |

### Placeholders

| Campo | Placeholder sugerido |
|-------|----------------------|
| Nombre | Tu nombre |
| Email | tu@email.com |
| URL de la web | https://tusitio.com |
| Objetivo | Ej.: más leads, más ventas, mejor SEO |
| Stack Actual | Ej.: WordPress, Wix, HTML, Shopify |
| Problema principal | Ej.: lenta, mala conversión, difícil de mantener |
| Plazo | Ej.: 2 semanas, 1 mes, flexible |
| Presupuesto orientativo | Ej.: 800–1500€ (si aplica) |

### Confirmaciones

| Caso | Texto recomendado |
|------|-------------------|
| Formulario enviado | Recibido. En breve te respondo con los siguientes pasos. |
| Auditoría solicitada | Perfecto. Revisaré tu web y te enviaré un Informe Base gratuito. |
| Informe completo comprado | Gracias. En 48/72h recibirás el Informe Completo y el plan priorizado. Incluye sesión de 30 min (presencial u online). |
| Suscripción | Listo. Te avisaré cuando publique algo relevante. |

### Empty States

| Caso | Texto recomendado |
|------|-------------------|
| Sin posts | Aún no hay publicaciones. Vuelve pronto: priorizo contenido práctico y medible. |
| Sin proyectos | Estoy preparando nuevos proyectos. Mientras tanto, revisa el blog o solicita auditoría. |
| Búsqueda sin resultados | No encontré coincidencias. Prueba con otra palabra o explora las etiquetas. |

---

## §7 — Guía SEO de estilo

| Elemento | Guía | Ejemplo |
|----------|------|---------|
| H1 | 1 por página. 50–70 caracteres aprox. | Reconstrucción performance-first para tu WordPress |
| H2 | Problema → Solución → Pasos → Resultados | Qué mejora una auditoría de rendimiento |
| Meta Title | ≈50–60 caracteres; keyword al inicio | Auditoría Web Gratuita: rendimiento y SEO |
| Meta Description | ≈145–160 caracteres; beneficio + CTA suave | Reviso tu web y te envío un informe base. Si compensa, 3 packs cerrados. |
| URLs | Cortas, sin stop-words, sin fechas si no aportan | /servicios/auditoria-rendimiento |
| Snippets | Listas y pasos para featured snippets | Checklist de 7 puntos |

---

## §8 — Sistema Visual

### Direcciones visuales

| Dirección | Descripción | Cuándo usar |
|-----------|-------------|-------------|
| Arquitectura sobria *(recomendada)* | Superficies oscuras, tipografía editorial, acentos Sand/Teal y geometría limpia | Home, servicios, portfolio; piezas principales |
| Editorial técnica | Más blanco/espacios, titulares grandes, diagramas y bloques de código | Posts largos, guías, recursos |
| Neutral funcional *(nuevo nombre, antes "Minimal cálido")* | Fondo gris-blanco neutro (#F0ECE4), Charcoal como tinta. Sin amarillo visible. | Light mode global, lectura, about, enfoque consultivo |

**Recomendación:**
- Arquitectura sobria como base global (dark mode).
- Editorial técnica para posts/recursos.
- Neutral funcional como modo claro: limpio, sin saturación de color de marca.
- **El light mode NO reproduce la identidad visual sand/teal en primer plano.** Su rol es legibilidad y accesibilidad de preferencia, no expresión de marca premium.

---

## §9 — Logo

### Versiones

- Stacked (isotipo + nombre + descriptor)
- Horizontal (isotipo a la izquierda, nombre a la derecha)
- Solo isotipo (uso en favicon, avatares, firmas compactas)
- Monocromo / Inverso

### Espaciado mínimo

Clear space mínimo: **3S** (S = grosor trazo del isotipo).

### Mínimos digitales

- Logo completo: 160px de ancho (ideal 200px+)
- Isotipo solo: 24px (ideal 32px+)

### Restricciones

- ❌ No estirar ni deformar.
- ❌ No aplicar efectos (sombras, glow, gradientes) al logo.
- ❌ No recolorear fuera de la paleta (excepción: monocromo/inverso).
- ❌ No reducir si el descriptor "WEB DESIGNER" pierde legibilidad.
- ✅ Mantener clear space mínimo 3S.

---

## §10 — Color *(Revisado en v2.0)*

> **Cambio v2.0:** La paleta Sand ha sido desaturada para reducir el efecto de saturación visual reportado. El fondo del light mode elimina el tono amarillo. Ver Changelog para detalle.

### Paleta completa

| Token | Nombre | Hex | Uso principal |
|-------|--------|-----|---------------|
| Charcoal 950 | Fondo profundo | `#1F2426` | Hero/Cover, fondos premium |
| Charcoal 900 | Fondo base | `#2F3437` | Dark mode bg principal |
| Charcoal 800 | Superficie | `#3A4246` | Cards, sections sobre dark |
| Charcoal 700 | Bordes | `#4B555B` | Bordes y separadores (no texto) |
| **Sand 700** | **Hover/outline** | **`#C9B07A`** | **Hover suave en Sand, outlines** *(era #E8D3A3)* |
| **Sand 500** | **Marca/CTA** | **`#E2CC96`** | **CTA primary, acentos de marca** *(era #FBE7B5)* |
| **Sand 100** | **Fondo Claro** | **`#F0ECE4`** | **Light mode bg — neutral cálido** *(era #FFF6E1)* |
| Teal 500 | Interacción | `#2DD4BF` | Links, focus ring, activos en dark |
| Teal 700 | Interacción light | `#0F766E` | Links/focus en tema claro |
| Success | Estado | `#22C55E` | Success UI |
| Warning | Estado | `#F59E0B` | Warning UI |
| Error | Estado | `#F87171` | Error UI |
| Info | Estado | `#38BDF8` | Info UI |

### Proporciones de uso recomendadas

**Charcoal 65–75% · Sand 10–20% · Teal 3–8% · Semánticos 2–5% (solo estado)**

> ⚠️ **Nota v2.0:** El porcentaje de Sand se reduce ligeramente (era 15–25%) para evitar saturación visual acumulada.

### Regla de contención de color *(nueva en v2.0)*

Máximo **2 colores de marca visibles simultáneamente** por sección o componente. Charcoal actúa como base neutral; Sand aparece en un elemento prominente (CTA, headline destacado o acento); Teal solo en estados interactivos (hover, focus, link activo). Nunca los tres en primera línea visual en la misma sección.

### Regla de Teal *(reforzada en v2.0)*

Teal es exclusivamente un color de **interacción y estado**. No usar como decoración, ilustración, ni fondo de sección. Su presencia debe estar siempre vinculada a un elemento accionable o a un estado de UI.

### Regla operativa de texto

El texto normal va en blanco (`#F9FAFB`) en dark mode. **Reservar Sand únicamente para elementos de marca y CTA.** Un párrafo de cuerpo en Sand 500 es incorrecto.

### Uso por contexto

| Uso | Token recomendado | Modo |
|-----|-------------------|------|
| Fondo página | Charcoal 900 | Dark |
| Fondo página | Sand 100 (`#F0ECE4`) | Light |
| Superficie (cards) | Charcoal 800 | Dark |
| Superficie (cards) | `#FFFFFF` | Light |
| Texto cuerpo | `#F9FAFB` | Dark |
| Texto cuerpo | Charcoal 900 | Light |
| CTA primary | Sand 500 (`#E2CC96`) | Ambos |
| Links / focus | Teal 500 | Dark |
| Links / focus | Teal 700 | Light |
| Bordes | Charcoal 700 | Dark |
| Bordes | `rgba(47,52,55,0.18)` | Light |

---

## §10.1 — Accesibilidad (contraste) *(Actualizado en v2.0)*

> Los ratios con Sand han sido recalculados para los nuevos valores. Los valores marcados con `~` son aproximados; verificar con herramienta de contraste (ej. Colour Contrast Analyser o WebAIM) al implementar.

| Combinación | Texto | Fondo | Ratio | WCAG |
|-------------|-------|-------|-------|------|
| Sand 500 / Charcoal 900 | `#E2CC96` | `#2F3437` | ~8.5:1 | **AAA** |
| Blanco / Charcoal 900 | `#F9FAFB` | `#2F3437` | 12.60:1 | **AAA** |
| Teal 500 / Charcoal 900 | `#2DD4BF` | `#2F3437` | 7.30:1 | **AAA** |
| Teal 700 / Sand 100 | `#0F766E` | `#F0ECE4` | ~6.8:1 | **AA** |
| Charcoal 900 / Sand 100 | `#2F3437` | `#F0ECE4` | ~11.2:1 | **AAA** |
| Charcoal 950 / Sand 500 | `#1F2426` | `#E2CC96` | ~9.5:1 | **AAA** |
| Charcoal 700 / Charcoal 900 | `#4B555B` | `#2F3437` | 1.65:1 | ❌ No texto |

**Nota:** Charcoal 700 y Sand 700 se usan para bordes/hover; no son aptos como texto.

---

## §11 — Tipografía

### Familias

- **Display:** Sora
- **Texto/UI:** Inter
- **Mono:** JetBrains Mono

### Escala tipográfica

| Token | Uso | Tamaño | Line-Height | Peso | Tracking |
|-------|-----|--------|-------------|------|----------|
| Display-1 | Hero H1 | 48px (3rem) | 56px | 600 | -1% |
| H1 | Título Página | 36px (2.25rem) | 44px | 600 | -0.5% |
| H2 | Sección | 28px (1.75rem) | 36px | 600 | -0.5% |
| H3 | Subsección | 22px (1.375rem) | 30px | 600 | 0% |
| H4 | Bloque | 18px (1.125rem) | 26px | 600 | 0% |
| Body | Texto | 16px (1rem) | 26px | 400 | 0% |
| Body-S | Secundario | 14px (0.875rem) | 22px | 400 | 0% |
| Caption | Notas/Labels | 12px (0.75rem) | 18px | 500 | 0.5% |
| Mono | Código | 14px (0.875rem) | 22px | 400 | 0% |

---

## §12 — Layout y Design System

### Breakpoints

| Nombre | Ancho | Uso |
|--------|-------|-----|
| XS | 0–639px | Móvil |
| SM | 640px | Móvil grande |
| MD | 768px | Tablet |
| LG | 1024px | Desktop |
| XL | 1280px | Desktop amplio |
| 2XL | 1536px | Pantallas grandes |

### Espaciado

| Token | px | Uso |
|-------|----|-----|
| space-1 | 4 | micro gaps, icon padding |
| space-2 | 8 | gaps pequeños |
| space-3 | 12 | chips, pills |
| space-4 | 16 | bloques base |
| space-5 | 24 | secciones compactas |
| space-6 | 32 | secciones |
| space-7 | 48 | hero/vertical rhythm |
| space-8 | 64 | separación fuerte |
| space-9 | 96 | bloques editoriales grandes |

### Componentes mínimos

| Componente | Variantes | Reglas clave |
|------------|-----------|--------------|
| Botón | Primary / Secondary / Tertiary | Primary: fondo Sand 500. Secondary: outline Sand 500. Tertiary: link Teal. Altura: 44px. Radius: 12–16px. Focus ring: Teal. |
| Input | Default / Error / Disabled | Label siempre visible. Borde sutil. Focus ring Teal. Error con texto + hint. |
| Card | Base / Clickable | Superficie Charcoal 800 (dark) / blanco (light). Clickable: hover elevación ligera + borde Teal. |
| Alert | Info / Success / Warning / Error | Icono + título + texto + acción opcional. Contraste alto. |
| Badge/Chip | Neutral / Accent / State | Texto corto. No usar como botón sin affordance. Padding 8–12px. |
| Navbar | Compact | CTA principal a la derecha. Toggle tema discreto. Foco visible. |
| Footer | Simple | Créditos. Enlaces legales. Firma estándar si aplica. |

---

## §13 — Iconografía

**Estilo:** Lineal, geométrico, sin rellenos. Grosor 1.75px (24px) y 1.5px (16px). Caps/joins round.  
**Respaldo si no existe icono propio:** Lucide.

| Icono | Uso |
|-------|-----|
| Home | Inicio |
| Blog | Publicaciones |
| Projects | Proyectos |
| Contact | Contacto |
| Services | Servicios |
| Speedometer | Performance |
| Chart | Métricas |
| Shield | Seguridad |
| Search | SEO / Buscar |
| Link | Enlace externo |
| Code | Código |
| Git branch | Flujo / Deploy |
| Cloud / Deploy | Infra / Hosting |
| Settings | Preferencias |
| File/Text | Post |
| Checklist | Checklist / Auditoría |
| Info | Info UI |
| Success | Estado success |
| Warning | Estado warning |
| Error | Estado error |

---

## §14 — Oferta comercial

**Auditoría gratuita** (sin compromiso).

**Informe Base:** gratis (sin receta completa). Plazo publicitado: 48–72h.

**Informe Completo:** 149€ (precio fijo), descontable si se contrata un pack. Incluye sesión de 30 min (presencial u online).

**Tres packs cerrados por caso:**

| Pack | Objetivo | Incluye técnicamente | Ideal para |
|------|----------|----------------------|------------|
| **Corrección** | MVP técnico. Quitar lo doloroso. | Quick wins: imágenes críticas, scripts bloqueantes, CLS evidente, caché básica | Presupuesto ajustado. Necesidad inmediata. |
| **Optimización** *(más popular)* | Lo necesario. Equilibrio coste/beneficio. | Todo lo anterior + estrategia de carga (fonts/critical), revisión INP, refactor secciones críticas, third-parties con criterio | La mayoría de webs que quieren resultados sólidos |
| **Excelencia** | Máximo nivel. Calidad por encima de ROI inmediato. | Todo lo anterior + cambios profundos/arquitectura, design system completo, automatización y observabilidad, performance budget | Negocios que priorizan "lo mejor" y escalabilidad |

---

## §15 — Imagen y fotografía

- Fotografía editorial, real, técnica y sin clichés.
- Detalles (pantallas, diagramas, escritorio), espacio negativo.
- Evitar stock genérico y renders falsos.

---

## §16 — Motion

- Microinteracciones: 150–200ms. Modales: 250–350ms.
- Respetar `prefers-reduced-motion`.
- Animación como feedback, no decoración.

---

## §17 — Accesibilidad y calidad

- Contraste alto por defecto (ver §10.1).
- Focus visible en todos los elementos interactivos (focus ring Teal).
- Targets mínimos 44×44px.
- Formularios con labels visibles y errores accionables.
- Consistencia: tokens, componentes y estados completos.

---

## §18 — Tokens de implementación *(Actualizados en v2.0)*

### CSS

```css
:root {
  /* Charcoal — sin cambios */
  --color-charcoal-950: #1F2426;
  --color-charcoal-900: #2F3437;
  --color-charcoal-800: #3A4246;
  --color-charcoal-700: #4B555B;

  /* Sand — desaturado en v2.0 */
  --color-sand-700:    #C9B07A;   /* era #E8D3A3 */
  --color-sand-500:    #E2CC96;   /* era #FBE7B5 */
  --color-sand-100:    #F0ECE4;   /* era #FFF6E1 */

  /* Teal — sin cambios */
  --color-teal-700:    #0F766E;
  --color-teal-500:    #2DD4BF;

  /* Estado — sin cambios */
  --color-info-400:    #38BDF8;
  --color-success-500: #22C55E;
  --color-warning-500: #F59E0B;
  --color-error-400:   #F87171;

  /* Tipografía */
  --font-display: "Sora", ui-sans-serif, system-ui, -apple-system,
                  "Segoe UI", Roboto, Arial, "Noto Sans",
                  "Liberation Sans", sans-serif;
  --font-sans:    "Inter", ui-sans-serif, system-ui, -apple-system,
                  "Segoe UI", Roboto, Arial, "Noto Sans",
                  "Liberation Sans", sans-serif;
  --font-mono:    "JetBrains Mono", ui-monospace, SFMono-Regular,
                  Menlo, Monaco, Consolas, "Liberation Mono",
                  "Courier New", monospace;

  /* Espaciado */
  --space-1: 4px;  --space-2: 8px;   --space-3: 12px;
  --space-4: 16px; --space-5: 24px;  --space-6: 32px;
  --space-7: 48px; --space-8: 64px;  --space-9: 96px;

  /* Radio y sombras */
  --radius-1:    12px;
  --radius-2:    16px;
  --radius-pill: 999px;
  --shadow-1:    0 1px 2px rgba(0, 0, 0, 0.25);
  --shadow-2:    0 8px 24px rgba(0, 0, 0, 0.35);

  /* Layout */
  --container-max: 1200px;
  --measure:       68ch;
}

/* Dark — Principal (sin cambios en v2.0) */
[data-theme="dark"] {
  --color-bg:          var(--color-charcoal-900);
  --color-surface:     var(--color-charcoal-800);
  --color-border:      var(--color-charcoal-700);
  --color-text:        #F9FAFB;
  --color-text-strong: #F9FAFB;
  --color-text-muted:  rgba(249, 250, 251, 0.78);
  --color-link:        var(--color-teal-500);
  --color-focus:       var(--color-teal-500);
}

/* Light — Neutral funcional (rediseñado en v2.0) */
[data-theme="light"] {
  --color-bg:          var(--color-sand-100);  /* #F0ECE4 — neutro cálido, no amarillo */
  --color-surface:     #FFFFFF;
  --color-border:      rgba(47, 52, 55, 0.18);
  --color-text:        var(--color-charcoal-900);
  --color-text-strong: #0B0D0E;
  --color-text-muted:  rgba(47, 52, 55, 0.72);
  --color-link:        var(--color-teal-700);
  --color-focus:       var(--color-teal-700);
}
```

### JSON

```json
{
  "brand": {
    "charcoal": "#2F3437",
    "sand":     "#E2CC96",
    "accent":   "#2DD4BF"
  },
  "palette": {
    "charcoal": {
      "950": "#1F2426",
      "900": "#2F3437",
      "800": "#3A4246",
      "700": "#4B555B"
    },
    "sand": {
      "700": "#C9B07A",
      "500": "#E2CC96",
      "100": "#F0ECE4"
    },
    "teal": {
      "500": "#2DD4BF",
      "700": "#0F766E"
    }
  },
  "themes": {
    "dark": {
      "bg":      "#2F3437",
      "surface": "#3A4246",
      "text":    "#F9FAFB",
      "link":    "#2DD4BF"
    },
    "light": {
      "bg":      "#F0ECE4",
      "surface": "#FFFFFF",
      "text":    "#2F3437",
      "link":    "#0F766E"
    }
  },
  "state": {
    "success": "#22C55E",
    "warning": "#F59E0B",
    "error":   "#F87171",
    "info":    "#38BDF8"
  },
  "offer": {
    "audit": {
      "free":                    true,
      "baseReportFree":          true,
      "fullReportDiscountable":  true
    },
    "packs": ["Correccion", "Optimizacion", "Excelencia"]
  }
}
```

---

## §19 — Firma desde proyectos

| Formato | Copy | Dónde | Reglas |
|---------|------|-------|--------|
| Texto simple *(95% de los casos)* | Hecho por Adrián Mariscal | Footer, About, Créditos | 12–14px. Opacidad 70–80%. Sin robar protagonismo. |
| Badge discreto | Isotipo + "by Adrián Mariscal" | Créditos, pantallas de info | Borde sutil. Radius pill. Sin usar la paleta del proyecto si rompe la suya. |

---

## §13-bis — Registro de cambios aplicados

### Modificaciones realizadas

| Qué cambió | Por qué | Feedback | Secciones propagadas |
|------------|---------|----------|----------------------|
| Sand 500: `#FBE7B5` → `#E2CC96` | Reduce saturación visual percibida como "demasiado amarillo" | F1, F2, F6 | §10 Color, §10.1 Contraste, §18 CSS tokens, §18 JSON tokens, §12 Componentes (botón primary) |
| Sand 700: `#E8D3A3` → `#C9B07A` | Ajuste proporcional de la escala; el hover/outline más neutro reduce la mezcla "marrón" con fondos Charcoal | F1, F5 | §10 Color, §18 CSS tokens, §18 JSON |
| Sand 100: `#FFF6E1` → `#F0ECE4` | Elimina el fuerte tono amarillo del light mode, que fue el punto de crítica más consistente | F2, F3, F6 | §10 Color, §18 CSS light theme, §10.1 contraste light |
| Light mode bg renombrado de "Minimal cálido" a "Neutral funcional" | Refleja el rol correcto: accesibilidad/preferencia, no expresión de marca | F2, F3 | §8 Direcciones visuales, §18 CSS comentarios |
| Nueva regla de contención de color (máx. 2 marca por sección) | Responde al feedback de incoherencia visual y sobrecarga cromática | F4 | §10 Color (nueva subsección) |
| Regla Teal reforzada (solo interacción, nunca decorativa) | Evita la mezcla teal+charcoal que Anabel percibió como "azul extraño" incoherente | F5 | §10 Color, §12 Componentes |
| Proporción Sand reducida: 15–25% → 10–20% | Coherente con desaturación: menos cantidad + menos saturación = efecto calibrado | F1, F4 | §10 uso recomendado |
| Tabla de contraste actualizada con nuevos valores Sand | Obligatorio por cambio de paleta | F1 | §10.1 Accesibilidad |

### Lo que NO cambió (y por qué se preservó)

| Sección | Justificación |
|---------|---------------|
| Paleta Charcoal (950, 900, 800, 700) | No señalada en ningún feedback. La base oscura es la fortaleza del sistema. |
| Teal 500 y 700 (hex) | El color en sí es correcto; el problema era su uso. Se resuelve con reglas, no cambiando el token. |
| Logo e isotipo | Sin feedback sobre el logo. No tocar. |
| Tipografía (Sora, Inter, JetBrains Mono) y escala | No señalada. Todos los revisores consideran "tipografía e información bien balanceadas" (Jordao). |
| Posicionamiento y personalidad de marca | F7 resuelto con cambios visuales; la identidad central es sólida. |
| Voz, tono, microcopy | No señalados en feedback. |
| Oferta comercial y packs | No señalados en feedback. |
| Layout, breakpoints, espaciado | No señalados en feedback. |
| Motion y fotografía | No señalados en feedback. |
| Firma desde proyectos | No señalada en feedback. |
| Guía SEO | No señalada en feedback. |
| Iconografía | No señalada en feedback. |

### Supuestos asumidos durante la edición

1. Los revisores evalúan la web producción (adrianmariscal.es) tal como está desplegada con v1.6, no mockups.
2. "Satura" y "muy amarilla" se refieren al Sand 500 (#FBE7B5) y Sand 100 (#FFF6E1), no a Teal.
3. La divergencia Anabel ("amateur") vs. Jordao+Adoración ("premium") se atribuye al light mode y la mezcla de colores simultánea, no a la dirección creativa dark.
4. Los nuevos valores Sand mantienen suficiente contraste AAA sobre Charcoal 900 (~8.5:1 estimado). **Verificar con herramienta antes de implementar.**
5. No se han regenerado SVGs de logo porque el feedback no los señala.

---

## §14 — Preguntas abiertas *(actualizadas)*

1. **Validación de nuevos Sand:** Confirmar que `#E2CC96` en CTA y `#F0ECE4` en light mode resuelven la percepción de saturación en condiciones reales de pantalla (pedir una nueva ronda de feedback rápida, 2–3 personas).

2. **Escalado potencial a Nivel 3:** Si tras aplicar la nueva paleta Sand el light mode sigue siendo percibido como "poco profesional" por más del 50% de revisores, valorar rediseño completo del light mode con base gris neutro (#F4F4F2 o similar) en lugar de cálido. Esto invalidaría la coherencia Charcoal-Sand y requeriría una guía de tema claro independiente (Nivel 3).

3. **Conflicto F7 no resuelto:** Anabel tiene una percepción de "amateur" que puede no resolverse solo con la paleta. Si persiste, explorar: aumentar densidad de información en hero (más context, no solo métricas), ampliar descripciones numéricas ("10+ años con Salesforce" → añadir 1 frase de contexto), revisar jerarquía visual del fold inicial.

4. **Formato exacto de "Antes/Después"** (heredado de v1.6): capturas + tabla de métricas, cuánto contexto narrativo incluir.

5. **Primer tipo de prueba social:** auditorías reales con permiso (definir plantilla de anonimación y consentimiento).

6. **Nivel de detalle end-to-end** (Astro + Node) en servicios: visible pero no protagonista.

7. **Toggle de tema:** ubicación preferente "pegado a la derecha" en navbar, antes del CTA principal; con label accesible y persistente.

8. **Política de precio/estructura del mantenimiento mensual** cuando se active.

---

*Guía de Imagen de Marca · Adrián Mariscal · Web Designer · v2.0 · 22/02/2026*
