# AGENTS.md — Guía operativa para Codex (raíz del repo)

Codex debe leer este archivo antes de actuar. Reglas estables del repositorio.
Para instrucciones puntuales de una issue concreta, usa el prompt del usuario.

Nota de alcance: Codex aplica el `AGENTS.md` **más cercano** a los archivos que modifica. Si hay `AGENTS.md` en subcarpetas, esos prevalecen para cambios en dichas rutas.

---

## 1) Fuentes de verdad (orden de prioridad)

1. **Working tree actual**: archivos reales del repo en esta sesión (lo que hay en disco).
2. **Docs del repo**: `docs/*` (especialmente PDFs como *GUIA DE IMAGEN DE MARCA.pdf* y *MVP.pdf*).
3. **Issue real de GitHub** obtenida por comandos a partir del **ID** que proporcione el usuario.
4. **Texto pegado por el usuario** (fallback si no se puede obtener la issue).

Si detectas conflicto entre instrucciones, prioriza:
`AGENTS.md` más cercano > `AGENTS.md` raíz > prompt del usuario > inferencias.

---

## 2) Principios no negociables

### 2.1 Working tree real (NO memoria / NO invenciones)
- NO asumas nada por “memoria”.
- Lee SIEMPRE los archivos reales antes de proponer o aplicar cambios.
- NO inventes rutas, scripts, configuraciones, APIs internas ni resultados.

### 2.2 Cambios mínimos, con criterio experto
Regla base: implementa **la solución más pequeña que cumpla** la issue con **alta confianza** y sin romper el repo.
- Evita refactors grandes, cambios de arquitectura, renombrados masivos o reformateos globales.
- Mantén coherencia con patrones existentes.

Excepción con criterio (permitida, pero justificada):
- Si una alternativa “mínima” es claramente peor (más frágil, más riesgo de regresión, más deuda, incumple patrones del repo),
  puedes elegir una solución ligeramente más amplia **si reduce riesgo o mejora calidad** de forma material.
- En ese caso, limita el alcance, explica el trade-off y deja claro por qué es “el mínimo seguro” (no el mínimo absoluto).

### 2.3 Verificación real (no inventar resultados)
- NO afirmes que algo “compila”, “pasa tests” o “pasa lint” si no lo has verificado ejecutando comandos reales.
- Si el entorno impide ejecutar comandos, indícalo explícitamente y compensa con verificación estática (explicando riesgos).

### 2.4 `docs/*` es vinculante cuando aplica
- Antes de responder/decidir sobre UI, copy, branding, contenido, producto o criterios funcionales, inspecciona `docs/*`.
- Si hay PDFs relevantes (brand/MVP), debes leerlos (extraer texto) y alinear la solución con sus reglas.
- Si `docs/*` contradice una práctica del código, prioriza: **docs** para decisiones de producto/branding, **código** para implementación técnica; documenta la discrepancia.

---

## 3) Flujo de trabajo esperado (alto nivel)

### 3.1 Preparación (repo)
Ejecuta y registra:
- `git status`
- `git rev-parse HEAD`
- `git remote -v`
- `git branch --show-current` (informativo)
- `git fetch --all --prune`

Si el working tree está sucio por cambios no relacionados, DETENTE y explica el riesgo antes de continuar.

### 3.2 Inspección de `docs/*` (cuando aplique)
- Lista contenido: `ls -la docs || true`
- Identifica documentos relevantes según la issue (UI/branding/producto ⇒ casi siempre).
- Si hay PDFs, extrae texto (elige una):
  - `python -c "import sys, pathlib; from pypdf import PdfReader; p=pathlib.Path('docs/<archivo>.pdf'); r=PdfReader(str(p)); print('\\n'.join(page.extract_text() or '' for page in r.pages))"`
  - o `pdftotext "docs/<archivo>.pdf" - | sed -n '1,200p'` (si disponible)
- Usa lo aprendido para guiar decisiones (nombres, tono, UI, requisitos funcionales).

### 3.3 Issue como fuente (obtener desde GitHub por ID)
El usuario te dará **solo el ID**. Debes obtener la issue por comandos.

