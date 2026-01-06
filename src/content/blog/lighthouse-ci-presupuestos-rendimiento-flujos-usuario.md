---
title: "Automatiza tus presupuestos de rendimiento y flujos de usuario con Lighthouse CI y GitHub Actions"
description: "Cómo definir performance budgets para LCP, INP y CLS, integrarlos con Lighthouse CI y GitHub Actions en proyectos Astro + Netlify, y combinar datos de laboratorio con el informe de UX de Chrome (CrUX)."
tags: ["lighthouse", "core-web-vitals", "performance", "ci-cd", "github-actions", "astro", "netfly"]
published: true
date: 2025-12-04
---

Si ya estás usando **Lighthouse** para revisar tu web y tienes un pipeline de **CI/CD con GitHub Actions** y **Netlify**, el siguiente paso lógico es dejar de “mirar informes a mano” y empezar a **automatizar decisiones**:

> Si el rendimiento cae por debajo de cierto umbral… **el pipeline falla**.  

En esta guía vamos a ver cómo hacerlo de forma práctica:

- Qué es un **performance budget** pensado en términos de **LCP, INP y CLS**.
- Cómo configurar **Lighthouse CI** para que falle el pipeline cuando se superan esos límites.
- Cómo aprovechar los **Lighthouse user flows** para medir flujos reales (añadir al carrito, enviar formularios, etc.).
- Cómo encajar todo esto con los **datos de campo** del **Chrome UX Report (CrUX)**, que son los que Google usa realmente para SEO.

La idea es que, al terminar, tengas una **configuración de CI repetible** para tus proyectos (por ejemplo, Astro + Netlify) que te avise en cuanto un cambio empeora la experiencia real de tus usuarios.


## 1. Qué es un “presupuesto de rendimiento” aplicado a LCP, INP y CLS

Un **presupuesto de rendimiento** es, literalmente, ponerle un **límite de gasto** a tu web, pero en lugar de euros hablamos de **milisegundos**, **KB** o **puntos de score**.

En el contexto de **Core Web Vitals**, lo más habitual es fijar umbrales para:

- **LCP (Largest Contentful Paint)**: cuánto tarda en cargarse el contenido principal de la página.  
  - Objetivo típico: ≤ **2,5 s** en el percentil 75 (p75).
- **INP (Interaction to Next Paint)**: cuánto tarda la interfaz en reaccionar visualmente a una interacción (clic, tap, tecla…).  
  - Objetivo típico: ≤ **200 ms** en el p75.
- **CLS (Cumulative Layout Shift)**: cuánto “baila” el layout mientras carga la página.  
  - Objetivo típico: ≤ **0,1** en el p75.

Esos objetivos son los mismos que utiliza Google en las **Core Web Vitals**. No son números arbitrarios: por encima de ellos, la experiencia de usuario empieza a resentirse y puede afectar al **SEO** y a las conversiones.

La clave: el **presupuesto** no es “quiero un 100 en Lighthouse”, sino “no quiero que mi LCP pase de 2,5 s ni que mi CLS supere 0,1 en condiciones normales”.


### Lab vs campo: por qué INP es un caso especial

Aquí hay un matiz importante:

- **Lighthouse y Lighthouse CI** son **herramientas de laboratorio**: ejecutan la página en un entorno controlado (móvil simulado, red lenta, etc.).  
- **INP**, en cambio, es principalmente una **métrica de campo**: se calcula observando interacciones reales de usuarios en Chrome.

En Lighthouse, lo que sí vas a ver siempre es **TBT (Total Blocking Time)**, que es una muy buena **proxy de INP** en laboratorio. Por eso, en la práctica:

- En **Lighthouse CI** vas a definir presupuestos para **LCP, CLS y TBT**.
- En **CrUX / Search Console** vas a vigilar **LCP, INP y CLS** con datos reales.

En el resto del artículo voy a trabajar con esa combinación: **LCP + CLS + TBT** en CI, y **LCP + INP + CLS** en datos de campo.


## 2. Configurar Lighthouse CI en un proyecto Astro + Netlify

Vamos a suponer un proyecto típico:

- Frontend en **Astro**.
- Despliegue de producción en **Netlify**.
- Repositorio en **GitHub** con CI ya montado (tests, build, etc.).

El objetivo es añadir **Lighthouse CI** a ese flujo.

