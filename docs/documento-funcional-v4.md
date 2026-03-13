# Portfolio · vNext Major (v4.0.0): Documento Funcional

> **AUDIT_DATE:** 2026-02-22 · **Versión en prod:** 3.55.7 · **URL:** https://adrianmariscal.es  
> **Conectores usados:** Netlify MCP ✅ · Sentry MCP ⚠️ disponible pero **no aplica a Portfolio** (la org `adrian-mariscal-cantudo` solo tiene el proyecto Utilibox; Portfolio no está instrumentado con Sentry) · GitHub repo: público, visible en github.com/AdriMariscal/Portfolio, pero los sub-paths y archivos raw no son accesibles vía fetch por restricciones del sistema → se usan la home page, ficha de proyecto y guía de marca como fuentes primarias.  
> **docs/funcional.md:** en repo (carpeta `/docs` visible), no recuperable via fetch automático.  
> **Páginas de producción inspeccionadas:** `/` (Home) ✅ · `/projects/portfolio` ✅ · Resto (/about, /services, /contact, /blog, posts individuales) → No accesibles via fetch. Evidencia visual limitada a las dos páginas anteriores.  
> **docs/guia-de-marca.md:** leído (adjunto brand-guide-v2_0.md, v2.0, fecha 2026-02-22).

---

## 1. Descripción general del producto

**Portfolio** es el sitio web personal y profesional de Adrián Mariscal, Web Designer con enfoque performance-first. Es simultáneamente carta de presentación, canal editorial y herramienta de captación de clientes.

**Para quién:** Pymes con presencia digital que quieren webs más rápidas y medibles; equipos técnicos que buscan un especialista end-to-end; emprendedores que evalúan si su WordPress tiene sentido como tecnología.

**Qué problema resuelve:** La mayoría de webs de freelance diseño web son genéricas y no demuestran técnicamente lo que prometen. Portfolio demuestra performance-first al serlo: Lighthouse 99/100, métricas RUM en tiempo real, proceso documentado, packs de precio cerrado.

**Promesa de marca:** Webs rápidas, mantenibles y medibles. Proceso claro. Decisiones justificadas.

---

## 2. Estado actual (versión en producción)

Versión 3.55.7, desplegada el 2026-02-22 (hoy, merge staging→main vía GitHub Actions, build time 29s). Verificado vía Netlify MCP (deploy `699adbfcba6f8100082a43bd`, estado `ready`).

**Páginas y secciones existentes:**
- Home con hero, estadísticas (10+ años Salesforce / 3 proyectos / 98/100 Lighthouse), proyectos destacados y últimos artículos.
- /about — Trayectoria profesional.
- /services — Servicios (contenido pendiente de verificar en detalle; página existe per ficha y navegación).
- /projects — Listado de proyectos propios (Cartas Rápidas, Portfolio, Utilibox).
- /projects/[slug] — Ficha detallada por proyecto.
- /blog — Blog técnico con 25+ artículos MDX paginados, etiquetas y listado por tags.
- /search — Buscador instantáneo que indexa posts, proyectos y páginas.
- /contact — Formulario de contacto (name, email, message) con honeypot + reCAPTCHA, servido vía Netlify Functions. 6 envíos totales desde oct 2025; último: 21 nov 2025.
- /metrics/rum — Panel Real User Monitoring (Core Web Vitals).
- Páginas legales: /legal/aviso-legal, /legal/privacidad, /legal/cookies, /legal/terminos.

**Stack verificado:** Astro 5 · TypeScript · Tailwind CSS 4 · MDX · Netlify (Functions × 3: `contact`, `rum-collect`, `rum-metrics`; 1 Edge Function para login staging) · GitHub Actions CI (lint, typecheck, Playwright, Lighthouse CI) · Decap CMS (configurado en staging). Fuente: ficha de proyecto en producción + Netlify MCP.

**Lighthouse (via Netlify plugin, deploy hoy):** Performance 99 · Accessibility 99 · Best Practices 100 · SEO 100 · **PWA 70** (único gap). Fuente: Netlify MCP deploy `699adbfcba6f8100082a43bd`.

**Sentry:** No aplica a Portfolio. La organización `adrian-mariscal-cantudo` existe pero solo instrumenta el proyecto Utilibox. Portfolio no tiene monitorización Sentry activa.

**Páginas inspeccionadas visualmente (HTML):** Home `/` y ficha de proyecto `/projects/portfolio`. El resto de páginas (/about, /services, /contact, /blog, posts) no fueron accesibles vía fetch automatizado; sus observaciones en este documento provienen de inferencias a partir de la ficha de proyecto y el HTML del home.