Preferencia: GitHub CLI (`gh`).
- Si no existe, instálalo (p. ej. con el gestor disponible en el sistema).
- Si requiere autenticación, PIDE al usuario hacer *Device Activation* y ejecuta:
  - `gh auth login -p https -h github.com`
  - `gh auth status`

Luego:
- `gh repo view --json nameWithOwner -q .nameWithOwner` (si aplica)
- `gh issue view <ID> --json title,body,labels,assignees,number,url -q '{title: .title, body: .body, number: .number, url: .url}'`

Si no puedes obtener la issue: explica el motivo y usa el texto pegado por el usuario como fallback.

### 3.4 Gestor de paquetes (detección obligatoria)
Detecta el gestor:
- `pnpm-lock.yaml` => pnpm
- `yarn.lock` => yarn
- `package-lock.json` => npm

Usa el gestor detectado para instalar/ejecutar scripts (evita comandos destructivos).
- Ejemplos: `pnpm install`, `yarn install`, `npm ci` (solo si corresponde y es seguro con el repo)

### 3.5 Implementación, verificación y pipeline de ramas (dev → staging → main)

#### 3.5.1 Rama de trabajo: **dev**
Objetivo: dejar la solución implementada y verificada, y **hacer commit + push a `dev`**.

Pasos:
1. Asegura que existen las ramas esperadas:
   - `git branch -a | sed -n '1,200p'`
   - Si `dev`, `staging` o `main` no existen o el repo usa otras convenciones, PREGUNTA y ajusta.
2. Cambia a `dev` y actualiza:
   - `git checkout dev`
   - `git pull --rebase origin dev`
3. Implementa cambios (siguiendo §§2–4).
4. Ejecuta verificación según scripts reales del repo:
   - inspecciona `package.json` y ejecuta los scripts relevantes (p. ej. `lint`, `typecheck`, `test`, `build`).
5. Commit (mensaje claro y vinculado a la issue). Ejemplo:
   - `git add -A`
   - `git commit -m "fix: <resumen> (refs #<ID>)"`
6. Push a `dev`:
   - `git push origin dev`

Entrega tras push:
- Proporciona una **batería corta de pruebas** (3–7) realmente útiles para que el usuario valide.
- DETENTE y espera el **OK explícito** del usuario antes de crear PR.

#### 3.5.2 PR: **dev → staging**
Tras el OK del usuario:
1. Crea PR con `gh`:
   - `gh pr create --base staging --head dev --title "<título>" --body "<descripción>\n\nResuelve #<ID>"`
2. Si hay conflictos:
   - Resuélvelos de forma segura (preferencia: rebase de `dev` sobre `staging` o merge controlado según práctica del repo).
   - Vuelve a ejecutar verificación mínima y actualiza el PR.
3. Espera checks/CI:
   - `gh pr checks --watch` (si disponible)
   - o `gh run list` / `gh run view` para detalles

Decisión:
- Si todo está en verde: **squash & merge**:
  - `gh pr merge --squash --delete-branch=false`
- Si falla algo: PREGUNTA al usuario qué hacer:
  - “Intento arreglar los fallos” vs “squash & merge igualmente”.
  - No fuerces merges ignorando CI sin instrucción del usuario.

Tras merge a staging:
- Invita al usuario a probar en el entorno asociado a `staging` con otra batería corta de pruebas (3–7).
- Espera OK explícito.

#### 3.5.3 PR: **staging → main**
Tras el OK del usuario en staging:
- Repite la misma lógica:
  - `gh pr create --base main --head staging ... Resuelve #<ID>`
  - Resuelve conflictos si existen
  - Espera CI
  - Si verde: `gh pr merge --squash --delete-branch=false`
  - Si falla: pregunta al usuario qué hacer

---

## 4) Política de tests
Antes de crear o modificar tests, determina si ya existe base de tests. Señales:
- script `test` en `package.json`,
- dependencias/frameworks (vitest/jest/mocha/playwright/cypress, etc.),
- carpetas típicas (`tests/`, `__tests__/`, `e2e/`) o configuración asociada.

Reglas:
- Si **SÍ** hay base: actualiza/crea tests SOLO para el cambio de la issue.
- Si **NO** hay base: NO introduzcas infraestructura nueva. Omite tests y deja una nota breve.