### 2.1. Instalar `@lhci/cli`

Primero, añade Lighthouse CI como dependencia de desarrollo:

```bash
npm install -D @lhci/cli
```

(Usa `pnpm add -D @lhci/cli` o `yarn add -D @lhci/cli` si trabajas con otro gestor de paquetes).


### 2.2. Crear el archivo de configuración `lighthouserc`

En la raíz del proyecto, crea un archivo `lighthouserc.json` (o `.lighthouserc.json`, cualquiera de los dos funciona).  
Para un proyecto Astro que genera una carpeta `dist` al hacer `npm run build`, un punto de partida razonable sería:

```json
{
  "ci": {
    "collect": {
      "staticDistDir": "./dist",
      "numberOfRuns": 3,
      "settings": {
        "preset": "mobile"
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

Algunos detalles clave:

- `staticDistDir`: le dice a Lighthouse CI dónde está tu **build estática** (en Astro suele ser `./dist`).  
- `numberOfRuns`: ejecutar varias veces cada URL y quedarse con la mediana reduce la variabilidad.  
- `preset: "mobile"`: por defecto Lighthouse se centra en **móvil**, que suele ser el caso más crítico.


### 2.3. Añadir un script de npm para ejecutarlo en local

En tu `package.json`, añade:

```jsonc
{
  "scripts": {
    "build": "astro build",
    "lhci": "lhci autorun"
  }
}
```

Ahora puedes probar Lighthouse CI en local:

```bash
npm run build
npm run lhci
```

Esto:

1. Levanta un servidor estático con tu `dist`.  
2. Ejecuta Lighthouse varias veces.  
3. Sube el informe a un almacenamiento temporal y te devuelve la URL en la consola.

Antes de integrar nada en CI, **asegúrate de que se ejecuta correctamente en local** y fíjate en los valores de LCP, CLS y TBT que estás obteniendo. Los usaremos para elegir presupuestos realistas.


## 3. Definir presupuestos para LCP, CLS y TBT (proxy de INP)

Ahora vamos a convertir esos números en **presupuestos de rendimiento** dentro de `lighthouserc.json`.

Supón que tras varias ejecuciones de Lighthouse en producción o en un entorno muy parecido, obtienes algo como:

- LCP mediana ~ **2100 ms**.
- TBT mediano ~ **120 ms**.
- CLS p75 ~ **0,05**.

Un presupuesto razonable sería:

- LCP ≤ **2500 ms** (dejando algo de margen).  
- TBT ≤ **200 ms** (para no acercarnos a experiencias lentas).  
- CLS ≤ **0,1**.

En `lighthouserc.json` quedaría algo así:

```json
{
  "ci": {
    "collect": {
      "staticDistDir": "./dist",
      "numberOfRuns": 3,
      "settings": {
        "preset": "mobile"
      }
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.90 }],
        "largest-contentful-paint": [
          "error",
          { "maxNumericValue": 2500, "aggregationMethod": "median" }
        ],
        "total-blocking-time": [
          "error",
          { "maxNumericValue": 200, "aggregationMethod": "median" }
        ],
        "cumulative-layout-shift": [
          "error",
          { "maxNumericValue": 0.10, "aggregationMethod": "p75" }
        ]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

Puntos importantes:

- La clave `categories:performance` asegura que sigues teniendo un **score global de rendimiento decente** (≥ 0,90).  
- `largest-contentful-paint`, `total-blocking-time` y `cumulative-layout-shift` apuntan directamente a las métricas que más te importan.  
- `aggregationMethod` te permite indicar cómo combinar varias ejecuciones (`median` o `p75`). Para CLS suele tener sentido usar percentiles (p75).

A partir de aquí, **cualquier PR o commit que rompa estos límites hará que Lighthouse CI devuelva error** y el job de CI fallará.


## 4. Integrar Lighthouse CI con GitHub Actions (y Netlify)

Vamos ahora a llevar esto al pipeline. Supongamos que ya tienes un workflow que:

1. Se ejecuta en cada `push`/`pull_request`.  
2. Instala dependencias.  
3. Ejecuta `npm run build`.  
4. Despliega en Netlify (por ejemplo, usando la integración automática de Netlify con GitHub).

Puedes añadir un job específico para Lighthouse CI o integrarlo en el mismo job de build. Un ejemplo sencillo de workflow podría ser:

```yaml
name: CI + Lighthouse CI

on:
  pull_request:
  push:
    branches:
      - main

jobs:
  build-and-lhci:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install dependencies
        run: npm install

      - name: Build Astro site
        run: npm run build

      - name: Run Lighthouse CI (performance budgets)
        run: npx lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

Qué hace cada parte:

- `LHCI_GITHUB_APP_TOKEN` permite que Lighthouse CI comente en la PR y suba resultados a su servidor (si lo tienes configurado).  
- Si cualquiera de las **assertions** que definimos antes falla, este paso devolverá error y el job se marcará como **failed**.  
- A partir de ahí puedes decidir si:

  - Haces que el despliegue a Netlify esté condicionado a que este job pase.  
  - O permites que el despliegue continúe pero usas la PR como “semáforo rojo” que obliga a revisar antes de fusionar.


## 5. Medir flujos de usuario reales con Lighthouse user flows

Hasta ahora solo hemos medido **la carga inicial** de una página. Pero muchas veces los problemas de rendimiento y accesibilidad aparecen:

- Al **abrir un modal**.  
- Al **añadir un producto al carrito**.  
- En los **pasos intermedios de un checkout**.  
- Al **enviar un formulario largo**.

Para esto existen los **Lighthouse user flows**, que te permiten:

- Grabar o scriptar un **flujo de usuario completo** (por ejemplo, “home → detalle de producto → añadir al carrito → checkout”).  
- Ejecutar Lighthouse en distintos **puntos** del flujo: navegación inicial, snapshot de un estado, intervalo de tiempo durante interacciones (timespan).  
- Generar un **informe único** que resume rendimiento y accesibilidad en todo ese flujo.

### 5.1. Dependencias y estructura básica

Primero, instala las dependencias necesarias:

```bash
npm install -D lighthouse puppeteer
```

Crea un archivo, por ejemplo `ci/lighthouse-flow.mjs`:

```js
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import puppeteer from "puppeteer";
import { startFlow } from "lighthouse/lighthouse-core/fraggle-rock/api.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runFlow() {
  const browser = await puppeteer.launch({
    headless: "new"
  });

  const page = await browser.newPage();

  const baseUrl = process.env.LHCI_BASE_URL ?? "https://staging.ejemplo.com";

  const flow = await startFlow(page, {
    name: "Flujo añadir al carrito y checkout",
    configContext: {
      settingsOverrides: {
        formFactor: "mobile",
        screenEmulation: { mobile: true }
      }
    }
  });

  // 1) Navegación inicial (home)
  await flow.navigate(`${baseUrl}/`, {
    stepName: "Home"
  });

  // 2) Navegación a detalle de producto
  await flow.navigate(async () => {
    await page.click('[data-test="product-card"]:first-child a');
  }, {
    stepName: "Detalle de producto"
  });

  // 3) Timespan: añadir al carrito
  await flow.startTimespan({ stepName: "Añadir al carrito" });
  await page.click('[data-test="add-to-cart"]');
  await page.waitForSelector('[data-test="cart-drawer-open"]');
  await flow.endTimespan();

  // 4) Snapshot: resumen del carrito
  await flow.snapshot({ stepName: "Resumen del carrito" });

  // 5) Navegación al checkout
  await flow.navigate(async () => {
    await page.click('[data-test="go-to-checkout"]');
  }, {
    stepName: "Checkout"
  });

  const reportHtml = await flow.generateReport();
  const reportsDir = path.join(__dirname, "..", "reports");
  fs.mkdirSync(reportsDir, { recursive: true });

  const reportPath = path.join(reportsDir, "lighthouse-user-flow.html");
  fs.writeFileSync(reportPath, reportHtml, "utf-8");

  console.log(`Informe de user flow generado en: ${reportPath}`);

  await browser.close();
}

