# Plantilla de Testimonio — Consentimiento y anonimización

Guía para obtener y publicar testimonios de auditorías reales con permiso, según guía de marca §14 Q5 (primer tipo de prueba social).

---

## Objetivo

Incorporar prueba social verificable (auditorías reales con consentimiento) manteniendo privacidad y cumplimiento. El componente `Testimonial.astro` y los datos en `src/lib/testimonials.ts` están preparados para mostrar nombre/iniciales, empresa/sector, texto y resultado cuantificado.

---

## Proceso de obtención de consentimiento

1. **Antes de publicar ningún testimonio**
   - Obtener consentimiento explícito por escrito (email o documento firmado) para:
     - Publicar el testimonio en la web del portfolio.
     - Usar nombre completo, iniciales o anonimización acordada.
     - Incluir empresa/sector (o mantener genérico si se prefiere).
     - Incluir resultado cuantificado si aplica (métricas, plazos).
   - Conservar el consentimiento en archivo (copia local o carpeta privada), sin subirlo al repositorio.

2. **Opciones de anonimización**
   - **Nombre completo** — solo con consentimiento explícito.
   - **Iniciales** (ej. "M.G.", "Juan P.") — recomendado si el cliente prefiere discreción.
   - **Genérico** (ej. "Cliente del sector retail") — máximo anonimato; útil para primeros casos.

3. **Empresa/sector**
   - Acordar con el cliente: nombre de empresa, sector genérico ("E-commerce", "Startup B2B") o "Sector [X]" sin nombre.

4. **Resultado cuantificado**
   - Solo incluir métricas o plazos si el cliente lo autoriza y los datos no son confidenciales (ej. "LCP de 4.2s a 1.1s", "Informe base en 48h").

---

## Cómo añadir un testimonio real

1. Abre `src/lib/testimonials.ts`.
2. Añade un objeto al array `testimonials` con:
   - `nameOrInitials`: nombre o iniciales acordados.
   - `companyOrSector`: empresa o sector acordado.
   - `text`: texto del testimonio (puede ser editado por el cliente).
   - `result`: opcional; resultado cuantificado si aplica.
   - `draft: false` — **solo cuando tengas consentimiento guardado**. Mientras tanto usa `draft: true` para que no se publique en producción.

3. En producción, la sección de testimonios **solo se muestra si hay al menos un testimonio con `draft !== true`**. Si todos son `draft: true`, la sección no aparece.

---

## Checklist antes de publicar

- [ ] Consentimiento explícito guardado (email/documento).
- [ ] Acordado nivel de anonimización (nombre/iniciales/genérico).
- [ ] Acordado mención de empresa/sector.
- [ ] Texto y resultado cuantificado aprobados por el cliente.
- [ ] `draft: false` en el testimonio en `testimonials.ts`.

---

*Guía de testimonios · Portfolio · v4 · refs #594*
