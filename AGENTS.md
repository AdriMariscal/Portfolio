# AGENTS.md — Universal Cursor Agent (Astro Projects)

> Archivo único reutilizable en todos los proyectos. Todos los proyectos usan **Astro** como base, con tecnologías adicionales según necesidad.

---

## 0) Triggers de conversación → qué hacer exactamente

Este bloque mapea frases del usuario a flujos concretos. Léelo PRIMERO.

| Frase del usuario (ejemplos) | Flujo a ejecutar |
|---|---|
| "Resuelve la issue #X de Y" / "Necesito que resuelvas la issue #X" | **Flujo A — Nueva Issue** |
| "[Ajustes/correcciones] que necesito en la issue en review…" | **Flujo B — Ajuste post-review** |
| "Issue resuelta" / "Todo OK, cierra la issue" | **Flujo C — Cierre y merge a staging** (termina en `staging`; NO toca `main`) |
| "Empezamos nuevo MVP resolviendo la issue #X" / "Nueva versión major con #X" | **Flujo D — Inicio de MVP (nueva versión major)** |
| "MVP terminado, vamos a producción" / "A producción" | **Flujo E — Deploy a producción** |
| CI KO en cualquier PR | **Flujo F — CI roto** (ver §3.5) |

> ℹ️ **Modelo recomendado por flujo** (el usuario lo selecciona en Cursor):
> - **Flujos A, D**: Claude Sonnet (versión más reciente disponible en Cursor en el momento de ejecución).
> - **Flujo B**: Claude Sonnet en modo Cursor (si disponible), o el modelo equivalente más capaz para cambios de código de precisión.
> - **Flujos C, E**: cualquier modelo; son principalmente operaciones Git/GitHub.

---

## 1) Fuentes de verdad (orden de prioridad)

1. **Working tree actual** — archivos reales en disco en esta sesión.
2. **`docs/*`** — documentación del repo (brand, producto, guías).
3. **Issue real de GitHub** — obtenida por comandos a partir del ID que proporciona el usuario.
4. **Internet / fuentes oficiales** — **siempre permitido** consultar documentación oficial, changelogs, RFCs o MDN para validar APIs, sintaxis, mejores prácticas actuales y compatibilidad de tecnologías.
5. **Texto pegado por el usuario** — fallback si no se puede obtener la issue.

Conflictos de instrucciones: `AGENTS.md` más cercano > `AGENTS.md` raíz > prompt del usuario > inferencias.

---

## 2) Principios no negociables

### 2.1 Working tree real (NO memoria, NO invenciones)
- Lee SIEMPRE los archivos reales antes de proponer o aplicar cambios.
- NO inventes rutas, scripts, configuraciones, APIs internas ni resultados.
- NO afirmes que algo "compila", "pasa tests" o "pasa lint" sin haberlo ejecutado.

### 2.2 Cambios mínimos, con criterio experto
- Regla base: **la solución más pequeña que cumpla la issue con alta confianza y sin romper el repo**.
- Evita refactors grandes, renombrados masivos o reformateos globales no pedidos.
- Mantén coherencia con los patrones existentes.
- Excepción justificada: si la solución mínima absoluta es claramente más frágil o acumula deuda, puedes elegir una solución ligeramente más amplia — pero explica el trade-off y limita el alcance.

### 2.3 Verificación real
- Si el entorno impide ejecutar comandos, indícalo explícitamente y compensa con verificación estática (explicando riesgos).

### 2.4 `docs/*` es vinculante cuando aplica
- Antes de decidir sobre UI, copy, branding, contenido o criterios funcionales, lista e inspecciona `docs/*`.
- Lee solo los archivos relevantes para la issue en cuestión — no satures la ventana de contexto con documentación irrelevante.
- Si `docs/*` contradice el código: **docs** para decisiones de producto/branding; **código** para implementación técnica. Documenta la discrepancia.