runFlow().catch((error) => {
  console.error(error);
  process.exit(1);
});
```

Notas:

- Uso un `LHCI_BASE_URL` para poder ejecutar el flujo contra **staging**, contra un **deploy preview de Netlify** o contra producción, según te convenga.  
- Los `data-test="..."` son selectores recomendados para no acoplarte a clases o textos visibles.  
- Combinamos `navigate`, `startTimespan`/`endTimespan` y `snapshot` para capturar tanto la carga como las interacciones.

Puedes añadir un script de npm para este flujo:

```jsonc
{
  "scripts": {
    "lhci:flow": "node ci/lighthouse-flow.mjs"
  }
}
```


### 5.2. Ejecutar el user flow en GitHub Actions

En el mismo workflow de antes, puedes añadir un paso opcional después del despliegue a Netlify (o contra tu entorno de staging):

```yaml
  lighthouse-user-flow:
    needs: build-and-lhci
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install dependencies
        run: npm install

      - name: Run Lighthouse user flow against staging
        env:
          LHCI_BASE_URL: https://staging.ejemplo.com
        run: npm run lhci:flow

      - name: Subir informe de user flow como artefacto
        uses: actions/upload-artifact@v4
        with:
          name: lighthouse-user-flow
          path: reports/lighthouse-user-flow.html