**Identidad de marca en producción:** Dark mode por defecto ✅. Toggle "Oscuro" visible en navbar ✅. Paleta visible, tipografía consistente. Sin embargo, los tokens CSS/JSON de color corresponden a la guía v1.6 (Sand 500: #FBE7B5, Sand 100: #FFF6E1), **no a la v2.0** recién aprobada (Sand 500: #E2CC96, Sand 100: #F0ECE4). Logo en formato PNG en navbar (`/logos/logo_cuadrado_transparente.png`), no SVG. Contact form sin campos de cualificación de lead.

---

## 3. Alcance de vNext Major (v4.0.0)

Esta iteración justifica una **MAJOR** por cinco razones estructurales que cambian simultáneamente la identidad visual, el flujo editorial, la arquitectura comercial visible y las capacidades del producto:

1. **Brand system v2.0 end-to-end:** Implementación completa de los nuevos tokens Sand (desaturados), regla de contención de color (máx. 2 colores de marca por sección) y restricción de Teal (solo interacción). El light mode se reformula como "Neutral funcional". Esto afecta cada componente del design system.

2. **CMS editorial simplificado:** Decap CMS pasa de flujo complejo con staging-only a modo simple publicación → main → auto-deploy Netlify. Cambia la arquitectura de gestión de contenido, eliminando fricción para el único desarrollador-autor.

3. **Arquitectura comercial visible:** La página /services se rediseña para mostrar los tres packs cerrados (Corrección / Optimización / Excelencia) con precios y CTAs comparables. Pasa de ser informativa a ser una página de conversión real.

4. **Embudo de captación rediseñado:** El formulario de contacto incorpora campos de cualificación de lead (URL, stack actual, objetivo, plazo, presupuesto orientativo), alineándose con los placeholders definidos en la guía de marca §6. Aumenta la calidad de los contactos entrantes.

5. **PWA con soporte offline:** El sitio pasa de score PWA 70 a ser una Progressive Web App instalable con caché offline, alcanzando el umbral PWA 85+. Cambio técnico estructural (Service Worker + Workbox).

---

## 4. Funcionalidades existentes (mejoradas o mantenidas)

**Blog técnico (mejorada):** Sigue siendo el eje editorial principal (70% contenido técnico). En vNext se añade tabla de contenidos auto-generada para posts largos (>2000 palabras) y suscripción a newsletter GDPR-compliant. Se mantiene la paginación, etiquetas, buscador y generación de posts MDX.

**Buscador /search (mantenida):** Sin cambios estructurales. Se revisa en el contexto del brand update.

**Proyectos /projects (mejorada):** Las fichas de proyecto incorporan una sección estandarizada "Antes/Después" con tabla de métricas y capturas. Diferenciador clave frente a competidores que no muestran resultados cuantificados.

**RUM panel /metrics/rum (mantenida):** Sin cambios funcionales. La recogida de datos vía `rum-collect` y `rum-metrics` continúa.

**Formulario de contacto (mejorada):** Se amplía con campos de cualificación (ver §3). Microcopy actualizado según guía §6.

**Legal y cookies (mantenida):** Todas las páginas legales y el banner de consentimiento granular (analítica + marketing) permanecen. Sin cambios pendientes detectados.

**CI/CD y DevOps (mejorada):** Se incorpora un paso de auditoría de accesibilidad automatizada (axe-playwright) en GitHub Actions y se eleva el umbral Lighthouse PWA de 70 a 85.

---

## 5. Nuevas funcionalidades

**Social proof / Testimonios:** Primera sección de prueba social estructurada en home o /services. Al ser un portfolio en fase temprana de captación (6 contactos en 4 meses), la ausencia de prueba social es la principal barrera de conversión detectada en el análisis competitivo. Incluye placeholder tipificado y estructura para la primera auditoría real anonimizada (con consentimiento del cliente).

**Landing page /auditoria-web:** Página dedicada optimizada para la query "auditoría web rendimiento", con estructura H1→H2→CTA alineada a la guía SEO §7. El dominio adrianmariscal.es no aparece en el top-100 para queries competitivas (Escenario B). Esta landing es el primer activo de SEO transaccional fuera del blog.

**Newsletter de blog:** Subscripción a novedades vía proveedor GDPR-compliant (Buttondown o Brevo), con doble opt-in. Activa la línea editorial de captación diferida que la guía de marca contempla ("Suscribirme a novedades" en §6 CTAs).

**OG images automáticas por página:** Generación de imágenes Open Graph específicas para cada post, proyecto y página clave mediante Astro + Sharp/satori. Mejora el CTR en redes sociales y la percepción de marca al compartir.

**PWA offline:** Capacidad de instalación como aplicación y carga sin conexión para el contenido ya visitado. Cubre el roadmap explícito en la ficha de proyecto y eleva el score PWA de 70 a 85+.

---

## 6. Identidad de marca en esta versión

### BrandFitScore actual: 65 / 100 · Gap: 35%

**Evaluación evidenciada (producción vs guía v2.0):**

| Aspecto | Estado | Gap |
|---------|--------|-----|
| Dark mode como principal | ✅ Correcto | — |
| Toggle tema en navbar | ✅ Visible | — |
| Tipografía Sora/Inter/JetBrains | ✅ En stack | — |
| Legal + cookies granulares | ✅ Completo | — |
| Sand 500 token | ❌ #FBE7B5 (v1.6) → debe ser #E2CC96 (v2.0) | **Mayor** |
| Sand 100 light mode | ❌ #FFF6E1 (v1.6) → debe ser #F0ECE4 (v2.0) | **Mayor** |
| Sand 700 token | ❌ #E8D3A3 (v1.6) → debe ser #C9B07A (v2.0) | **Mayor** |
| Light mode "Neutral funcional" | ❌ Aún con base amarilla v1.6 | **Mayor** |
| Regla contención de color (máx. 2) | ❌ Nueva regla v2.0, no implementada | **Mayor** |
| Teal exclusivo en interacción | ⚠️ Pendiente de verificación (repo privado) | Medio |
| Logo en SVG (navbar/footer) | ❌ PNG en navbar | Medio |
| CTA microcopy §6 | ⚠️ "Ver metodología de performance" vs "Ver **mi** metodología de performance" | Menor |
| Botones 44px / radius 12-16px | ⚠️ UI Kit existente; pendiente verificar tokens exactos | Menor |
| Contact form cualificación lead | ❌ Solo name/email/message; faltan URL/stack/objetivo | **Mayor** |
| Salesforce en hero (prominencia) | ⚠️ "10+ Años con Salesforce" como stat de hero; guía: selectivo sin protagonismo | Menor |

**Qué se corrige en vNext:** Los tres tokens Sand (CSS + JSON), el light mode completo, la regla de contención, el logo SVG, el formulario de contacto y el microcopy de CTA. Teal se auditará y corregirá si se detecta uso decorativo.

**Cómo quedará la marca en vNext:** Sistema visual coherente con la guía v2.0. Light mode neutral y profesional (elimina la percepción "amateur/saturada" del feedback). Dark mode premium inalterado. Todos los componentes dentro de la regla de contención. El sitio estará en BrandFitScore estimado ≥ 90.

**Proporción de tareas [BRAND] en MVP:** 9 tareas / 30 total = 30%. Gap de 35% → umbral recomendado 30-60%. ✅ Dentro de rango.

---

## 7. Fuera de alcance (Backlog posterior)

Se excluyen explícitamente del MVP las siguientes funcionalidades, por exceder el scope de un ciclo ejecutable o no tener evidencia de urgencia:

- **Multilingüe ES/EN:** Requiere arquitectura i18n de Astro y traducción de contenido. Sin evidencia de demanda. Alto coste.
- **Portal de cliente / Auth0:** Mencionado en variables de entorno legacy (SECRETS_SCAN_OMIT_KEYS). Sin caso de uso definido actualmente.
- **Precio/estructura de mantenimiento mensual:** La guía lo tiene como pregunta abierta (§14 punto 8). No urgente hasta consolidar primeros clientes recurrentes.
- **Comentarios en blog:** Sin masa crítica de tráfico que lo justifique. Riesgo de spam > valor.
- **Video/podcast:** Requiere infraestructura adicional y cambio de línea editorial. Post-MVP.
- **Dashboard FinOps avanzado:** Roadmap de ficha, sin datos de coste reales disponibles aún.
- **Sección Salesforce dedicada:** La guía marca Salesforce como capacidad secundaria selectiva. Destacarlo en sección propia contradice ese principio.
- **RSS feed:** Baja prioridad; newsletters cubren distribución.
- **Filtros avanzados de búsqueda:** El buscador actual cubre el caso de uso básico. Optimización post-MVP.
- **Print stylesheet para blog:** Valor muy bajo para el perfil de audiencia (técnico-digital).