### 2.5 Tecnología: elegir con criterio
- Usa las tecnologías ya presentes en el proyecto cuando sean adecuadas.
- Si la issue tiene particularidades que hacen que una tecnología nueva sea claramente mejor, puedes proponerla y añadirla, siempre que:
  - Haga buen "maridaje" con el stack existente (Astro-first).
  - Justifiques brevemente por qué es preferible.
  - La adición sea mínima y no introduzca riesgo innecesario.

### 2.6 Limpieza obligatoria al finalizar
Al completar cualquier issue (antes del último commit), elimina **todos los archivos temporales que hayas creado para uso interno** durante la resolución (borradores, análisis intermedios, notas de trabajo, scripts de un solo uso, etc.). El repo debe quedar limpio de artefactos del agente.

---

## 3) Flujos de trabajo detallados

### Flujo A — Nueva Issue (`npm version minor`)

**Trigger:** "Resuelve la issue #X de Y" o similar.

#### A.1 — Preparación del repo
```bash
git status
git rev-parse HEAD
git remote -v
git branch --show-current
git fetch --all --prune
```
Si el working tree está sucio por cambios no relacionados, DETENTE y explica el riesgo.

#### A.2 — Inspección de `docs/*`
```bash
ls -la docs || true
```
- Identifica los archivos relevantes para esta issue (como mínimo suele haber uno sobre el proyecto y uno de guía de marca).
- Lee solo los necesarios; no cargues todo si no aporta a la issue.
- Si hay PDFs:
  ```bash
  python -c "import pathlib; from pypdf import PdfReader; p=pathlib.Path('docs/<archivo>.pdf'); r=PdfReader(str(p)); print('\n'.join((page.extract_text() or '') for page in r.pages))"
  # o si disponible:
  pdftotext "docs/<archivo>.pdf" - | sed -n '1,200p'
  ```

#### A.3 — Obtener la issue desde GitHub
Preferencia: GitHub CLI (`gh`). Si no está instalado, instálalo.

```bash
gh issue view <ID> --json title,body,labels,assignees,number,url,repository \
  -q '{title: .title, body: .body, number: .number, url: .url, repo: .repository.nameWithOwner}'
```

Si requiere autenticación:
```bash
gh auth login -p https -h github.com
gh auth status
```

Fallback si no se puede obtener: usa el texto pegado por el usuario; explica el motivo.

#### A.4 — Actualizar estado en GitHub Project → "In Progress"
Actualiza inmediatamente antes de tocar código:
- Estado: **"In Progress"**
- Fecha Inicio: `TZ=Europe/Madrid date +%F`

Implementación (best effort — si no funciona, no bloquees el desarrollo):
1. Obtén `issueNodeId` y `projectItems` vía GraphQL.
2. Para cada project, obtén `fields(first: 50)` con `id`, `name` y opciones de single-select.
3. Resuelve `statusFieldId` + `statusOptionId` para "In Progress" y `startDateFieldId`.
4. Aplica mutations `updateProjectV2ItemFieldValue`.
5. Verifica re-leyendo el item.

Campos tolerantes a variantes (case-insensitive):
- Estado: `Status`, `Estado`
- Fecha inicio: `Fecha Inicio`, `Start Date`, `Inicio`
- Fecha fin: `Fecha Fin`, `End Date`, `Fin`

#### A.5 — Versionado: `bump:minor`
Asegura que existen estos scripts en el `package.json` que versiona el artefacto (si hay varios, usa el del artefacto publicado; si no está claro, pregunta):

```json
"bump:patch": "npm version patch --no-git-tag-version",
"bump:minor": "npm version minor --no-git-tag-version",
"bump:major": "npm version major --no-git-tag-version"
```

Ejecuta bump:
```bash
<gestor> run bump:minor
```

Incluye `package.json` y lockfiles afectados en el commit.

Actualiza `docs/devlog-v<MAJOR>.md` con una nueva sección (ver §6.3).

