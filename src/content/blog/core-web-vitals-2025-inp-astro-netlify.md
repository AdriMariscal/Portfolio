---
title: "Core Web Vitals 2025: qué es INP y cómo optimizar tu sitio con Astro y Netlify"
description: "Guía actualizada de Core Web Vitals en 2025: qué es INP, cómo se diferencia de FID, cómo medir LCP, INP y CLS con Lighthouse y PageSpeed Insights, y estrategias prácticas para optimizar sitios hechos con Astro y desplegados en Netlify."
tags: ["core‑web‑vitals", "performance", "lighthouse", "seo", "astro", "netlify"]
published: true
date: 2025-11-18
---

Si te preocupa el SEO y la experiencia de usuario, **Core Web Vitals** ya no son opcionales: son una parte más del “currículum” de tu web.

Desde 2024, Google ha sustituido la métrica FID (First Input Delay) por **INP (Interaction to Next Paint)** como señal de interactividad. En 2025 esto ya no es “algo nuevo”, es la realidad del día a día: si tu web se siente lenta al interactuar, Google lo ve… y tus usuarios también.

En esta guía vamos a ver:

- Qué son las **Core Web Vitals** y por qué influyen en SEO y UX.
- En qué consiste el cambio de **FID → INP** y qué mide realmente INP.
- Cómo medirlas con **Lighthouse** y **PageSpeed Insights**.
- Estrategias concretas para mejorar **LCP, INP y CLS** en proyectos hechos con **Astro** y desplegados en **Netlify**.
- Una **checklist final** para revisar tu sitio sin volverte loco.

---

## 1. Qué son las Core Web Vitals (y por qué importan)

Google define tres métricas principales para evaluar la calidad de experiencia en una página:

- **LCP (Largest Contentful Paint)**: cuánto tarda en aparecer el **contenido principal** (hero, imagen grande, bloque de texto importante).
- **INP (Interaction to Next Paint)**: mide lo que tarda la interfaz en **responder a una interacción** (click, tap, teclado) y mostrar el siguiente frame.
- **CLS (Cumulative Layout Shift)**: cuánto **salta el diseño** mientras carga (botones que se mueven, textos que bajan, etc.).

En resumen:

- LCP → sensación de **velocidad al cargar**.  
- INP → sensación de **respuesta al interactuar**.  
- CLS → sensación de **estabilidad visual**.

Google utiliza estas métricas como **factor de ranking** (no el único, pero sí relevante) y, lo más importante, están muy alineadas con lo que sienten tus usuarios: si están mal, tendrás más rebote, menos conversiones y peor imagen de marca.

### Umbrales recomendados en 2025

A grandes rasgos, los valores objetivo son:

- **LCP**
  - Bueno: ≤ 2,5 s  
  - Mejorable: 2,5–4,0 s  
  - Malo: > 4,0 s

- **INP**
  - Bueno: ≤ 200 ms  
  - Mejorable: 200–500 ms  
  - Malo: > 500 ms

- **CLS**
  - Bueno: ≤ 0,1  
  - Mejorable: 0,1–0,25  
  - Malo: > 0,25

Si la mayoría de tus usuarios (el famoso percentil 75) está en valores “Buenos”, estás en terreno razonable. Si caes en “Malo”, tienes trabajo urgente.

---

## 2. De FID a INP: por qué Google cambió la métrica

Hasta 2024, la métrica oficial de interactividad era **FID (First Input Delay)**: medía el retraso desde la **primera interacción** del usuario hasta que el navegador podía atenderla.

El problema: FID solo miraba **la primera** interacción y solo una parte del proceso, lo que podía dar una imagen demasiado optimista. Una página podía tener un buen FID pero volverse torpe y lenta después.

Por eso Google la sustituyó por **INP (Interaction to Next Paint)**:

- INP observa **todas las interacciones** relevantes durante la visita (clicks, taps, teclas).
- Se queda, simplificando, con el **peor tiempo razonable** (ignorando casos raros).
- Mide de forma más realista **cómo de “reacciona” tu web cuando el usuario hace cosas**, no solo en el primer click.

Traducción práctica:

> Ya no vale con que la página “reaccione bien al principio”.  
> Tiene que mantenerse **ágil** durante toda la sesión.

Y aquí es donde entra en juego cuánto JavaScript cargas, cómo lo ejecutas y cómo estructuras tus componentes.

---

## 3. Cómo medir Core Web Vitals con Lighthouse y PageSpeed Insights

Tener claro qué son las métricas está bien, pero lo importante es **medirlas**.

### 3.1 Lighthouse (en el navegador y en CI)

Ya vimos en la entrada anterior cómo Lighthouse te ayuda a auditar rendimiento. Aquí nos centramos en su pestaña de **Performance / Accessibility** y, dentro, en las secciones que muestran:

