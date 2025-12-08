---
title: "CI/CD para Astro y Netlify con GitHub Actions: pipeline completo paso a paso"
description: "Cómo diseñar un pipeline de integración continua para un proyecto Astro desplegado en Netlify: tests, linters, Lighthouse (SEO y accesibilidad), matrices de Node y artefactos con GitHub Actions."
tags: ["astro", "netlify", "ci‑cd", "github‑actions", "lighthouse", "seo"]
published: true
date: 2025-11-04
---

Tener una web rápida, accesible y con buen SEO **no es cuestión de suerte**.

Si trabajas con **Astro** y despliegas en **Netlify**, lo normal es que el proyecto vaya creciendo, entren más cambios y, poco a poco, aparezcan regresiones:

- Páginas que se vuelven más lentas.
- Pequeños errores en producción.
- Estilos rotos.
- Una caída en las notas de Lighthouse.

La solución es montar un **pipeline de integración continua (CI)** que revise cada cambio antes de desplegarlo.

En esta guía veremos cómo crear un **workflow completo con GitHub Actions** para un proyecto Astro/Netlify que:

1. Ejecuta **tests unitarios**.  
2. Pasa **linters** (código, estilo, etc.).  
3. Valida **accesibilidad y SEO con Lighthouse**.  
4. Usa **matrices de Node** para probar varias versiones.  
5. Guarda resultados en **artefactos** para poder consultarlos después.  

---

## Vista general del pipeline

La idea es tener un archivo `.github/workflows/ci.yml` con esta estructura lógica:

- **Evento**: se ejecuta en cada `push` y `pull_request` a las ramas principales.
- **Job 1 – test_lint**  
  - Se ejecuta en una **matriz de versiones de Node** (por ejemplo, 20 y 22).  
  - Instala dependencias, ejecuta linters y tests.
- **Job 2 – build**  
  - Solo si el job anterior pasa.  
  - Hace `astro build` y guarda la carpeta `dist` como **artefacto**.
- **Job 3 – lighthouse**  
  - Descarga el artefacto `dist`.  
  - Sirve el build en local y pasa **Lighthouse** (performance, accesibilidad, SEO).  
  - Guarda los informes (`.html` o `.json`) como artefacto.

El despliegue lo puede seguir gestionando **Netlify** (lo más habitual), usando este pipeline como **filtro de calidad** antes de hacer merge a la rama que dispara el deploy.

---

## Preparar el proyecto Astro: scripts básicos

Antes de ir a GitHub Actions, conviene tener algunos scripts definidos en tu `package.json`:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test": "vitest run",
    "lint": "eslint src",
    "check": "astro check",
    "lighthouse": "lhci autorun"
  }
}
```

- `test`: para tus **tests unitarios** (Vitest es una opción muy común en el ecosistema Astro).
- `lint`: para **ESLint** (y si quieres, integrarlo con TypeScript/Astro).
- `check`: para que Astro valide tipos y rutas.
- `lighthouse`: usando **Lighthouse CI (lhci)** para automatizar los análisis.

No es obligatorio que tu proyecto tenga *exactamente* esos scripts, pero el workflow que veremos asumirá algo muy parecido.

---

## Creando el workflow base de CI

Vamos a crear `.github/workflows/ci.yml` con un pipeline que:

- Se ejecuta en `push` y `pull_request`.
- Usa matriz de versiones de Node.
- Ejecuta tests y linters.
- Construye el proyecto.
- Guarda el build como artefacto.
- Lanza Lighthouse sobre ese build.

### Disparadores y configuración base

```yaml
name: CI Astro/Netlify

on:
  push:
    branches:
      - main
      - staging
  pull_request:
    branches:
      - main
      - staging

permissions:
  contents: read

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true
```

- `on`: el pipeline se dispara en `push` y `pull_request` a `main` y `staging`.  
- `concurrency`: evita tener 3–4 pipelines corriendo en paralelo para la misma rama si haces varios commits seguidos.

---

## Job 1: tests y linters con matriz de Node

Este job se llamará `test_lint` y usará una matriz para probar con varias versiones de Node (ej. 20 y 22):

```yaml
jobs:
  test_lint:
    name: Tests + Linters (Node ${{ matrix.node-version }})
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20, 22]

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type & route check (Astro)
        run: npm run check

      - name: Unit tests
        run: npm test
```

Puntos clave:

- **Matriz de Node**: si algo solo falla en Node 22, lo sabrás.  
- `npm ci`: instalación reproducible basada en `package-lock.json` (o el lock de tu gestor de paquetes preferido).  
- Incluimos `lint`, `check` y `test` en un mismo job porque todos son “filtros de calidad” previos al build.

---

## Job 2: build de Astro y artefactos

Si los tests y linters pasan, tiene sentido construir el proyecto una sola vez (no hace falta repetir el build para todas las versiones de Node).

Creamos un job `build` que **depende** de `test_lint`:

```yaml
  build:
    name: Build Astro
    runs-on: ubuntu-latest
    needs: test_lint

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Astro build
        run: npm run build

      - name: Upload dist as artifact
        uses: actions/upload-artifact@v4
        with:
          name: astro-dist
          path: dist
          retention-days: 7