#### A.6 — Detección del gestor de paquetes
```
pnpm-lock.yaml  → pnpm
yarn.lock       → yarn
package-lock.json → npm
```
Usa el detectado en todos los comandos subsiguientes.

#### A.7 — Implementación
1. `git checkout dev && git pull --rebase origin dev`
2. Implementa la solución siguiendo §§2 y 2.5.
3. Consulta internet para validar APIs, sintaxis o mejores prácticas cuando sea necesario.
4. Actualiza o crea tests si aplica (ver §5).
5. Verifica con los scripts reales del repo (lint, typecheck, test, build según `package.json`).
6. Si hay configuración externa necesaria (Netlify, Sentry, etc.) ver §4 — genera el prompt correspondiente antes de hacer commit.
7. Elimina archivos temporales de trabajo del agente (ver §2.6).
8. Commit y push:
   ```bash
   git add -A
   git commit -m "feat: <resumen> (refs #<ID>)"
   git push origin dev
   ```
9. Mueve la issue en Project a **"In Review"** (best effort).

#### A.8 — Entrega tras push a dev
- Incluye batería de pruebas manuales (3–7, ver §7).
- Incluye sección de aprendizaje (ver §8).
- **DETENTE. Espera OK explícito del usuario** antes de avanzar.
- El usuario ejecutará `npm run dev` y hará sus pruebas.

---

### Flujo B — Ajuste post-review (`npm version patch`)

**Trigger:** El usuario indica ajustes sobre una issue que está "In Review".

1. Mueve la issue en Project a **"In Progress"** (best effort).
2. Ejecuta `bump:patch` (una sola vez por ronda de ajustes).
3. Implementa **solo los cambios pedidos**, tocando lo mínimo posible. No aproveches para refactorizar nada más.
4. Actualiza `docs/devlog-v<MAJOR>.md` si el patch es relevante (corrección visible, hotfix — ver §6.3).
5. Verifica, limpia artefactos temporales, commit y push a `dev`:
   ```bash
   git commit -m "fix: <resumen ajuste> (refs #<ID>)"
   git push origin dev
   ```
6. Mueve la issue en Project a **"In Review"** (best effort).
7. **DETENTE. Espera nuevo OK del usuario.**

---

### Flujo C — Cierre y merge a staging

**Trigger:** "Issue resuelta" / "Todo OK, cierra la issue" o similar.

#### C.1 — PR dev → staging
```bash
gh pr create --base staging --head dev \
  --title "<título>" \
  --body "<descripción>\n\nResuelve #<ID>"
```

#### C.2 — Conflictos
Si hay conflictos, resuélvelos de forma segura (preferencia: rebase de `dev` sobre `staging`). Re-ejecuta verificación mínima y actualiza el PR.

#### C.3 — CI / Checks
```bash
gh pr checks --watch
# o:
gh run list && gh run view <run-id>
```

- ✅ Verde: squash & merge:
  ```bash
  gh pr merge --squash --delete-branch=false
  ```
- ❌ Rojo: **Flujo F** (ver abajo).

#### C.4 — Sincronización de ramas tras merge a staging
Tras el merge, asegúrate de que `dev` y `staging` son **idénticas** tanto en remoto como en local:
```bash
git checkout staging && git pull origin staging
git checkout dev && git rebase origin/staging
git push origin dev --force-with-lease
# Verificar:
git diff staging dev   # debe estar vacío
```

#### C.5 — Cierre de la issue
```bash
gh issue close <ID>
```
Mueve la issue en Project a **"Done"** + Fecha Fin = TODAY (best effort).

> ⚠️ **LÍMITE DE FLUJO C — STOP AQUÍ.** El trabajo de esta issue termina en este paso. NO crees ninguna PR hacia `main`, NO ejecutes ningún paso de Flujo E. La promoción a `main` es exclusiva de Flujo E y requiere trigger explícito del usuario ("MVP terminado" / "A producción").