```

De este modo:

- Sigues usando **Lighthouse CI** para los presupuestos básicos (LCP, TBT, CLS) durante el build.  
- Y tienes un **informe adicional de user flow** para flujos críticos (carrito, checkout, formularios, etc.) que puedes revisar en cada PR.


## 6. Conectar la CI con los datos de campo (Chrome UX Report)

Todo lo anterior son **mediciones de laboratorio**. Para no perder de vista la realidad, necesitas compararlas con los **datos de campo** que ve Google.

Las fuentes principales son:

- **PageSpeed Insights / CrUX API**: donde puedes ver **LCP, INP y CLS** agregados en el percentil 75 para tus URLs.  
- **Google Search Console → Core Web Vitals**: donde agrupa URLs por “buenas / mejorables / malas” según las CWV.

Una forma muy práctica de unir las piezas es esta:

1. **Define los objetivos con datos de campo**  
   - Por ejemplo: “queremos que la mayoría de nuestras plantillas estén en **Bueno** para LCP, INP y CLS en móvil”.  
2. **Deriva los presupuestos de laboratorio a partir de ahí**  
   - Si tu LCP de campo está en torno a 2,3 s, no tiene sentido poner un presupuesto de 1,5 s en CI: tu propia realidad no lo soporta.  
   - Elige presupuestos que sean **ligeramente mejores** que tu situación actual pero alcanzables (ej. subir de 2,3 s a 2,1 s en LCP).  
3. **Usa TBT como proxy de INP en CI**  
   - Si ves que tu INP de campo va justo (por ejemplo, acercándose a 200 ms), endurece un poco el presupuesto de **TBT** en Lighthouse CI.  
   - Si tus cambios empeoran TBT, es muy probable que **terminen empeorando también INP** cuando lleguen a producción.

Con este esquema:

- **Lighthouse CI** actúa como **“cortafuegos”** en cada PR o push.  
- **CrUX / Search Console** te dan la **foto real a medio plazo**.  
- Los presupuestos se convierten en una forma de proteger tanto el **UX** como el **SEO** sin tener que revisar informes manualmente en cada cambio.


## 7. Checklist rápida

Para que puedas convertir esto en acción, te dejo una checklist compacta:

- [ ] ¿Tienes `@lhci/cli` instalado y un `lighthouserc.json` en la raíz del proyecto?  
- [ ] ¿Has configurado `staticDistDir` (o `url` + `startServerCommand`) de forma correcta para tu build de Astro?  
- [ ] ¿Has definido `assertions` para:
  - [ ] `categories:performance` con un `minScore` razonable.  
  - [ ] `largest-contentful-paint` con un `maxNumericValue` alineado con tu objetivo de LCP.  
  - [ ] `total-blocking-time` como proxy de INP.  
  - [ ] `cumulative-layout-shift` con `maxNumericValue` ≤ 0,1.  
- [ ] ¿Tu workflow de GitHub Actions falla si Lighthouse CI detecta que se han superado los presupuestos?  
- [ ] ¿Tienes al menos un **Lighthouse user flow** definido para un flujo crítico (compra, alta, contacto…)?  
- [ ] ¿Revisas de forma periódica los **datos de campo** (CrUX / Search Console) para ajustar tus presupuestos?  

Si ya tienes un pipeline de CI para Astro + Netlify y quieres añadirle estas comprobaciones (o migrar tus mediciones manuales de Lighthouse a una solución 100% automatizada), **[escríbeme](/contact)** y lo vemos con tu proyecto real: urls, flujos y presupuestos concretos adaptados a tu caso.