```

Aquí estamos usando por primera vez **artefactos**:

- `upload-artifact` guarda la carpeta `dist` generada por `astro build`.
- Podrás descargarla desde la interfaz de GitHub Actions si necesitas revisar el build.
- Otros jobs del workflow también pueden **descargarla** para reutilizarla (por ejemplo, el job de Lighthouse).

---

## Job 3: Lighthouse (performance, accesibilidad y SEO)

Ahora creamos un job `lighthouse` que:

1. Depende del job `build`.  
2. Descarga el artefacto `astro-dist`.  
3. Sirve el contenido en un servidor local.  
4. Ejecuta `lhci` apuntando a ese servidor.  
5. Guarda el informe como artefacto.

```yaml
  lighthouse:
    name: Lighthouse CI
    runs-on: ubuntu-latest
    needs: build

    steps:
      - name: Download dist artifact
        uses: actions/download-artifact@v4
        with:
          name: astro-dist
          path: dist

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install Lighthouse CI
        run: npm install -g @lhci/cli serve

      - name: Start static server
        run: |
          npx serve dist --listen 4173 &
          echo "Server started on http://localhost:4173"
          sleep 5

      - name: Run Lighthouse CI
        run: |
          lhci autorun             --collect.url=http://localhost:4173             --collect.numberOfRuns=3             --upload.target=filesystem             --upload.outputDir=./lhci-report

      - name: Upload Lighthouse report
        uses: actions/upload-artifact@v4
        with:
          name: lighthouse-report
          path: lhci-report
          retention-days: 7
```

Notas importantes:

- Usamos `serve` para levantar rápidamente un servidor estático sobre `dist`.  
- `lhci autorun`:
  - Hace varias pasadas (3) para estabilizar resultados.
  - Genera informes en una carpeta local (`lhci-report`).  
- Ese informe se sube como artefacto: podrás descargarlo como `.html`/`.json` desde GitHub y ver el resultado con calma.

---

## Cómo encaja Netlify en todo esto

Con este workflow, GitHub Actions se convierte en tu **paso de validación**:

1. Abres un **pull request** hacia `main` o `staging`.  
2. GitHub Actions ejecuta:
   - Tests y linters (matriz de Node).
   - Build de Astro.
   - Lighthouse.
3. Si algo falla, el PR aparece como **fallido** y no deberías hacer merge.

Netlify puede seguir funcionando como hasta ahora:

- Le dices a Netlify que **solo despliegue cuando hay cambios en `main`**.  
- En GitHub, configuras `main` para que requiera que el workflow de CI pase (Status checks obligatorios).  
- Resultado: **nunca despliegas código que no haya pasado tests, linters y Lighthouse**.

Si prefieres que el despliegue también lo haga GitHub Actions con la CLI de Netlify, podrías añadir un job extra:

```yaml
  deploy:
    name: Deploy to Netlify
    runs-on: ubuntu-latest
    needs: [build, lighthouse]
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Download dist artifact
        uses: actions/download-artifact@v4
        with:
          name: astro-dist
          path: dist

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install Netlify CLI
        run: npm install -g netlify-cli

      - name: Deploy
        run: |
          netlify deploy             --prod             --dir=dist             --site=$NETLIFY_SITE_ID             --auth=$NETLIFY_AUTH_TOKEN
        env:
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
```

Aquí la clave son los **secrets** de GitHub:

- `NETLIFY_SITE_ID` y `NETLIFY_AUTH_TOKEN` se guardan en la configuración del repositorio (no en el código).  
- El job solo se ejecuta en `push` a `main` y únicamente si `build` y `lighthouse` han pasado.

---

## Buenas prácticas para tu pipeline Astro/Netlify

Algunos consejos para mantener este CI/CD sano a largo plazo:

- **Empieza sencillo** y ve añadiendo cosas: tests, luego linters, luego Lighthouse…  
- Ajusta Lighthouse a la realidad: que el objetivo sea mejorar la **experiencia real**, no perseguir un “100” a toda costa.
- Usa **artefactos** al menos para:
  - El build (`dist`).
  - Informes de tests (coverage).
  - Informes de Lighthouse.
- Revisa regularmente:
  - Si hay pasos que ya no se usan.  
  - Si puedes cachear más (por ejemplo, `cache: 'npm'`).
  - Si conviene dividir el workflow en varios (por ejemplo, uno diario solo para Lighthouse sobre producción).
- Documenta en el README cómo funciona el pipeline, para que cualquier persona del equipo sepa **qué se ejecuta antes de desplegar**.

---

## ¿Quieres que apliquemos este pipeline a tu proyecto?

Un buen pipeline es, en la práctica, una **red de seguridad**: te permite moverte rápido sin miedo a romper producción.

Si quieres:

- Adaptar este ejemplo a tu proyecto Astro/Netlify.  
- Añadir validaciones específicas (por ejemplo, tests de formularios o rutas críticas).  
- Revisar tus notas de Lighthouse y planificar mejoras.

puedo ayudarte a diseñar un pipeline a medida.

¿Te interesa?  

**[Escríbeme](/contact)** y vemos tu caso paso a paso.