#### C.6 — Entrega
- Invita al usuario a probar en el entorno de staging (batería 3–7 pruebas).
- Espera OK.

---

### Flujo D — Inicio de MVP (`npm version major`)

**Trigger:** "Empezamos nuevo MVP resolviendo la issue #X" o similar.

#### D.0 — Sincronización total de ramas (OBLIGATORIO antes de cualquier cambio)

`main` tiene la última palabra. Antes de tocar código, asegúrate de que `staging` y `dev` son **idénticas** a `main`:

```bash
# 1. Obtén el estado real del remoto
git fetch --all --prune

# 2. Verifica si hay divergencias
git diff origin/main origin/staging   # debe estar vacío
git diff origin/main origin/dev       # debe estar vacío
```

Si alguna comparación **no está vacía**, aplica la sincronización forzada desde `main`:

```bash
# Sincronizar staging → main
git checkout staging && git pull origin staging
git rebase origin/main
git push origin staging --force-with-lease

# Sincronizar dev → main
git checkout dev && git pull origin dev
git rebase origin/main
git push origin dev --force-with-lease

# Verificación final (ambos diffs deben estar vacíos)
git diff origin/main origin/staging
git diff origin/main origin/dev
```

> ⚠️ Si el rebase produce conflictos, resuélvelos manteniendo siempre la versión de `main` como base de verdad. Si los conflictos son complejos, **DETENTE e informa al usuario** antes de continuar.

Solo cuando los tres diffs estén vacíos, continúa con los pasos siguientes.

#### D.1 — Continuación del flujo

1. Ejecuta **Flujo A** completo, con estas diferencias:
   - En lugar de `bump:minor`, ejecuta `bump:major`.
   - Crea (si no existe) `docs/devlog-v<MAJOR>.md` con el esqueleto (ver §6.3).
   - Añade la entrada inicial del major en el devlog.
2. El resto del flujo (implementar, verificar, commit, push, pruebas) igual que Flujo A.

---

### Flujo E — Deploy a producción

**Trigger:** "MVP terminado, vamos a producción" o similar.

#### E.1 — PR staging → main
```bash
gh pr create --base main --head staging \
  --title "Release v<VERSION>" \
  --body "Deploy a producción — incluye todos los cambios del MVP v<MAJOR>.x"
```

La PR debe incluir automáticamente todos los commits y PRs que llevaron cambios a staging durante el MVP.

#### E.2 — Conflictos, CI y merge
Igual que C.2 y C.3 pero con base `main`.

- ✅ Verde: squash & merge:
  ```bash
  gh pr merge --squash --delete-branch=false
  ```
- ❌ Rojo: **Flujo F**.

#### E.3 — Sincronización total de ramas
Tras el merge a main, asegúrate de que `main`, `staging` y `dev` son **idénticas** en remoto y local:
```bash
git checkout main && git pull origin main
git checkout staging && git rebase origin/main && git push origin staging --force-with-lease
git checkout dev && git rebase origin/main && git push origin dev --force-with-lease
# Verificar:
git diff main staging   # vacío
git diff main dev       # vacío
```

---

### Flujo F — CI roto

**Trigger:** Checks/CI en KO en cualquier PR.

1. Informa al usuario qué check(s) han fallado y por qué (con la traza relevante).
2. Pregunta explícitamente:
   > "¿Quieres que intente resolver el fallo, o continuamos con la PR igualmente?"
3. Si el usuario dice **"resolver"**: vuelve a Flujo B (patch, mínimos cambios, nuevo push).
4. Si el usuario dice **"continuar"**: ejecuta el merge ignorando CI con justificación explícita.

---

## 4) Configuración externa (Netlify / Sentry / otros)

Cuando parte de la solución requiera configuración fuera del repo (variables de entorno en UI, DNS, alertas, etc.):

### 4.1 Qué hacer primero en el repo
Implementa **todo lo que sea versionable**: `netlify.toml`, `_redirects`, `_headers`, variables como placeholders en `.env.example`, etc. Nunca inventes secretos reales.

