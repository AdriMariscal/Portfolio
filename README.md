# Portfolio – Astro + Netlify

Portfolio personal orientado a rendimiento web, SEO y UX. Este repo contiene el sitio, el blog técnico y la infraestructura de despliegue en Netlify.

## Arquitectura (alto nivel)

- **Astro como framework principal**: páginas y rutas en `src/pages`, layouts en `src/layouts` y componentes UI en `src/components`.
- **Contenido por colecciones**: posts y proyectos viven en `src/content`, facilitando el flujo editorial sin CMS externo.
- **Estilos y tokens**: CSS global en `src/styles/global.css` y assets en `public/` para mantener el diseño consistente.
- **RUM (Real User Monitoring)**: script de Core Web Vitals en `src/scripts/rum-core-web-vitals.ts`, cargado desde `BaseLayout` y con envío opcional a `/.netlify/functions/rum-collect`.
- **Netlify Functions/Edge**: funciones en `netlify/functions` y edge functions en `netlify/edge-functions` para formularios, RUM y auth de staging.

## Guía de marca

- **Documento principal**: ver la guía de imagen en `docs/GUÍA DE IMÁGEN DE MARCA.pdf` (paleta Charcoal/Sand/Teal, tipografías Sora/Inter, modo oscuro como identidad principal).
- **Resumen ejecutivo del MVP**: `docs/MVP 3.pdf`.

> Referencias clave: la guía define colores núcleo, tipografías y el tema oscuro como modo por defecto. Usa este documento antes de tocar UI, copy o assets.

## Flujo de ramas (dev → staging → main)

1. **Trabajo diario**: ramas feature/hotfix desde `dev`.
2. **Integración**: PR hacia `dev` (CI completo: lint, typecheck, unit, e2e, Lighthouse).
3. **Pre‑producción**: merge de `dev` a `staging` para validar entorno y credenciales de staging (`STAGING_USER`, `STAGING_PASS`).
4. **Producción**: merge de `staging` a `main`.

## Despliegue en Netlify

1. Conecta el repo en Netlify y selecciona rama `main` como producción.
2. Configura el build:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node**: 20 (alineado con CI)
3. Define variables de entorno:
   - `PUBLIC_RUM_ENDPOINT` (opcional, si quieres enviar métricas a un endpoint propio).
   - `STAGING_USER` / `STAGING_PASS` en el contexto `staging`.
4. Verifica que `netlify.toml` se esté aplicando (headers, redirects y plugin de Lighthouse).

## Tests y verificación local

> Gestor recomendado: **pnpm** (hay `pnpm-lock.yaml`).

- Instalar dependencias: `pnpm install --no-frozen-lockfile`
- Lint: `pnpm run lint`
- Typecheck: `pnpm run typecheck`
- Unit tests: `pnpm run test:unit`
- Coverage: `pnpm run test:unit:coverage`
- E2E (Playwright): `pnpm run test:e2e`

## Contribuir

1. Crea una rama desde `dev`: `feature/<tema>` o `fix/<tema>`.
2. Mantén cambios mínimos y enfocados; evita refactors grandes sin necesidad.
3. Asegura que los tests relevantes pasen antes del PR.
4. Abre PR hacia `dev` con contexto claro y link a la issue.

## Versionado (SemVer)

- Se usa **SemVer** con scripts dedicados:
  - `pnpm run bump:major`
  - `pnpm run bump:minor`
  - `pnpm run bump:patch`
- **Regla interna**:
  - Minor al empezar una issue nueva.
  - Patch solo para rondas de ajustes posteriores en la misma issue.

## Recursos

- **Guía de imagen**: `docs/GUÍA DE IMÁGEN DE MARCA.pdf`
- **Checklist operativa**: `docs/checklist.md`
- **Resumen MVP**: `docs/MVP 3.pdf`
