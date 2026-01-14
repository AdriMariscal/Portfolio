# AGENTS.md — Instrucciones persistentes para Codex (este repositorio)

Codex lee este archivo antes de trabajar y lo usa como guía del proyecto. Mantén aquí reglas estables del repositorio.  
Para instrucciones “de una sola vez” (por ejemplo, una issue concreta), usa el prompt del usuario.

Nota: Codex aplica la guía del `AGENTS.md` **más cercano** a los archivos que modifica. Si este repo tiene subcarpetas con su propio `AGENTS.md`, ese tendrá prioridad para esos cambios.

---

## 1) Prioridad de fuentes (orden de verdad)

1. El código real del working tree actual (archivos del repo en esta sesión).
2. La issue real obtenida desde GitHub (si es posible).
3. El texto de la issue que pegue el usuario (fallback).

Si detectas conflicto entre instrucciones, explica la discrepancia y prioriza:
- `AGENTS.md` más cercano > este `AGENTS.md` raíz > prompt del usuario.

---

## 2) Principios no negociables

### 2.1 Working tree real (NO memoria)
- No asumas contenido por “memoria”.
- Lee SIEMPRE los archivos reales antes de proponer o aplicar cambios.
- No inventes rutas, scripts, configuraciones o APIs internas: verifica en el código.

### 2.2 Cambios mínimos y enfocados
- Evita refactors grandes, cambios de arquitectura, renombrados masivos o reformateos globales.
- Implementa lo estrictamente necesario para resolver la issue.
- Mantén coherencia con los patrones existentes del repo.

### 2.3 Verificación real (no inventar resultados)
- No afirmes que algo “compila”, “pasa tests” o “pasa lint” si no lo has verificado ejecutando comandos reales.
- Si el entorno impide ejecutar comandos, indícalo explícitamente y compensa con verificación estática (explicando riesgos).

---

## 3) Flujo de trabajo esperado (alto nivel)

### 3.1 Preparación
- Confirma contexto con:
  - `git status`
  - `git rev-parse HEAD`
  - `git remote -v`
  - `git branch --show-current` (informativo)
- Si el working tree está sucio por cambios no relacionados, detente y explica el riesgo antes de continuar.

### 3.2 Gestor de paquetes
Detecta el gestor de paquetes (en orden típico):
- `pnpm-lock.yaml` => pnpm
- `yarn.lock` => yarn
- `package-lock.json` => npm

Usa el gestor detectado para instalar/ejecutar scripts (evita comandos destructivos).

### 3.3 Issue como fuente
- Intenta leer la issue desde GitHub si hay tooling disponible (por ejemplo `gh issue view <ID>`).
- Si no es posible: documenta el motivo (permisos, herramienta no disponible, repo no configurado, etc.) y usa el texto proporcionado por el usuario como fallback.

### 3.4 Implementación y verificación
- Implementa cambios quirúrgicos y consistentes con el repo.
- Ejecuta verificación según scripts existentes en `package.json` (por ejemplo `lint`, `typecheck`, `build`, `test` si existen).
- Si algo falla: corrige y repite verificación.

### 3.5 Pull Request
- Mantén el estilo/plantilla de PR que ya use el repo (si existe).
- Incluye obligatoriamente una línea que enlace la issue:
  - `Resuelve #<ID>`

---

## 4) Política de tests

Antes de crear o modificar tests, determina si **ya existe base de tests**. Señales típicas:
- script `test` en `package.json`,
- dependencias/frameworks de test (vitest/jest/mocha/playwright/cypress, etc.),
- carpetas típicas (`tests/`, `__tests__/`, `e2e/`) o configuración asociada.

Reglas:
- Si **SÍ** hay base: actualiza/crea tests SOLO para el cambio de la issue.
- Si **NO** hay base: NO introduzcas infraestructura ni base de tests. Omite tests y deja una nota breve explicando que no existe base todavía.

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
- Usa los scripts (`npm run bump:*`) para evitar tags automáticos.
- Tras cualquier bump, revisa `git diff` e incluye `package.json` y lockfiles afectados.

### 5.2 Reglas de ejecución (estrictas)
- **MAJOR**: ejecutar `npm run bump:major` una única vez SOLO cuando el usuario indique explícitamente que se inicia una nueva versión de producción.
- **MINOR**: ejecutar `npm run bump:minor` al empezar a resolver una nueva issue, siempre que NO aplique MAJOR.
- **PATCH**: ejecutar `npm run bump:patch` SOLO cuando, dentro de la misma issue/PR, el usuario pida ajustes tras revisar la solución (una vez por ronda de ajustes solicitada).

---

## 6) Pruebas manuales (obligatorio en el resumen final)

En la respuesta final, incluye SIEMPRE una sección **“Pruebas manuales recomendadas”** con:
- Pruebas ejecutables “como usuario” desde la web/UI del producto.
- Cobertura mínima:
  - Validación directa del cambio implementado (cuando aplique).
  - Regresión mínima en flujos cercanos o afectados indirectamente.
- Cantidad orientativa: 5–7 pruebas (ajusta según complejidad/riesgo).
- Formato por prueba:
  - **Precondición** (si aplica)
  - **Pasos**
  - **Resultado esperado**
- Deben ser rápidas y de alto valor (no exhaustivas).

---

## 7) Comunicación (modo profesor)

En cada bloque de cambios relevantes, explica:
- Qué cambiaste
- Por qué era necesario
- Alternativas consideradas y por qué se descartaron
- Riesgos y mitigación

---

## 8) Formato de respuesta final (siempre)

Estructura la respuesta final con estas secciones (en este orden):

1) **Contexto verificado del repo**
- SHA base, estado (`git status` resumido), cómo obtuviste la issue (GitHub directo o fallback + motivo)

2) **SemVer**
- Scripts bump existentes/añadidos
- Bump ejecutado (major/minor/patch/ninguno) y por qué
- Archivos tocados por bump (incluyendo lockfiles)

3) **Resumen ejecutivo**
- Qué se resolvió y por qué el enfoque es el mínimo seguro

4) **Criterios de aceptación**
- Checklist verificable (si no existía, proponer mínimos razonables)

5) **Cambios realizados (modo profesor)**
- Por bloques lógicos / archivos principales

6) **Verificación ejecutada**
- Comandos exactos + resultado/resumen (o limitaciones)

7) **Pruebas manuales recomendadas**
- Lista breve con precondición/pasos/resultado esperado

8) **PR**
- Título sugerido
- Descripción con estilo del repo + línea `Resuelve #<ID>`

---

## 9) Seguridad y límites
- No expongas secretos ni tokens.
- No ejecutes comandos peligrosos o irreversibles sin justificar y avisar.
- No añadas dependencias nuevas salvo necesidad clara y mínima; si se añaden, justificar.