### 4.2 Para lo que no se puede resolver con código

**Paso 1 — Determina si existe conector en Claude.ai:**

Actualmente confirmados: **Netlify**, **Sentry**.

> Antes de generar el prompt, comprueba si en el momento de ejecución hay nuevos conectores disponibles en Claude.ai (la lista puede haber crecido). Si detectas uno relevante para la issue, indícalo al usuario.

**Paso 2a — Si hay conector en Claude.ai:**

Genera un prompt completo y listo para ejecutar en **Claude.ai con el conector activado**. El prompt debe contener:
- Contexto exacto del proyecto y la issue.
- Qué configuración hacer, en qué servicio, con qué valores exactos (o placeholders con instrucción de cómo obtenerlos).
- Cómo verificar que la configuración quedó correcta.
- Formato: instrucciones operativas paso a paso.

**Paso 2b — Si NO hay conector en Claude.ai:**

Genera un prompt completo para ejecutar en **ChatGPT en modo Agente**. El prompt debe ser lo suficientemente preciso para que ChatGPT realice la configuración de forma autónoma. Incluye:
- Servicio, credenciales necesarias (con placeholders), pasos exactos.
- Resultado esperado verificable.

**Paso 3 — Fallback manual (siempre incluir):**

Aunque esperas que los pasos anteriores funcionen, incluye igualmente las instrucciones manuales detalladas para que el usuario pueda hacerlo por su cuenta si fuera necesario. Formato:
1. Contexto: qué bloquea la solución y por qué no es código puro.
2. Impacto: qué queda degradado si no se aplica.
3. Pasos manuales agrupados por servicio (UI, campos, valores).
4. Verificación: cómo comprobar que quedó bien.
5. Placeholders: `<SENTRY_DSN>`, `<NETLIFY_SITE_ID>`, etc., con instrucción de dónde obtenerlos.

---

## 5) Política de tests

Antes de tocar tests, detecta si existe base:
- Script `test` en `package.json`.
- Dependencias de testing (vitest, jest, playwright, cypress, mocha, etc.).
- Carpetas típicas: `tests/`, `__tests__/`, `e2e/`.

Reglas:
- **Si SÍ hay base**: crea o actualiza tests para cubrir el cambio de la issue. No tests porque sí, pero tampoco dejes funcionalidad nueva sin cobertura.
- **Si NO hay base**: NO introduzcas infraestructura nueva. Omite y deja una nota breve.
- Siempre ejecuta los tests existentes antes del commit para confirmar que no hay regresiones.

---

## 6) SemVer y Versionado

### 6.1 Scripts obligatorios en `package.json`
Si no existen, créalos antes de empezar cualquier issue:

```json
"bump:patch": "npm version patch --no-git-tag-version",
"bump:minor": "npm version minor --no-git-tag-version",
"bump:major": "npm version major --no-git-tag-version"
```

Usa siempre el gestor detectado: `pnpm run`, `yarn run` o `npm run`.
Tras cualquier bump, incluye `package.json` y lockfiles en el commit.

### 6.2 Reglas estrictas de ejecución

| Cuándo | Script |
|---|---|
| Inicio de nuevo MVP (Flujo D) | `bump:major` |
| Nueva issue (Flujo A) | `bump:minor` |
| Ajuste post-review (Flujo B) | `bump:patch` (una vez por ronda) |

### 6.3 Diario de desarrollo (`docs/devlog-v<MAJOR>.md`)

**Creación** (al ejecutar `bump:major`):
1. Lee la versión resultante: `node -p "require('./package.json').version"`.
2. Crea `docs/devlog-v<MAJOR>.md` si no existe, con el esqueleto:

```md
# Diario de desarrollo — v<MAJOR>.x

Notas rápidas de cambios durante el desarrollo de la línea major v<MAJOR>.
Regla: todas las versiones MINOR se registran; PATCH solo cuando aporte.

## v<MAJOR>.0.0 — YYYY-MM-DD
- Inicio de la línea major v<MAJOR> (bump:major).
- Motivo: <1 frase>
```

**Actualización al ejecutar `bump:minor`** (obligatorio):
```md
## v<MAJOR>.<MINOR>.0 — YYYY-MM-DD
- <bullet 1: cambio principal, orientado al usuario>
- <bullet 2: otro cambio relevante>
- <bullet 3: decisión técnica destacada si aplica>
- Refs: #<ID-issue> / <URL-PR>
```
Máximo 3–7 bullets, sin diffs ni trazas. Foco en comportamiento de usuario, riesgos y decisiones de producto.

**Actualización al ejecutar `bump:patch`** (solo si el patch es relevante — hotfix, corrección visible):
```md
  - Patch v<MAJOR>.<MINOR>.<PATCH> — <resumen corto>
```
Anidado bajo la última sección MINOR activa. Si no aporta, no escribas nada.

---

## 7) Pruebas manuales (obligatorio en cada entrega)

En cada entrega (push a dev, merge a staging, merge a main) incluye **"Pruebas manuales recomendadas"**:

- 3–7 pruebas de alto valor.
- Orientadas al usuario (UI/UX cuando aplique), no al código.
- Por cada prueba:
  - **Precondición** (si aplica)
  - **Pasos**
  - **Resultado esperado**

Cubre siempre: (1) validación directa del cambio, (2) regresión mínima en flujos adyacentes.

---

## 8) Comunicación — Modo mentor

En cada entrega relevante, incluye una sección **"Aprendizaje (Astro/stack)"**:

- **Mapa del cambio**: qué partes del stack participaron (Astro, Netlify, GitHub Actions, etc.).
- **Conceptos clave** (3–6 bullets): lo mínimo para entender el porqué del enfoque.
- **Lectura guiada del diff**: 2–4 puntos — dónde mirar y qué observar.
- **Decisiones y trade-offs**: por qué este enfoque, 1 alternativa razonable y por qué no se eligió.
- **Ejercicios rápidos (opcional, 1–2)**: micro-tarea para reforzar (ej. "cambia X y observa Y").

Mantén la sección concreta: foco en lo tocado, sin teoría genérica.

---

## 9) Formato de salida (siempre, en este orden)

1. **Contexto verificado del repo** — SHA base, rama, resumen de `git status`, cómo se obtuvo la issue, docs consultados.
2. **Estado de Issue/Project** — Projects detectados, campos encontrados, actualización aplicada (o motivo si falló).
3. **Resumen ejecutivo** — Qué se resolvió y por qué el enfoque es el mínimo seguro.
4. **Criterios de aceptación** — Checklist verificable (proponer mínimos si no existían).
5. **Cambios realizados** — Por bloques lógicos / archivos principales.
6. **Verificación ejecutada** — Comandos exactos + resultado o limitaciones.
7. **Configuración externa pendiente (si aplica)** — Prompt para Claude.ai (con conector) o ChatGPT Agente, + fallback manual.
8. **Pruebas manuales recomendadas** — 3–7 de alto valor.
9. **Estado Git / PR** — Commits, URL de PR, estado de checks, siguiente paso.
10. **Aprendizaje (Astro/stack)** — Según §8.

---

## 10) Seguridad y límites

- No expongas secretos ni tokens en ningún archivo ni log.
- No ejecutes comandos destructivos o irreversibles sin justificar y avisar.
- No añadas dependencias nuevas salvo necesidad clara; si se añaden, justifícalas.
- Cursor puede instalar en local lo que necesite (gh, astro, dependencias de dev, etc.) para ejecutar y resolver issues.
- Si necesitas autenticación (GitHub u otros), solicita al usuario Device Activation y procede con el flujo estándar.
- Nunca fuerces merges ignorando CI sin instrucción explícita del usuario.