- **LCP**: normalmente como parte del “Performance score”.
- **INP**: desde que sustituyó a FID, aparece como métrica clave.
- **CLS**: dentro de las métricas de estabilidad visual.

Formas de usar Lighthouse:

1. **Desde Chrome DevTools**  
   - Abres tu página en Chrome.  
   - DevTools → pestaña Lighthouse → eliges “Performance” y “Best Practices” (y si quieres, “Accessibility”).  
   - Generas el reporte para móvil y/o escritorio.

2. **En tu pipeline (GitHub Actions)**  
   - Puedes usar acciones que ejecuten Lighthouse en cada PR o cada push a `main`.  
   - Ideal si ya tienes un pipeline de CI/CD para tu proyecto Astro/Netlify: detectas regresiones de rendimiento antes de desplegar.

Lighthouse se basa en **datos de laboratorio** (una simulación). Es perfecto para iterar y depurar, pero no refleja siempre la realidad de todos tus usuarios.

---

### 3.2 PageSpeed Insights y datos de campo

Para ver datos de usuarios reales, la herramienta clave es **PageSpeed Insights**:

- Introduces la URL.
- Obtienes:
  - **Field data (CrUX)**: datos reales de usuarios de Chrome (si tu sitio tiene tráfico suficiente).
  - **Lab data**: una auditoría tipo Lighthouse, pero desde los servidores de Google.

Ahí verás:

- Distribución de usuarios en “Bueno / Mejorable / Malo” para LCP, INP y CLS.
- Recomendaciones concretas: imágenes, JS, CSS, third-parties, etc.

Idea práctica:

> Usa Lighthouse para probar cambios rápidos mientras desarrollas.  
> PageSpeed Insights para comprobar cómo se comporta **la web real** con tus usuarios.

---

## 4. Mejorar LCP, INP y CLS en proyectos Astro + Netlify

Vamos ahora a la parte que te interesa de verdad: **qué tocar en tu código y en tu despliegue**.

### 4.1 Mejorar LCP en Astro y Netlify

LCP, prácticamente siempre, está marcado por:

- La **imagen principal** (hero).
- El bloque grande de texto / sección principal en el fold inicial.

Con Astro y Netlify tienes varias ventajas: render estático, CDN, caché… pero hay que usarlas bien.

#### Estrategias clave para LCP

1. **Optimizar la imagen LCP**

   - Usa el sistema de imágenes de Astro (`<Image />` o `Astro.assets`) para:
     - Generar versiones adaptadas (`srcset`, `sizes`).
     - Servir formatos modernos (AVIF/WEBP cuando sea posible).
     - Aplicar `loading="lazy"` a las que no sean LCP.
   - Para la **imagen principal (hero)**:
     - Evita el lazy-loading.
     - Puedes usar `priority` o un preload del recurso.

2. **CDN y caché en Netlify**

   - Asegúrate de que la imagen LCP y los assets estáticos pasan por la **CDN de Netlify**.
   - Configura headers de caché apropiados (por ejemplo, largos para assets versionados).
   - Usa rutas estáticas siempre que puedas: Astro genera HTML estático y Netlify lo sirve desde su edge.

3. **Reducir CSS y JS bloqueantes**

   - En Astro, intenta mantener el CSS **ligero y modular**:
     - Evita frameworks gigantes si no los necesitas.
     - Apóyate en utilidades (Tailwind) bien configuradas para tree-shaking.
   - Evita hidratar componentes innecesarios:
     - Si algo es puramente estático, que se quede como **HTML estático**.
     - Reserva `client:load` para lo que realmente tenga lógica de cliente.

4. **Preload de fuentes e imágenes críticas**

   En el `<head>` de Astro puedes añadir:

   ```html
   <link rel="preload" as="image" href="/ruta/a/tu-hero.avif" />
   <link rel="preload" as="font" href="/fonts/tu-fuente.woff2" type="font/woff2" crossorigin="anonymous" />
   ```

   Siempre con moderación (no hagas preload de todo), pero bien usado puede mejorar significativamente el LCP.

---

### 4.2 Mejorar INP: mantener la interfaz ágil

INP sufre cuando:

- Tienes **mucho JavaScript** ejecutándose en el hilo principal.
- Hay componentes que hacen trabajo pesado en cada interacción.
- Cargas demasiados listeners o lógica innecesaria.

Astro tiene aquí una ventaja enorme: su filosofía de **islas** y “menos JS por defecto”.

#### Estrategias clave para INP con Astro

1. **Reducir JavaScript enviado al cliente**

   - Haz todo lo que puedas en **tiempo de build** (SSR/SSG).
   - Usa componentes interactivos solo donde hagan falta.
   - Prefiere `client:visible` o `client:idle` frente a `client:load` cuando el componente no es crítico para el primer render.

