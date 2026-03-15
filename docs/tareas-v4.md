# Portfolio · vNext Major (v4.0.0): Backlog de Tareas

> **AUDIT_DATE:** 2026-02-22 · Primera tarea: 2026-02-23 · Planificación: 8h/día, días laborables (lun-vie).  
> **Conectores consultados:** Netlify MCP ✅ · Sentry MCP ⚠️ no aplica (solo monitoriza Utilibox, no Portfolio) · GitHub repo: público, sub-paths no accesibles via fetch.  
> **Páginas inspeccionadas:** Home `/` ✅ + `/projects/portfolio` ✅. Las páginas /about, /services, /contact y /blog se infieren de la ficha de proyecto; las tareas que las afectan se marcan con evidencia indicando el origen.

---

## Totales

- **Total tareas MVP:** 30
- **Total horas MVP:** 160h
- **Reparto:** Marca [BRAND] 37h · Mejoras [SEO+PERF+A11Y+DX+NETLIFY] 49h · Nuevas funcionalidades [FEAT] 74h
- **Duración estimada:** ~4 semanas (2026-02-23 → 2026-03-20)

---

## vNext Major (MVP)

---

### T-001 — [BRAND] Actualizar tokens CSS y JSON de color a guía de marca v2.0

- Descripción: La guía de marca v2.0 (2026-02-22) desatura la paleta Sand con respecto a v1.6. Los tokens actuales en producción todavía usan los valores v1.6 (`#FBE7B5`, `#FFF6E1`, `#E8D3A3`). Hay que actualizarlos en el archivo CSS de tokens y en el JSON de design tokens del repositorio.

  **Valores que cambian:**
  - `--color-sand-500`: `#FBE7B5` → `#E2CC96`
  - `--color-sand-700`: `#E8D3A3` → `#C9B07A`
  - `--color-sand-100`: `#FFF6E1` → `#F0ECE4`

  **Pasos:**
  1. Localizar el archivo CSS de tokens (probablemente `src/styles/tokens.css` o equivalente en Tailwind config).
  2. Actualizar los tres valores hex.
  3. Localizar el archivo JSON de tokens (si existe `src/tokens.json` o similar).
  4. Actualizar los tres valores hex en JSON.
  5. Actualizar también cualquier referencia directa en Tailwind config (`tailwind.config.*`) si los tokens están ahí.

  **Criterio de aceptación:** `grep -r "FBE7B5\|FFF6E1\|E8D3A3" src/` devuelve 0 resultados. Build sin errores. Visual review en dark + light mode.

  **Evidencia:** guia-de-marca v2.0 §10 + §18 CSS tokens; §13-bis changelog (Sand 500: #FBE7B5→#E2CC96, Sand 700: #E8D3A3→#C9B07A, Sand 100: #FFF6E1→#F0ECE4).

- Prioridad: P1
- Tamaño: S
- Estimación: 4h
- Fecha de inicio prevista: 2026-02-23

---

### T-002 — [BRAND] Verificar ratios de contraste con herramienta para nueva paleta Sand

- Descripción: La guía v2.0 indica que los ratios de contraste con los nuevos valores Sand son aproximados (`~`) y deben verificarse con herramienta antes de implementar. Hacerlo inmediatamente tras T-001.

  **Combinaciones a verificar:**
  - Sand 500 (`#E2CC96`) / Charcoal 900 (`#2F3437`) → esperado ~8.5:1 AAA
  - Teal 700 (`#0F766E`) / Sand 100 (`#F0ECE4`) → esperado ~6.8:1 AA
  - Charcoal 900 / Sand 100 → esperado ~11.2:1 AAA
  - Charcoal 950 / Sand 500 → esperado ~9.5:1 AAA

  **Pasos:**
  1. Usar WebAIM Contrast Checker (https://webaim.org/resources/contrastchecker/) o Colour Contrast Analyser local.
  2. Verificar cada combinación de la tabla §10.1 de la guía.
  3. Si alguna combinación no alcanza el nivel esperado (AA mínimo para texto normal, AAA para texto grande), crear una tarea derivada con el ajuste hex necesario antes de continuar con T-003.

  **Criterio de aceptación:** Todas las combinaciones de texto pasan el nivel WCAG documentado en guia-de-marca §10.1. Resultado documentado en un comentario de PR o en `docs/contraste-v2.md`.

  **Evidencia:** guia-de-marca v2.0 §10.1 — tabla de accesibilidad con valores aproximados y nota "verificar con herramienta al implementar".

- Prioridad: P1
- Tamaño: XS
- Estimación: 2h
- Fecha de inicio prevista: 2026-02-23

---

### T-003 — [BRAND] Aplicar light mode "Neutral funcional" end-to-end

- Descripción: El light mode en producción usa Sand 100 v1.6 (`#FFF6E1`) como fondo, generando el efecto amarillo que motivó el feedback negativo (F2, F3 en guía). En v2.0 el light mode pasa a usar `#F0ECE4` como bg y blanco (`#FFFFFF`) como superficie de cards. El modo claro NO debe mostrar Sand 500 ni Teal como decoración: solo Charcoal como tinta y teal en links/focus.

  **Pasos:**
  1. Confirmar que tras T-001 el token `--color-sand-100` ya es `#F0ECE4`.
  2. Revisar el bloque CSS del tema claro (`[data-theme="light"]`) y verificar que `--color-bg` apunta a `--color-sand-100`, `--color-surface` a `#FFFFFF`, `--color-text` a Charcoal 900.
  3. Hacer un recorrido visual en light mode en todas las rutas principales (/, /about, /services, /projects, /blog, /contact) buscando elementos con fondo amarillo residual o texto Sand 500 en cuerpo.
  4. Corregir cualquier hardcode de `#FFF6E1` o `color: var(--color-sand-500)` en text body que haya quedado fuera del token.
  5. Asegurarse de que el toggle de tema persiste entre navegaciones.

  **Criterio de aceptación:** En light mode, ninguna sección tiene fondo perceptiblemente amarillo. Color de fondo de página: `#F0ECE4`. Cards y superficies: blanco. Texto: Charcoal 900. Teal solo en links activos y focus ring. Comprobación en Chrome DevTools con `prefers-color-scheme: light` y con toggle manual.

  **Evidencia:** guia-de-marca v2.0 §10 ("Fondo Claro: #F0ECE4 — neutro cálido, no amarillo"), §18 CSS tokens `[data-theme="light"]`, feedback F2 y F3 documentados en §0.2.

- Prioridad: P1
- Tamaño: M
- Estimación: 8h
- Fecha de inicio prevista: 2026-02-23

---

### T-004 — [BRAND] Auditar y corregir regla de contención de color (máx. 2 colores de marca por sección)

- Descripción: La guía v2.0 introduce una nueva regla: **máximo 2 colores de marca visibles simultáneamente por sección o componente**. Charcoal es la base neutral; Sand aparece en un elemento prominente; Teal solo en estados interactivos. Nunca los tres en primera línea visual en la misma sección.

  Esta regla no existía en v1.6 y probablemente no se respeta en el diseño actual.

  **Pasos:**
  1. Hacer un recorrido sección por sección del Home, /services y /projects con los DevTools abiertos, identificando secciones donde Charcoal + Sand + Teal aparecen visualmente al mismo tiempo (sin interacción).
  2. Documentar los casos encontrados (captura + ruta del componente).
  3. Para cada caso: reducir la presencia de Teal a estados interactivos (hover/focus), o mover el elemento Sand a un único punto focal por sección.
  4. Ajustar las proporciones de uso Sand a 10-20% (era 15-25%).

  **Criterio de aceptación:** Recorrido visual completo sin sección que muestre los tres colores de marca simultáneamente en reposo (sin hover/focus activo). Revisado en dark mode (principal) y light mode.

  **Evidencia:** guia-de-marca v2.0 §10 "Regla de contención de color (nueva en v2.0)" y §13-bis changelog.

- Prioridad: P1
- Tamaño: M
- Estimación: 6h
- Fecha de inicio prevista: 2026-02-24

---

### T-005 — [BRAND] Auditar y corregir uso de Teal (solo interacción, nunca decorativo)

- Descripción: La guía v2.0 refuerza la regla de Teal: **exclusivamente color de interacción y estado**. No debe usarse como decoración, ilustración ni fondo de sección. Su presencia debe estar siempre vinculada a un elemento accionable (link, button, focus ring) o a un estado de UI (success, info, etc.).

  **Pasos:**
  1. Buscar en el repo todos los usos de `#2DD4BF`, `teal-500`, `color-teal` fuera de contextos de link/focus/hover/button: `grep -r "teal" src/components/ src/layouts/ src/pages/`.
  2. Para cada uso encontrado: determinar si está en un contexto decorativo o de interacción.
  3. Reemplazar usos decorativos de Teal por Charcoal 700 (bordes), Sand 500 (acentos) o eliminarlos según contexto.
  4. Verificar que el focus ring de todos los elementos interactivos usa Teal (accesibilidad).

  **Criterio de aceptación:** Ningún elemento estático (no interactivo, no en estado) usa Teal como color visible. Focus ring con Teal en 100% de elementos interactivos verificable con teclado (Tab). Comprobado en dark y light mode.

  **Evidencia:** guia-de-marca v2.0 §10 "Regla de Teal (reforzada en v2.0)", feedback F5 ("el verde con el gris crea un azul extraño").

- Prioridad: P1
- Tamaño: S
- Estimación: 4h
- Fecha de inicio prevista: 2026-02-25

---

### T-006 — [BRAND] Corregir microcopy de CTAs en Home según guía §6

- Descripción: El Home en producción muestra el CTA secundario "Ver metodología de performance". La guía §6 especifica "Ver mi metodología de performance" (con "mi", que aporta autoría y voz personal). Es un gap menor pero afecta la coherencia de voz de marca.

  **Pasos:**
  1. Localizar el componente Hero (probablemente `src/components/Hero.astro` o similar).
  2. Cambiar el texto del CTA secundario a "Ver mi metodología de performance".
  3. Revisar el resto de CTAs del Home contra la lista de §6 y corregir cualquier otro que no coincida.

  **Criterio de aceptación:** El CTA secundario del hero muestra "Ver mi metodología de performance". Comprobado en producción tras deploy.

  **Evidencia:** Producción — CTA secundario del hero: **"Ver metodología de performance"** (**verificado directamente** en HTML del home, `[Ver metodología de performance](/blog)`); guia-de-marca v2.0 §6 CTAs — "Ver **mi** metodología de performance".

- Prioridad: P2
- Tamaño: XS
- Estimación: 1h
- Fecha de inicio prevista: 2026-02-26

---

### T-007 — [BRAND] Rediseñar formulario de contacto con campos de cualificación de lead

- Descripción: El formulario de contacto actual solo tiene name/email/message (verificado vía Netlify Forms MCP: campos `name`, `email`, `message`). La guía de marca §6 define placeholders específicos para campos de cualificación que facilitan evaluar el lead sin una llamada inicial: URL del sitio, stack actual, objetivo, plazo y presupuesto orientativo.

  Con solo 6 envíos en 4 meses (oct 2025 - feb 2026) y sin notificación configurada (ver T-026), mejorar la calidad de los contactos es prioritario.

  **Pasos:**
  1. Actualizar el componente del formulario de contacto añadiendo:
     - Campo URL ("https://tusitio.com") — text, opcional
     - Campo Stack Actual ("Ej.: WordPress, Wix, HTML, Shopify") — text, opcional
     - Campo Objetivo ("Ej.: más leads, más ventas, mejor SEO") — text, requerido
     - Campo Plazo ("Ej.: 2 semanas, 1 mes, flexible") — text, opcional
     - Campo Presupuesto orientativo ("Ej.: 800–1500€") — text, opcional
  2. Actualizar la Netlify Function `contact` para recoger y reenviar los nuevos campos.
  3. Actualizar el honeypot y los campos hidden de Netlify Forms.
  4. Aplicar microcopy de confirmación de la guía §6: "Recibido. En breve te respondo con los siguientes pasos."
  5. Mensajes de error según guía §6 (email inválido, formulario incompleto).
  6. Asegurar que todos los nuevos campos tienen label visible (accesibilidad).

  **Criterio de aceptación:** Formulario en /contact muestra los campos adicionales. Envío de prueba recibido en Netlify Forms con todos los campos rellenados. Labels visibles. Honeypot activo. Mensaje de confirmación correcto.

  **Evidencia:** Netlify MCP — formulario "contact", campos: `bot-field`, `name`, `email`, `message`; guia-de-marca v2.0 §6 Placeholders; 6 envíos totales (oct 2025 - nov 2025) sugieren baja conversión.

- Prioridad: P1
- Tamaño: M
- Estimación: 6h
- Fecha de inicio prevista: 2026-02-26

---

### T-008 — [BRAND] Auditar componentes Button/CTA contra especificación de diseño

- Descripción: El UI Kit fue implementado en v3 (ficha menciona "botones, tarjetas, badges, inputs, alertas"). Verificar que los componentes Button respetan exactamente las especificaciones de la guía v2.0: fondo Sand 500 en primary, outline Sand 500 en secondary, altura 44px, radius 12-16px, focus ring Teal, y los nuevos valores hex.

  **Pasos:**
  1. Revisar el componente Button (probablemente `src/components/Button.astro` o UI Kit).
  2. Comprobar: `background: var(--color-sand-500)` en primary (nuevo hex #E2CC96), border Sand 500 en secondary, height 44px mínimo, border-radius entre 12px-16px, focus ring `outline: 2px solid var(--color-teal-500)`.
  3. Actualizar cualquier valor que no coincida.
  4. Revisar en dark y light mode.

  **Criterio de aceptación:** Todos los botones primary/secondary en la UI verifican los tokens de guía. Target interactivo ≥44×44px. Focus ring Teal visible con Tab en todas las variantes.

  **Evidencia:** guia-de-marca v2.0 §12 Componentes — tabla Button; ficha proyecto v3.55.6 "UI Kit modular: implementación de componentes accesibles".

- Prioridad: P2
- Tamaño: S
- Estimación: 3h
- Fecha de inicio prevista: 2026-02-26

---

### T-009 — [BRAND] Reemplazar logo PNG por SVG en navbar y footer

- Descripción: El navbar usa `/logos/logo_cuadrado_transparente.png` (verificado en HTML de producción). La guía §9 no especifica formato explícitamente pero las restricciones de logo (no estirar, no deformar, mínimo 160px, clear space 3S) se garantizan mejor con SVG escalable. Además, el PNG puede verse pixelado en pantallas de alta densidad (Retina/HiDPI).

  **Pasos:**
  1. Verificar si existe `/logos/logo_cuadrado_transparente.svg` o equivalente SVG en el repo public.
  2. Si existe: reemplazar la referencia `<img src="/logos/logo_cuadrado_transparente.png">` por el SVG (inline o como `<img>` con el nuevo src).
  3. Si no existe: exportar el logo en SVG desde el archivo fuente (no afecta a la guía — los SVGs del logo no eran recuperables desde el PDF de origen según §0.1, pero el desarrollador tiene los archivos fuente).
  4. Verificar que el logo SVG no usa colores hardcoded fuera de la paleta.
  5. Verificar que el logo cumple el mínimo de 160px de ancho en todas las resoluciones.

  **Criterio de aceptación:** El navbar y footer usan el logo en SVG. Visualmente nítido en pantalla Retina (DevTools device pixel ratio 2x). Sin distorsión.

  **Evidencia:** Producción — `<img src="/logos/logo_cuadrado_transparente.png">` en navbar; guia-de-marca v2.0 §9 "Mínimos digitales: Logo completo 160px, no estirar ni deformar".

- Prioridad: P2
- Tamaño: S
- Estimación: 3h
- Fecha de inicio prevista: 2026-02-27

---

### T-010 — [SEO] Optimizar meta title del Home (keyword al inicio, ≤60 caracteres)

- Descripción: El meta title actual del Home es "Rendimiento web · Portfolio de Adrián Mariscal" (verificado en `<title>` de producción). La guía SEO §7 especifica "keyword al inicio" y ≤60 caracteres. El sitio no aparece en el top-100 para queries competitivas ("diseñador web rendimiento España"). El meta title es la señal SEO on-page más importante.

  **Propuesta de título:** "Diseñador Web Performance · Adrián Mariscal" (44 chars) o "Auditoría y diseño web performance-first | Adrián Mariscal" (59 chars).

  **Pasos:**
  1. Localizar la configuración del meta title en el componente `<Head>` o layout principal.
  2. Actualizar el title del Home con un title que priorice "diseñador web" o "auditoría web rendimiento" al inicio.
  3. Verificar con https://search.google.com/search-console que el nuevo title queda indexado correctamente.

  **Criterio de aceptación:** Meta title del Home ≤60 caracteres. Keyword principal en los primeros 30 caracteres. Verificado con `curl -s https://adrianmariscal.es | grep '<title>'`.

  **Evidencia:** Producción — `<title>Rendimiento web · Portfolio de Adrián Mariscal</title>` (**verificado directamente** en HTML del home); guia-de-marca §7 "Meta Title: ≈50–60 caracteres; keyword al inicio"; adrianmariscal.es no aparece en resultados de búsqueda para "diseñador web rendimiento performance España freelance" (auditado 2026-02-22).

- Prioridad: P1
- Tamaño: XS
- Estimación: 2h
- Fecha de inicio prevista: 2026-02-27

---

### T-011 — [SEO] Añadir schema.org Person + LocalBusiness JSON-LD a Home y About

- Descripción: El sitio ya usa JSON-LD para posts (ficha menciona JSON-LD para posts, v3 results). Sin embargo, no se detectan schema.org `Person` ni `LocalBusiness` en el Home o About (Pendiente de verificación directa en repo). Estos schemas mejoran la visibilidad en Google Knowledge Graph y featured snippets de marca.

  **Pasos:**
  1. Crear un componente `SchemaOrg.astro` o extender el `<Head>` del layout.
  2. Añadir en Home: `Person` con `name`, `jobTitle: "Web Designer"`, `url`, `sameAs` (LinkedIn, GitHub).
  3. Añadir en About/Home: `ProfessionalService` o `LocalBusiness` con `name`, `description`, `url`, `areaServed: "España"`, `priceRange: "€€"`.
  4. Validar con https://search.google.com/test/rich-results.

  **Criterio de aceptación:** Rich Results Test de Google no muestra errores para Home y About. Schema `Person` y `ProfessionalService`/`LocalBusiness` válidos y completos.

  **Evidencia:** HTML de producción — solo se detecta JSON-LD en posts (ficha: "SEO mediante meta tags, OG/Twitter y JSON-LD para posts"); guia-de-marca §7 — "URLs cortas, snippet optimization"; análisis competitivo: franlopezweb.es usa schema local explícito.

- Prioridad: P1
- Tamaño: S
- Estimación: 4h
- Fecha de inicio prevista: 2026-02-27

---

### T-012 — [SEO] Añadir schema.org BreadcrumbList a páginas de proyecto y posts

- Descripción: Las páginas `/projects/[slug]` y `/blog/[slug]` no muestran evidencia de schema BreadcrumbList (Pendiente de verificación directa en repo). Los breadcrumbs en schema mejoran la representación en SERPs y el CTR.

  **Pasos:**
  1. En el layout de posts y proyectos, añadir JSON-LD `BreadcrumbList` con los ítems correspondientes (Inicio > Blog/Proyectos > Título del post/proyecto).
  2. Verificar con Rich Results Test.
  3. Verificar que el breadcrumb visual (UI) coincide con el schema.

  **Criterio de aceptación:** Rich Results Test sin errores para al menos 2 posts y 2 proyectos. El breadcrumb schema refleja la jerarquía real de la URL.

  **Evidencia:** HTML de producción — no se detecta BreadcrumbList en estructura de página (Pendiente de verificación); guia-de-marca §7 "estructura de enlaces amigable".

- Prioridad: P1
- Tamaño: S
- Estimación: 3h
- Fecha de inicio prevista: 2026-03-02

---

### T-013 — [SEO] Crear landing page dedicada /auditoria-web

- Descripción: El sitio no aparece en el top-100 para queries de alta intención como "auditoría web rendimiento" (Escenario B). La guía §3 define como objetivo "convertir contenido técnico en autoridad y leads" y §7 especifica estructura H1→H2→CTA alineada a featured snippets. Una landing page dedicada con anatomía de conversión es el activo SEO transaccional más rentable para vNext.

  **Estructura de la página:**
  - H1: "Auditoría web gratuita: rendimiento, SEO y accesibilidad"
  - H2: Qué incluye el Informe Base gratuito (48-72h)
  - H2: Qué incluye el Informe Completo (149€, descontable)
  - CTA principal: "Solicitar auditoría gratuita"
  - FAQ schema.org
  - URL: `/auditoria-web`

  **Pasos:**
  1. Crear `src/pages/auditoria-web.astro`.
  2. Implementar estructura con heading hierarchy correcta (1 H1, H2 por sección).
  3. Añadir FAQ schema.org (`FAQPage`).
  4. Enlazar desde Home y /services.
  5. Meta title: "Auditoría Web Gratuita: rendimiento y SEO | Adrián Mariscal" (≤60ch).

  **Criterio de aceptación:** `/auditoria-web` indexable, sin errores en Rich Results Test para FAQ. Enlazada desde Home (mínimo 1 link interno). Meta title ≤60 chars, keyword al inicio.

  **Evidencia:** Análisis SEO — adrianmariscal.es no aparece en resultados de búsqueda para "auditoría web rendimiento performance España freelance" (auditado 2026-02-22); guia-de-marca §14 "Auditoría gratuita" como producto anchor; §3 Objetivo "posicionar reconstrucción performance-first".

- Prioridad: P2
- Tamaño: S
- Estimación: 3h
- Fecha de inicio prevista: 2026-03-02

---

### T-014 — [SEO] Generar OG images automáticas por página con Astro + satori/Sharp

- Descripción: No hay evidencia de OG images específicas por página en la configuración actual (Pendiente de verificación). Cuando un post o proyecto se comparte en redes sociales, se usa una imagen genérica o ninguna. Las OG images por contenido aumentan el CTR en redes y refuerzan la percepción de marca.

  **Pasos:**
  1. Instalar `@vercel/og` o usar `satori` + `Sharp` con Astro endpoint.
  2. Crear un endpoint `src/pages/og/[...slug].png.ts` que genere imágenes dinámicas con: título del contenido, nombre de Adrián Mariscal, paleta Charcoal/Sand de marca, tipografía Sora.
  3. Actualizar el componente `<Head>` para referenciar la OG image dinámica por ruta.
  4. Verificar con https://www.opengraph.xyz/ que las imágenes se generan correctamente.

  **Criterio de aceptación:** Al compartir en Twitter/LinkedIn cualquier post o proyecto, la tarjeta muestra la OG image específica con título, autor y marca reconocible. Verificado con Open Graph Debugger.

  **Evidencia:** HTML de producción — verificar `<meta property="og:image">` (Pendiente verificación de si es genérico o dinámico); ficha proyecto v3 — OG/Twitter tags mencionados globalmente, no por contenido.

- Prioridad: P2
- Tamaño: S
- Estimación: 3h
- Fecha de inicio prevista: 2026-03-02

---

### T-015 — [FEAT] Simplificar Decap CMS a modo editorial simple: publicar directo a main → auto-deploy

- Descripción: El desarrollador ha identificado explícitamente esta mejora como prioridad. El flujo actual de Decap CMS requiere pasar por staging (las variables `CMS_DISPLAY_URL` y `CMS_SITE_URL` apuntan a `staging.adrianmariscal.es`). Esto añade fricción para publicar contenido de blog o actualizar textos, que es la operación más frecuente para un autor único. El modo "simple" de Decap CMS permite publicar directamente en la rama main, que Netlify ya auto-despliega.

  **Pasos:**
  1. En la configuración de Decap CMS (`public/admin/config.yml` o equivalente), cambiar el backend de `editorial_workflow: true` a `editorial_workflow: false` (modo simple).
  2. Actualizar la `publish_mode` a `simple` si aplica.
  3. Actualizar las variables de entorno en Netlify (ver T-026): `CMS_SITE_URL` en contexto `production` con `https://adrianmariscal.es`, `CMS_DISPLAY_URL` con `https://adrianmariscal.es`.
  4. Verificar que la autenticación del CMS (GitHub OAuth o Netlify Identity) funciona correctamente desde producción.
  5. Probar publicar un post desde el CMS en producción y verificar que el deploy de Netlify se lanza automáticamente en < 2 minutos.

  **Criterio de aceptación:** Desde `https://adrianmariscal.es/admin/`, el autor puede crear y publicar un post de blog sin necesidad de pasar por staging. El deploy de Netlify se lanza y completa en < 2 minutos. La rama staging puede seguir existiendo para cambios de código.

  **Evidencia:** Netlify MCP — `CMS_DISPLAY_URL` y `CMS_SITE_URL` configuradas solo para `branch-deploy` (staging), vacías en producción (verificado); nota del desarrollador: "Simplificar decap CMS, usando el modo 'simple' de publicacion/actualizacion de entradas y que dichos cambios acaben directamente en main para que se autodesplieguen con netlify".

- Prioridad: P1
- Tamaño: M
- Estimación: 8h
- Fecha de inicio prevista: 2026-03-03

---

### T-016 — [FEAT] Completar y alinear /services: nombres de packs, precios y contenido de marca

- Descripción: La página /services existe y tiene estructura correcta (hero con CTA, sección auditoría con informe base/completo, sección packs, sección servicios futuros). Sin embargo, tiene varios gaps críticos respecto a la guía de marca:

  **Gap 1 — Nombres de packs incorrectos (desalineación de marca):**
  Producción muestra `Pack Base / Pack Growth / Pack End-to-End`. La guía de marca §14 define `Corrección / Optimización / Excelencia`. Los nombres actuales son genéricos y pierden el tono de marca (rigurosa, pragmática, orientada a resultados).

  **Gap 2 — Sin precios visibles:**
  Los tres packs no tienen precio. La guía §14 implica packs cerrados con precio conocido. La ausencia de precio obliga al usuario a contactar para saber si el coste encaja, aumentando la fricción.

  **Gap 3 — Descripciones de pack demasiado escuetas:**
  Cada pack tiene una sola frase genérica. La guía §14 define: objetivo, qué incluye técnicamente e ideal para qué perfil de cliente.

  **Gap 4 — Sección "Servicios futuros" como placeholder explícito:**
  La página dice literalmente "Esta página está preparada para ampliar la oferta". Es un mensaje de trabajo en progreso visible en producción, que reduce la credibilidad.

  **Gap 5 — CTA "Consultar disponibilidad" no está en la guía §6:**
  El microcopy correcto para el final de sección sería "Pedir presupuesto cerrado" o "Ver packs de mejora".

  **Pasos:**
  1. Renombrar los packs: `Pack Base` → `Corrección`, `Pack Growth` → `Optimización`, `Pack End-to-End` → `Excelencia`.
  2. Añadir la descripción completa de cada pack (objetivo + incluye técnicamente + ideal para) según guía §14.
  3. Añadir precios (o rango orientativo) en cada pack. El desarrollador debe decidir los precios; el Informe Completo está en 149€ como referencia anchor de la guía.
  4. Marcar "Optimización" como "más popular" (badge o highlight visual).
  5. Eliminar o reemplazar la sección "Servicios futuros" por contenido real o eliminarla si no hay nada que añadir todavía.
  6. Cambiar CTA "Consultar disponibilidad" por "Pedir presupuesto cerrado" (guía §6).
  7. Verificar que el H1 "Servicios" está bien (1 por página ✅) y el meta title sigue la guía §7 (≤60 chars, keyword al inicio). Título actual: "Rendimiento web · Servicios · Auditoría y packs de mejora" (57 chars, keyword no al inicio).

  **Criterio de aceptación:** /services muestra los tres packs con los nombres de la guía de marca. Cada pack tiene descripción completa + precio + CTA propio. El pack Optimización está destacado como más popular. No hay sección "en construcción" visible. El meta title empieza por la keyword principal (ej: "Auditoría web y packs de mejora · Adrián Mariscal").

  **Evidencia:** Producción https://adrianmariscal.es/services/ — **verificado directamente**: packs `Pack Base / Pack Growth / Pack End-to-End` sin precios ni descripción completa; sección "Servicios futuros" como placeholder; CTA "Consultar disponibilidad"; meta title "Rendimiento web · Servicios · Auditoría y packs de mejora". Guía de marca §14 — `Corrección / Optimización / Excelencia` con tabla de descripción completa; §6 CTAs; §7 meta title.

- Prioridad: P1
- Tamaño: L
- Estimación: 16h
- Fecha de inicio prevista: 2026-03-04

---

### T-017 — [FEAT] Añadir sección "Antes/Después" estandarizada en fichas de proyecto

- Descripción: La guía §14 pregunta abierta 4 menciona el formato "Antes/Después" como pendiente de definir. La ficha de portfolio en producción muestra resultados por versión (v0.1, v1.0, v2.16, v3.55) pero no hay una comparativa visual estructurada con métricas. Los competidores no ofrecen este nivel de transparencia. Es el diferenciador más potente para convertir visitas de pymes técnicas.

  **Pasos:**
  1. Definir un componente `BeforeAfter.astro` que acepte: métrica, valor_antes, valor_despues, descripción.
  2. Crear una tabla estilo: `| Métrica | Antes | Después | Mejora |` con métricas tipo Lighthouse Performance, LCP, CLS, INP, tamaño de bundle.
  3. Opcionalmente: componente de captura pantalla "before/after" con slider o tabs.
  4. Añadir la sección a la ficha del proyecto Portfolio y a la de Cartas Rápidas como primeros ejemplos.
  5. Documentar la plantilla en `docs/plantilla-caso-estudio.md` para futuros proyectos.

  **Criterio de aceptación:** Al menos 2 fichas de proyecto (/projects/portfolio y /projects/cartas-rapidas) muestran la sección Antes/Después con métricas reales. La sección es visualmente coherente con el design system. Métricas verificables (fuente: Lighthouse CI histórico, capturas).

  **Evidencia:** guia-de-marca v2.0 §14 Q4 "Formato exacto de Antes/Después: capturas + tabla de métricas"; ficha de proyecto en producción — resultados por versión sin comparativa estandarizada; análisis competitivo — ningún competidor directo muestra antes/después con métricas.

- Prioridad: P1
- Tamaño: M
- Estimación: 10h
- Fecha de inicio prevista: 2026-03-06

---

### T-018 — [FEAT] Añadir sección de prueba social / testimonios

- Descripción: Con solo 6 contactos en 4 meses y sin testimonios visibles, la ausencia de prueba social es la principal barrera de conversión detectada. La guía §14 Q5 menciona "primer tipo de prueba social: auditorías reales con permiso". En vNext se estructura la sección y se añade al menos el primer testimonio real (o un placeholder con la estructura correcta si aún no hay).

  **Pasos:**
  1. Crear componente `Testimonial.astro` con: nombre/iniciales (anonimizable), empresa/sector, texto del testimonio, resultado cuantificado si aplica.
  2. Añadir la sección en el Home (antes del CTA final) y opcionalmente en /services.
  3. Si hay testimonios reales disponibles: añadirlos. Si no: añadir placeholder con lorem de formato correcto y marca como `draft: true` para no publicar hasta tener contenido real.
  4. Definir en `docs/plantilla-testimonio.md` el proceso de obtención de consentimiento.

  **Criterio de aceptación:** /home muestra al menos 1 testimonio o la sección de testimonios estructurada. El componente Testimonial acepta datos tipados (TypeScript). La sección no aparece en producción si todos los testimonios son `draft: true`.

  **Evidencia:** guia-de-marca §14 Q5 "Primer tipo de prueba social: auditorías reales con permiso"; conversión actual: 6 contactos vía formulario desde oct 2025 (Netlify Forms MCP); análisis competitivo: franlopezweb.es, ctorres.es muestran testimonios con empresas.

- Prioridad: P2
- Tamaño: M
- Estimación: 8h
- Fecha de inicio prevista: 2026-03-09

---

### T-019 — [FEAT] Implementar PWA con Service Worker + offline cache (Workbox)

- Descripción: El score PWA en el último deploy es 70/100 (Netlify Lighthouse plugin: `pwa: 70`, deploy `699adbfcba6f8100082a43bd`). La ficha de proyecto tiene como roadmap explícito "PWA y offline: habilitar capacidades de aplicación web progresiva, con caché de assets y carga sin conexión". Es también el único gap de Lighthouse en un sitio que tiene 99/99/100/100 en las otras categorías.

  **Pasos:**
  1. Verificar si hay un Web App Manifest (`public/manifest.json` o `webmanifest`). Si existe, completar: `name`, `short_name`, `theme_color: #2F3437`, `background_color: #2F3437`, `icons` en 192×192 y 512×512, `display: standalone`.
  2. Instalar `@astrojs/service-worker` o integrar Workbox manualmente via `vite-plugin-pwa`.
  3. Configurar estrategia de caché: `NetworkFirst` para páginas HTML, `CacheFirst` para assets estáticos (CSS, JS, fonts, imágenes).
  4. Añadir página de fallback offline (`/offline`).
  5. Verificar que `prefers-reduced-motion` no afecta la instalación.
  6. Actualizar el umbral de Lighthouse CI en GitHub Actions (ver T-023).

  **Criterio de aceptación:** Lighthouse PWA score ≥ 85. El sitio es instalable en Chrome/Edge (botón de instalación visible). La página /offline se muestra correctamente sin conexión. `chrome://inspect` muestra el Service Worker activo.

  **Evidencia:** Netlify MCP — `lighthouse.averages.pwa: 70`; ficha proyecto roadmap "PWA y offline"; deploy `699adbfcba6f8100082a43bd`.

- Prioridad: P2
- Tamaño: L
- Estimación: 16h
- Fecha de inicio prevista: 2026-03-10

---

### T-020 — [FEAT] Añadir tabla de contenidos auto-generada a posts de blog largos

- Descripción: Los posts técnicos del blog (25+ artículos, algunos de alta profundidad técnica como el de suite de tests E2E o el modelo de datos MVP) no muestran tabla de contenidos (Pendiente de verificación directa). Una ToC mejora la navegación, el tiempo en página y permite a Google mostrar jump links en los SERPs.

  **Pasos:**
  1. Crear un plugin remark/rehype (`src/plugins/remark-toc.ts` o similar) que extraiga headings H2/H3 del MDX y genere una lista de anchors.
  2. Crear un componente `TableOfContents.astro` que renderice la ToC con links ancla.
  3. Mostrar la ToC solo si el post tiene ≥3 headings H2.
  4. Añadir la ToC al layout de post (sticky en desktop, colapsable en móvil).
  5. Verificar que los anchors generados coinciden con los `id` de los headings (ya se usan rehype-autolink-headings según ficha: "autogeneración de enlaces en encabezados gracias a remark/rehype").

  **Criterio de aceptación:** Un post con ≥3 headings H2 muestra la ToC. Los links de la ToC navegan al heading correcto. En móvil la ToC es colapsable. Los posts cortos (<3 H2) no la muestran.

  **Evidencia:** Ficha proyecto v3 "autogeneración de enlaces en encabezados gracias a remark/rehype" — base técnica disponible; producción — posts largos no muestran ToC visible (verificado en home extract).

- Prioridad: P2
- Tamaño: M
- Estimación: 8h
- Fecha de inicio prevista: 2026-03-12

---

### T-021 — [FEAT] Añadir suscripción a newsletter del blog (Buttondown/Brevo, GDPR)

- Descripción: La guía §6 CTAs incluye "Suscribirme a novedades (si aplica)". El blog tiene 25+ artículos técnicos que generan valor recurrente; capturar suscriptores es coherente con la línea editorial 70/30. El proveedor debe ser GDPR-compliant con doble opt-in.

  **Pasos:**
  1. Elegir proveedor: Buttondown (simple, API limpia, GDPR por defecto) o Brevo (más completo).
  2. Crear una Netlify Function `newsletter-subscribe` que reciba el email y llame al API del proveedor.
  3. Añadir un formulario de suscripción discreto en el footer del blog y al final de cada post.
  4. Microcopy de confirmación (§6): "Listo. Te avisaré cuando publique algo relevante."
  5. Actualizar la política de privacidad para mencionar el servicio de newsletter.
  6. Añadir consentimiento explícito (checkbox o flujo doble opt-in del proveedor).

  **Criterio de aceptación:** El formulario de suscripción es visible al final de cada post y en el footer del blog. Al enviar un email de prueba, se recibe el email de confirmación doble opt-in. La política de privacidad menciona el proveedor y el uso de datos. El formulario tiene honeypot o reCAPTCHA.

  **Evidencia:** guia-de-marca §6 CTAs "Suscribirme a novedades (si aplica)"; §3 "Línea editorial prevista: 70% contenido técnico"; producción — no se detecta formulario de newsletter en footer o posts.

- Prioridad: P2
- Tamaño: M
- Estimación: 8h
- Fecha de inicio prevista: 2026-03-13

---

### T-022 — [PERF] Auditar y subconjuntar carga de web fonts (Sora, Inter, JetBrains Mono)

- Descripción: Las tres tipografías de marca (Sora, Inter, JetBrains Mono) pueden estar cargando todos los pesos y glyphs si no se ha configurado subsetting explícito. Con Lighthouse Performance 99, el impacto es marginal pero el ahorro de bytes beneficia a conexiones lentas.

  **Pasos:**
  1. Verificar en las DevTools Network tab qué pesos de Sora, Inter y JetBrains Mono se descargan.
  2. Si se usan Google Fonts o Fontsource: configurar subset solo con los pesos usados (Sora 600, Inter 400/500, JetBrains Mono 400) y caracteres latinos básicos + latín extendido.
  3. Si se usan fuentes self-hosted: verificar que los archivos WOFF2 incluyen solo los rangos unicode necesarios.
  4. Verificar que `font-display: swap` o `optional` está configurado.

  **Criterio de aceptación:** Total peso de fuentes < 120KB combinado. Lighthouse no muestra fuentes como "render-blocking resource". Network tab muestra solo los pesos realmente usados.

  **Evidencia:** guia-de-marca §11 — Sora 600 (Display), Inter 400/500/600 (UI), JetBrains Mono 400 (código); Lighthouse Performance 99 — margin to improve font loading.

- Prioridad: P2
- Tamaño: S
- Estimación: 3h
- Fecha de inicio prevista: 2026-03-16

---

### T-023 — [PERF] Actualizar umbral Lighthouse CI para PWA de 70 a 85

- Descripción: El Lighthouse CI en GitHub Actions tiene configurado el umbral de PWA en el valor que actualmente pasa (probablemente ≤70 o sin umbral específico para PWA). Tras implementar la PWA en T-019 (score objetivo ≥85), hay que elevar el umbral en el archivo de configuración de Lighthouse CI para mantener el regress guard.

  **Pasos:**
  1. Localizar `lighthouserc.js` o `lighthouserc.json` en el repo.
  2. Actualizar la categoría PWA: `"categories.pwa.minScore": 0.85`.
  3. Verificar que el umbral no rompe el CI antes de que T-019 esté merged.
  4. Este commit debe ir en el mismo PR que T-019 o inmediatamente después.

  **Criterio de aceptación:** El CI de Lighthouse falla si el score PWA cae por debajo de 85. El umbral de las otras categorías (99/99/100/100) se mantiene intacto.

  **Evidencia:** Netlify MCP — `lighthouse.averages.pwa: 70`; ficha proyecto "Lighthouse CI integrado en Netlify" + "GitHub Actions con workflows segmentados... Lighthouse".

- Prioridad: P2
- Tamaño: XS
- Estimación: 2h
- Fecha de inicio prevista: 2026-03-17

---

### T-024 — [A11Y] Integrar axe-playwright en GitHub Actions CI

- Descripción: El CI actual tiene Playwright para tests E2E pero no hay evidencia de un paso automatizado de auditoría de accesibilidad (axe). El roadmap de la ficha menciona "Pruebas de accesibilidad: ampliar la cobertura de a11y usando herramientas como Axe y automatizar informes en la CI." Lighthouse Accessibility 99 cubre la mayoría de issues, pero axe-playwright puede detectar issues de interacción que Lighthouse no audita (aria-live, foco en modales, etc.).

  **Pasos:**
  1. `npm install --save-dev @axe-core/playwright`.
  2. Crear un test Playwright `a11y.spec.ts` que visite las páginas principales (/, /about, /services, /blog, /contact) y ejecute `checkA11y()` de axe-playwright.
  3. Configurar el paso en el workflow de GitHub Actions (`.github/workflows/a11y.yml` o añadir a `playwright.yml`).
  4. Configurar para que falle el CI en violaciones de nivel "critical" o "serious". Ignorar temporalmente las de nivel "moderate" con `disableRules: [...]` y crear issues para resolverlas progresivamente.

  **Criterio de aceptación:** El CI de GitHub Actions ejecuta el paso de axe-playwright en cada PR. Si hay violaciones "critical" o "serious", el CI falla con el mensaje descriptivo de axe. Sin violaciones en el primer run (o con deuda documentada).

  **Evidencia:** Ficha proyecto roadmap "Pruebas de accesibilidad: ampliar la cobertura de a11y usando herramientas como Axe y automatizar informes en la CI"; ficha "GitHub Actions con workflows segmentados para... e2e"; Lighthouse A11Y 99 — margin to verify dynamic interactions.

- Prioridad: P1
- Tamaño: M
- Estimación: 6h
- Fecha de inicio prevista: 2026-03-17

---

### T-025 — [A11Y] QA manual: navegación por teclado y focus ring en dark/light mode

- Descripción: La guía §17 especifica "Focus visible en todos los elementos interactivos (focus ring Teal). Targets mínimos 44×44px." Tras las modificaciones de T-003 a T-008, es necesario un recorrido manual de QA con teclado para verificar que el focus ring es visible en todos los contextos.

  **Pasos:**
  1. Navegar por /,  /about, /services, /projects, /blog, /contact usando solo Tab + Enter + Escape.
  2. Verificar que cada elemento interactivo (links, botones, inputs, menú móvil, toggle de tema, cookie banner) muestra el focus ring de Teal con contraste suficiente.
  3. Hacer el mismo recorrido en light mode (toggle "Claro" en navbar).
  4. Documentar cualquier elemento sin focus ring visible y crear fix en el mismo PR.

  **Criterio de aceptación:** 0 elementos interactivos sin focus ring visible en dark mode. 0 elementos sin focus ring visible en light mode. Todos los targets de click tienen área mínima 44×44px.

  **Evidencia:** guia-de-marca §17 "Focus visible en todos los elementos interactivos (focus ring Teal). Targets mínimos 44×44px"; T-005 puede haber introducido cambios que afectan al focus ring si Teal se restricción afecta también a estados de foco.

- Prioridad: P2
- Tamaño: S
- Estimación: 3h
- Fecha de inicio prevista: 2026-03-18

---

### T-026 — [NETLIFY] Configurar notificación por email del formulario de contacto

- Descripción: El formulario "contact" de Netlify Forms tiene 6 envíos desde oct 2025, con el último el 21 nov 2025 (3 meses sin nuevos contactos según los datos). No hay evidencia de que las notificaciones por email estén configuradas en Netlify (Pendiente de verificación directa en la UI de Netlify — el MCP no expone la config de notificaciones). Si la notificación no está configurada, los leads llegan a Netlify pero no se alerta al autor.

  **Pasos:**
  1. Ir a Netlify → Project adrianmariscal → Forms → contact → Notifications.
  2. Configurar notificación por email a `amariscalcantudo@gmail.com` (o el email de negocio si existe).
  3. Configurar también un webhook opcional si se quiere integrar con Slack/Telegram.
  4. Hacer un envío de prueba desde /contact y verificar que el email llega en < 5 minutos.

  **Criterio de aceptación:** Cada envío del formulario /contact genera un email de notificación al desarrollador en < 5 minutos. El email incluye todos los campos del formulario (incluyendo los nuevos campos de T-007).

  **Evidencia:** Netlify MCP — `last_submission_at: "2025-11-21T19:00:10.595+00:00"` (3 meses sin contactos nuevos — posible ausencia de notificaciones); 6 total submissions desde oct 2025; no se detecta configuración de notificaciones en el MCP.

- Prioridad: P1
- Tamaño: S
- Estimación: 4h
- Fecha de inicio prevista: 2026-03-18

---

### T-027 — [NETLIFY] Revisar y reforzar cabeceras de seguridad (CSP + headers)

- Descripción: El deploy actual procesa 15 reglas de header (confirmado por Netlify MCP: "15 header rules processed"). No se puede verificar el contenido exacto de las cabeceras sin acceso al `netlify.toml` (repo privado). Tras la simplificación del CMS (T-015), los endpoints del CMS en producción cambian y pueden requerir actualización de CSP. Además, Decap CMS en producción necesita directivas específicas (`frame-src`, `connect-src`) que pueden no estar configuradas actualmente.

  **Pasos:**
  1. Auditar las cabeceras actuales desde producción: `curl -I https://adrianmariscal.es` y anotar todos los headers de seguridad.
  2. Verificar presencia de: `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`.
  3. Actualizar CSP para incluir:
     - `connect-src 'self' https://*.netlify.com` (Decap CMS + Functions).
     - `script-src 'self' https://*.googletagmanager.com` (GA4).
     - `frame-ancestors 'none'` (equivalente a X-Frame-Options DENY en CSP level 3).
  4. Verificar con https://securityheaders.com/ o https://observatory.mozilla.org/.
  5. Actualizar `netlify.toml` o el archivo de headers.

  **Criterio de aceptación:** Mozilla Observatory score ≥ B+. Las 15+ reglas de header incluyen CSP válida, HSTS, X-Content-Type-Options y Referrer-Policy. Sin violaciones de CSP en la consola del navegador tras navegar con el CMS activo.

  **Evidencia:** Netlify MCP — "15 header rules processed" (contenido no accesible sin repo); Netlify Functions: `contact`, `rum-collect`, `rum-metrics` activas (afectan CSP `connect-src`); T-015 cambia el flujo de CMS.

- Prioridad: P1
- Tamaño: M
- Estimación: 6h
- Fecha de inicio prevista: 2026-03-19

---

### T-028 — [DX] Limpiar y actualizar variables de entorno de Netlify tras simplificación de CMS

- Descripción: Tras T-015 (CMS en producción directo a main), las variables `CMS_DISPLAY_URL` y `CMS_SITE_URL` deben actualizarse para que apunten a `https://adrianmariscal.es` en el contexto `production`. Actualmente están vacías en producción y configuradas solo para `branch-deploy` (staging), lo que causará que el CMS en producción no funcione correctamente.

  **Pasos:**
  1. En Netlify → Project adrianmariscal → Environment variables:
     - `CMS_SITE_URL`: añadir valor `https://adrianmariscal.es` para contexto `production`.
     - `CMS_DISPLAY_URL`: añadir valor `https://adrianmariscal.es` para contexto `production`.
  2. Verificar que los valores para `branch-deploy` (staging) se mantienen como `https://staging.adrianmariscal.es`.
  3. Forzar un redeploy de Netlify para que las nuevas variables estén activas.
  4. Verificar que el admin de Decap CMS en producción (`/admin/`) carga correctamente.

  **Criterio de aceptación:** `CMS_SITE_URL` y `CMS_DISPLAY_URL` tienen valor `https://adrianmariscal.es` en contexto `production`. El panel de Decap CMS en `/admin/` carga y permite autenticarse sin errores.

  **Evidencia:** Netlify MCP — `CMS_DISPLAY_URL` y `CMS_SITE_URL` con valor vacío en `production`; valor `https://staging.adrianmariscal.es` en `branch-deploy` únicamente (verificado vía manage-env-vars).

- Prioridad: P1
- Tamaño: S
- Estimación: 4h
- Fecha de inicio prevista: 2026-03-19

---

### T-029 — [DX] Añadir reporte de cobertura de tests unitarios al CI (umbral 60%)

- Descripción: El CI tiene Playwright (E2E) y Lighthouse CI configurados. No hay evidencia de un paso de cobertura de tests unitarios (Vitest). Para un desarrollador único, el umbral de 60% es conservador pero suficiente para detectar regresiones en lógica crítica (formateo de datos, utilidades de contenido, validaciones de formulario).

  **Pasos:**
  1. Verificar que Vitest está configurado (ficha menciona tests unitarios en CI).
  2. En `vitest.config.ts`, añadir `coverage: { reporter: ["text", "lcov"], thresholds: { lines: 60, branches: 60 } }`.
  3. Añadir el paso `npx vitest run --coverage` en el workflow de GitHub Actions correspondiente.
  4. Si el coverage actual < 60%: identificar las funciones sin tests más críticas (utilidades de blog, validaciones) y añadir tests básicos hasta alcanzar el umbral.

  **Criterio de aceptación:** El CI de GitHub Actions falla si la cobertura de líneas < 60%. El reporte HTML de cobertura se sube como artifact del workflow. El primer run pasa el umbral.

  **Evidencia:** Ficha proyecto "GitHub Actions con workflows segmentados para linting, typecheck, tests unitarios, e2e, Lighthouse"; no hay evidencia de cobertura en los workflows visibles.

- Prioridad: P2
- Tamaño: S
- Estimación: 3h
- Fecha de inicio prevista: 2026-03-20

---

### T-030 — [DX] Recolocar la referencia a Salesforce: de stat de hero a About/Services

- Descripción: El Home muestra "10+ Años con Salesforce" como una de las tres estadísticas del hero (producción verificada). La guía de marca §1 especifica: "Salesforce: Selectivo sin protagonismo. Capacidad Secundaria." Destacarlo en el fold inicial del hero le da protagonismo contrario al posicionamiento de marca. El hero debería reforzar el mensaje performance-first.

  **Pasos:**
  1. Eliminar o sustituir el stat "10+ Años con Salesforce" del hero por un indicador más alineado al posicionamiento principal. Opciones: "15+ proyectos auditados", "100/100 Lighthouse en 3 proyectos", "48-72h tiempo de entrega" — **decisión del desarrollador**.
  2. Mover la referencia a Salesforce a la página /about o como nota en /services bajo "capacidades adicionales".
  3. Verificar que el microcopy del hero queda coherente con §5 "Seguro y conciso. Beneficio → Prueba → CTA".

  **Criterio de aceptación:** El hero del Home no menciona Salesforce en primer plano. La página /about o /services referencia la capacidad Salesforce de forma selectiva. Las 3 estadísticas del hero refuerzan el posicionamiento performance-first.

  **Evidencia:** Producción — **verificado directamente** en HTML del home: `### 10+\n\nAños con Salesforce` como primera de las tres estadísticas del hero (seguida de "3 Proyectos propios" y "98/100 Lighthouse medio"); guia-de-marca §1 "Salesforce: Selectivo sin protagonismo. Capacidad Secundaria."

- Prioridad: P2
- Tamaño: S
- Estimación: 3h
- Fecha de inicio prevista: 2026-03-20

---

## Backlog posterior

Las siguientes tareas se excluyen del MVP. Se documentan con el motivo en una línea.

| # | Título | Motivo de exclusión |
|---|--------|---------------------|
| B-01 | Multilingüe ES/EN | Requiere arquitectura i18n completa + traducción de 25+ posts; alto coste, sin evidencia de demanda actual. |
| B-02 | Portal de cliente con autenticación | Caso de uso no definido; variables AUTH0_* en env como deuda legacy sin uso activo. |
| B-03 | Pricing de mantenimiento mensual | Pregunta abierta §14 Q8; no urgente sin base de clientes recurrentes. |
| B-04 | Sistema de comentarios en blog | Sin masa crítica de tráfico; riesgo de spam > valor percibido. |
| B-05 | Video / podcast en blog | Cambio de línea editorial; requiere infraestructura adicional. |
| B-06 | Dashboard FinOps avanzado | Roadmap de ficha; sin datos de coste reales disponibles. |
| B-07 | Sección Salesforce dedicada | Contradice guia-de-marca §1 "Selectivo sin protagonismo". |
| B-08 | RSS feed | Newsletters de T-021 cubren distribución; prioridad baja. |
| B-09 | Filtros avanzados de búsqueda | El buscador actual cubre el caso base; optimización diferible. |
| B-10 | Print stylesheet para blog | Audiencia técnico-digital; impacto mínimo. |
| B-11 | Badges Malt / LinkedIn en portfolio | Nice-to-have; sin impacto en conversión medible hasta tener tráfico. |
| B-12 | Modo oscuro CSS-only sin JS | El toggle actual funciona; complejidad alta, valor marginal. |
| B-13 | Categorías avanzadas de blog / series | Útil con 50+ posts; con 25 posts la estructura actual es suficiente. |
| B-14 | Integración Canva para exportar deliverables | Conector disponible (Canva MCP activo en sesión), pero sin caso de uso definido en el producto. |
| B-16 | Instrumentar Portfolio con Sentry | Sentry no monitoriza Portfolio actualmente (solo Utilibox); sin errores detectados. Añadir solo si se implementan Edge Functions nuevas o flujos críticos en vNext. |
