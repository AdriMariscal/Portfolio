# Checklist operativa (rápida)

Lista corta para validar entregas sin bloquear el flujo. Úsala antes de mergear a `staging` o `main`.

## 1) Marca y UX
- [ ] El modo oscuro es el default y respeta la paleta Charcoal/Sand/Teal.
- [ ] Tipografías Sora (display) e Inter (texto/UI) aplicadas en las áreas relevantes.
- [ ] Copy alineado con el posicionamiento “Web Performance + end‑to‑end”.

## 2) RUM y rendimiento
- [ ] El script `rum-core-web-vitals.ts` sigue activo en `BaseLayout`.
- [ ] El panel `/metrics/rum` muestra datos cuando hay consentimiento.
- [ ] Si hay endpoint propio, `PUBLIC_RUM_ENDPOINT` está configurado en Netlify.

## 3) Calidad (CI/local)
- [ ] `pnpm run lint`
- [ ] `pnpm run typecheck`
- [ ] `pnpm run test:unit`
- [ ] `pnpm run test:e2e`

## 4) Netlify
- [ ] `netlify.toml` aplicado (headers, redirects, Lighthouse plugin).
- [ ] Contexto `staging` con `STAGING_USER` y `STAGING_PASS`.

## 5) Contenido
- [ ] Metadata (title/description) revisadas.
- [ ] Links internos y externos verificados.