---

## 5) SemVer / Versionado (obligatorio)

### 5.1 Scripts obligatorios en package.json
Antes de implementar una issue, asegura que existan (y si faltan, créalos) estos scripts en el `package.json` que controle la versión del entregable:

```json
"bump:patch": "npm version patch --no-git-tag-version",
"bump:minor": "npm version minor --no-git-tag-version",
"bump:major": "npm version major --no-git-tag-version"
```

Notas:

- Ejecuta los scripts vía el gestor detectado (pnpm run, yarn run, npm run).
- Tras cualquier bump, revisa git diff e incluye package.json y lockfiles afectados.

### 5.2 Reglas de ejecución (estrictas)
- MAJOR: ejecutar bump:major SOLO cuando el usuario indique explícitamente que se inicia nueva versión de producción.
- MINOR: ejecutar bump:minor al empezar a resolver una nueva issue, siempre que NO aplique MAJOR.
- PATCH: ejecutar bump:patch SOLO cuando, dentro de la misma issue/PR, el usuario pida ajustes tras revisar la solución (una vez por ronda).

## 6) Pruebas manuales (obligatorio en la salida)
En cada entrega al usuario (tras push a dev, tras merge a staging, tras merge a main), incluye SIEMPRE “Pruebas manuales recomendadas” con:

- Pruebas ejecutables “como usuario” (UI/UX) cuando aplique.
- Cobertura mínima:
-- Validación directa del cambio.
-- Regresión mínima en flujos cercanos.
- Cantidad orientativa: 3–7 (corta, de alto valor).
- Formato por prueba:
-- Precondición (si aplica)
-- Pasos
-- Resultado esperado

## 7) Comunicación (modo mentor, orientado a aprendizaje)
Objetivo: que el usuario aprenda Astro (y tecnologías tocadas) a partir de la issue, sin ruido.

En cada entrega relevante, incluye una sección “Aprendizaje (Astro/stack)” con:

- Mapa mental del cambio: qué partes del stack participaron (Astro/Netlify/GitHub Actions/Node, etc.).
- Conceptos clave (3–6 bullets): lo mínimo para entender el porqué del enfoque.
- Lectura guiada del diff:
-- 2–4 puntos que indiquen dónde mirar (archivos/funciones) y qué observar.
- Decisiones y trade-offs:
-- por qué esta solución es el “mínimo seguro”,
-- 1 alternativa razonable y por qué no se eligió.
- Ejercicios rápidos (opcional, 1–2):
-- una micro-tarea para reforzar (p. ej., “cambia X y observa Y”, “ejecuta este comando y verifica Z”).
- Mantén esta sección concreta: foco en lo que se ha tocado, sin teoría genérica.

## 8) Formato de salida (siempre, orientado a pipeline)
Estructura cada respuesta de estado con estas secciones (en este orden):

1. Contexto verificado del repo
- SHA base, rama actual, resumen de git status
- Cómo obtuviste la issue (GitHub directo o fallback + motivo)
- Docs de docs/* consultados (si aplica)
2. Resumen ejecutivo
- Qué se resolvió y por qué el enfoque es el mínimo seguro
3. Criterios de aceptación
- Checklist verificable (si no existía, proponer mínimos razonables)
4. Cambios realizados
- Por bloques lógicos / archivos principales
5. Verificación ejecutada
- Comandos exactos + resultado/resumen (o limitaciones)
6. Pruebas manuales recomendadas
- 3–7 pruebas de alto valor
7. Estado Git / PR
- Tras push a dev: commit(s), enlace o referencia, y “Esperando OK del usuario”
- Tras crear PR: URL del PR, estado de checks, resolución de conflictos si hubo
- Tras merge: confirmación, y el siguiente paso (pruebas del usuario)
8. Aprendizaje (Astro/stack)
- Según §7

## 9) Seguridad y límites
- No expongas secretos ni tokens.
- No ejecutes comandos peligrosos o irreversibles sin justificar y avisar.
- No añadas dependencias nuevas salvo necesidad clara y mínima; si se añaden, justificar.
- Si necesitas login (GitHub u otros), solicita al usuario Device Activation y procede con el flujo estándar.