2. **Dividir componentes complejos**

   - Si tienes un componente con mucha lógica, separa:
     - El render estático.
     - De la parte interactiva que realmente necesita JS.
   - Usa estados y efectos con cabeza: evita recalcular cosas pesadas en cada click o keypress.

3. **Eliminar scripts y terceros innecesarios**

   - Píxeles, trackers, widgets… todo suma.
   - Si no aportan valor claro, elimínalos o al menos:
     - Cárgalos de forma diferida.
     - Solo en páginas concretas.

4. **Evitar “trabajo pesado” justo tras la interacción**

   - Si tienes cálculos que pueden ir a un Web Worker, muévelos.
   - Para listas grandes, paginación o infinite scroll (como en la otra entrada), trabaja con **lotes pequeños** en vez de re-renderizar todo.

5. **Medir la interactividad desde el propio Netlify**

   - Puedes integrar scripts ligeros de análisis de rendimiento o usar soluciones que recopilen INP desde usuarios reales.
   - Así verás qué rutas y componentes son los que realmente están penalizando.

---

### 4.3 Mejorar CLS: que la página no “salte”

CLS se dispara cuando el contenido se mueve mientras la página ya está visible:

- Imágenes sin tamaño definido.
- Banners que aparecen tarde.
- Anuncios o iframes que empujan el contenido hacia abajo.

#### Estrategias clave para CLS

1. **Reservar espacio para imágenes y bloques dinámicos**

   - Siempre que puedas, define `width` y `height` o usa `aspect-ratio` en las imágenes.
   - Si vas a cargar banners, componentes o bloques dinámicos, reserva el hueco con CSS desde el principio.

2. **Manejar anuncios y embeds con cuidado**

   - Si usas anuncios o iframes, dales un contenedor fijo.
   - Evita que aparezcan por sorpresa entre párrafos de texto.

3. **Cargas de fuentes**

   - Usa `font-display: swap` para evitar parones largos sin texto.
   - Si una fuente cambia mucho las proporciones, valora:
     - Usar el sistema de preajuste (fallback parecido).
     - Cargar la fuente después del contenido crítico.

4. **Astro layouts coherentes**

   - Mantén una estructura de layout consistente en tus plantillas (`BaseLayout` u otro).
   - Evita insertar componentes que cambian el tamaño del header o hero una vez cargada la página.

---

## 5. Checklist rápida de Core Web Vitals para tu sitio

Para terminar, una lista práctica que puedes ir marcando:

### LCP

- [ ] ¿La imagen o bloque principal aparece en ≤ 2,5 s para la mayoría de usuarios?  
- [ ] ¿La imagen LCP está optimizada (formato moderno, dimensiones correctas)?  
- [ ] ¿Estás sirviendo la página desde CDN (Netlify) con buena caché para assets?  
- [ ] ¿Has minimizado CSS y JS bloqueantes en el `head`?

### INP

- [ ] ¿Tu sitio evita hidratar componentes que no necesitan interactividad?  
- [ ] ¿Los componentes interactivos usan `client:visible` / `client:idle` cuando procede?  
- [ ] ¿Has reducido scripts de terceros al mínimo imprescindible?  
- [ ] ¿No hay tareas pesadas ejecutándose inmediatamente tras cada interacción?

### CLS

- [ ] ¿Todas las imágenes tienen tamaño o `aspect-ratio` definido?  
- [ ] ¿Los banners, anuncios o mensajes flotantes reservan espacio desde el principio?  
- [ ] ¿Las fuentes web no hacen que el texto “salte” de forma brusca?  
- [ ] ¿El layout base de tus páginas es estable (sin cambios de altura repentinos en cabecera o hero)?

### Medición

- [ ] ¿Has pasado Lighthouse en local o en tu pipeline de CI?  
- [ ] ¿Has revisado PageSpeed Insights para ver field data (usuarios reales)?  
- [ ] ¿Monitorizas de forma periódica las Core Web Vitals (especialmente tras cambios grandes)?

---

Core Web Vitals no son una auditoría que se pasa una vez y se olvida: son un **indicador continuo** de la salud de tu web.

La buena noticia es que, si ya trabajas con **Astro + Netlify**, tienes una base muy sólida: HTML estático, CDN, y un stack que anima a usar **menos JavaScript por defecto**. Solo necesitas rematar la jugada con buenas decisiones de rendimiento.

¿Te gustaría que revisemos juntos los Core Web Vitals de tu sitio (o de un proyecto Astro/Netlify que tengas en marcha) y saquemos una lista de mejoras concretas?

Si quieres una revisión con ejemplos de tu código real, **[escríbeme](/contact)** y lo vemos paso a paso.
