---
title: "Paginación vs infinite scroll: cómo elegir y cómo implementarlo con Astro y JavaScript"
description: "Comparativa práctica entre paginación clásica, botón de «Cargar más» e infinite scroll. Ventajas e inconvenientes en UX, rendimiento y SEO, y cómo implementarlos en un proyecto Astro con JavaScript e Intersection Observer."
tags: ["astro", "pagination", "ux", "seo", "performance"]
published: true
date: 2025-11-06
---

Si tienes un blog, un listado de proyectos o un catálogo de productos, tarde o temprano aparece la pregunta:

> ¿Uso paginación clásica, botón de «Cargar más» o **infinite scroll**?

Cada patrón tiene impacto directo en:

- **Experiencia de usuario (UX)**: cómo percibe la navegación la persona que está usando tu web.
- **Rendimiento**: cuánto tarda en cargar y cómo se comporta la página.
- **SEO y accesibilidad**: cómo lo ven Google y los lectores de pantalla.

En este artículo vamos a ver:

1. Las diferencias claras entre **paginación**, **Cargar más** e **infinite scroll**.  
2. Cuándo conviene cada uno.  
3. Cómo implementarlos en un proyecto **Astro** usando **JavaScript** e **Intersection Observer**.  
4. Qué debes cuidar para **no romper accesibilidad ni SEO**.

---

## 1. Tres patrones principales: qué son y qué implican

### Paginación clásica (páginas numeradas)

Es el patrón de toda la vida:

- Listado en `/blog`.
- En la parte inferior, enlaces del estilo:  
  `« Anterior | 1 | 2 | 3 | Siguiente »`.
- Cada página tiene su **URL propia**: `/blog/page/2`, `/blog/page/3`, etc.

**Ventajas**:

- Muy **amigable para SEO**:  
  - Cada página tiene su título, meta descripción y contenido indexable.  
  - Se puede usar `rel="next"` y `rel="prev"`.
- El usuario sabe **dónde está** y cuántas páginas hay.
- Fácil de implementar y mantener.

**Inconvenientes**:

- La experiencia puede parecer más «cortada», sobre todo en móvil.
- Requiere clics extra para seguir viendo contenido.

---

### Botón «Cargar más»

En vez de ir navegando por páginas numeradas:

- Se muestra una primera tanda de elementos (por ejemplo, 10 artículos).
- Debajo aparece un botón tipo **«Cargar más»**.
- Al hacer clic, se cargan más elementos debajo, sin recargar toda la página.

**Ventajas**:

- Mejor **fluidez** que la paginación clásica.  
- Mantienes cierto control sobre el número de elementos cargados.
- Puede convivir con URLs paginadas por debajo (mejor para SEO).

**Inconvenientes**:

- Si solo hay JS y no hay enlaces «clásicos» de respaldo, puede dificultar SEO y accesibilidad.
- El usuario puede perder la referencia de «hasta dónde he llegado».

---

### Infinite scroll

La página va cargando contenido **automáticamente** cuando el usuario se acerca al final:

- Muy típico en redes sociales y algunas tiendas.
- Se puede implementar con **Intersection Observer** y llamadas a API o endpoints.

**Ventajas**:

- Experiencia muy **fluida** y adictiva.
- Reduce fricción: el usuario solo tiene que desplazarse.

**Inconvenientes**:

- Si se implementa mal, es una **pesadilla de SEO**: sin URLs claras, Google ve solo la primera tanda de contenido.
- Puede ser poco accesible:
  - Usuarios de teclado pueden perderse.
  - El scroll puede volverse interminable.
- Difícil volver al mismo punto si el usuario refresca o vuelve atrás.

---

## 2. ¿Cuál elegir? Criterios prácticos

Algunos criterios sencillos para decidir:

### Si tu prioridad es el SEO y la claridad

- **Paginación clásica** suele ser la mejor opción.
- Puedes complementarla con mejoras progresivas (botón «Cargar más» o scroll automático) sin romper la base.

Ideal para:

- Blogs.
- Guías y documentación.
- Listados de contenido que quieres que **Google indexe bien página a página**.

---

### Si tu prioridad es la experiencia «fluida» pero sin renunciar al SEO

- Combinar paginación + botón **«Cargar más»** es un buen punto medio.
- Técnicamente puedes:
  - Tener URLs paginadas (`/blog/page/2`) que el servidor genera.
  - Usar JavaScript para cargar esas páginas e ir insertando su contenido sin recargar.

Ideal para:

- Catálogos de productos.
- Portfolios.
- listados con cierto volumen pero donde quieres mantener buen SEO.

---

### Si tu prioridad es maximizar el tiempo de sesión y el «scroll infinito»

El **infinite scroll** tiene sentido cuando:

- El contenido se consume de forma más «casual» (tipo feed).
- El usuario no necesita volver exactamente al punto donde estaba.
- El SEO del listado no es tan crítico (por ejemplo, si posicionan mejor las fichas individuales).

Aun así, es recomendable:

- Ofrecer al menos una forma de paginación accesible.  
- Permitir al usuario llegar al footer sin tener que pasar por un scroll interminable (por ejemplo, con un botón «Ir al final» o un límite de cargas).

---

## 3. Paginación clásica con Astro

Astro trae **paginación integrada** con la utilidad `paginate`.  
Un ejemplo simplificado para un `/blog`:

```ts
---
// src/pages/blog/[page].astro
import BaseLayout from "@/layouts/BaseLayout.astro";
import BlogList from "@/components/BlogList.astro";
import { getCollection } from "astro:content";

const allPosts = await getCollection("blog");
const { page } = Astro.params;
const currentPage = Number(page) || 1;

const PAGE_SIZE = 10;

const start = (currentPage - 1) * PAGE_SIZE;
const end = start + PAGE_SIZE;

const totalPages = Math.ceil(allPosts.length / PAGE_SIZE);
const posts = allPosts.slice(start, end);
---

<BaseLayout title={`Blog - Página ${currentPage}`}>
  <BlogList posts={posts} />

  <nav aria-label="Paginación del blog" class="pagination">
    {currentPage > 1 && (
      <a href={currentPage === 2 ? "/blog" : `/blog/page/${currentPage - 1}`} class="pagination__prev">
        ← Anterior
      </a>
    )}

    <span class="pagination__info">
      Página {currentPage} de {totalPages}
    </span>

    {currentPage < totalPages && (
      <a href={`/blog/page/${currentPage + 1}`} class="pagination__next">
        Siguiente →
      </a>
    )}
  </nav>
</BaseLayout>
```

Y puedes tener `/blog.astro` que redirija o sea equivalente a la página 1.

**Puntos clave de SEO y accesibilidad**:

- Usa `aria-label` en la navegación de paginación.  
- Añade en el `<head>` enlaces `rel="next"` y `rel="prev"` cuando corresponda.  
- Cada página puede tener meta título y descripción propios (aunque sean parecidos).

---

## 4. Botón «Cargar más» con Astro + JavaScript

Una forma habitual es:

1. Mantener la **paginación clásica** como base (`/blog/page/2`, etc.).  
2. Exponer un endpoint que devuelva más posts en JSON o HTML parcial.  
3. En el cliente, al pulsar «Cargar más», pedir la siguiente página y añadir los posts al listado.

### Endpoint de ejemplo

```ts
---
// src/pages/api/posts.json.ts
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const PAGE_SIZE = 10;

export const GET: APIRoute = async ({ url }) => {
  const page = Number(url.searchParams.get("page") || "1");
  const allPosts = await getCollection("blog");

  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const posts = allPosts.slice(start, end);

  return new Response(
    JSON.stringify({
      posts,
      hasMore: end < allPosts.length,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};
```

### Componente de «Cargar más»

```tsx
---
// src/components/LoadMorePosts.astro
import type { CollectionEntry } from "astro:content";

interface Props {
  initialPosts: CollectionEntry<"blog">[];
  initialPage: number;
  totalPages: number;
}

const { initialPosts, initialPage, totalPages } = Astro.props;
---

<div class="posts" id="posts-root">
  {initialPosts.map((post) => (
    <article class="post">
      <h2><a href={`/blog/${post.slug}/`}>{post.data.title}</a></h2>
      <p>{post.data.description}</p>
    </article>
  ))}
</div>

<button
  id="load-more"
  class="button"
  type="button"
  data-page={initialPage}
  aria-label="Cargar más artículos del blog"
>
  Cargar más
</button>

<script client:load>
  const button = document.getElementById("load-more");
  const container = document.getElementById("posts-root");

  if (button && container) {
    let page = Number(button.dataset.page || "1");
    const totalPages = Number({totalPages});

    button.addEventListener("click", async () => {
      if (page >= totalPages) return;

      page += 1;
      button.disabled = true;
      button.textContent = "Cargando…";

      const res = await fetch(`/api/posts.json?page=${page}`);
      if (!res.ok) {
        button.disabled = false;
        button.textContent = "Cargar más";
        return;
      }

      const data = await res.json();

      for (const post of data.posts) {
        const article = document.createElement("article");
        article.className = "post";
        article.innerHTML = `
          <h2><a href="/blog/${post.slug}/">${post.data.title}</a></h2>
          <p>${post.data.description}</p>
        `;
        container.appendChild(article);
      }

      button.disabled = false;
      button.textContent = page < totalPages ? "Cargar más" : "No hay más artículos";

      if (page >= totalPages) {
        button.setAttribute("aria-disabled", "true");
      }
    });
  }
</script>
```

**Accesibilidad**:

- El botón es un `button` real, no un `<a>` disfrazado.
- Tiene `aria-label` descriptivo.
- El foco del teclado se mantiene en el botón tras cargar más contenido.

**SEO**:

- Sigues teniendo tus páginas `/blog/page/2`, `/blog/page/3` para Google.  
- Solo «mejoras» la experiencia para usuarios humanos con JS.

---

## 5. Infinite scroll con Intersection Observer

Para el **infinite scroll**, el patrón típico es:

1. Renderizar una primera página de resultados.  
2. Añadir un elemento «centinela» (un `<div>` vacío) al final del listado.  
3. Crear un `IntersectionObserver` que observe ese centinela.  
4. Cuando entra en pantalla, cargar la siguiente página.

### Componente simplificado con infinite scroll

```tsx
---
// src/components/InfinitePosts.astro
import type { CollectionEntry } from "astro:content";

interface Props {
  initialPosts: CollectionEntry<"blog">[];
  initialPage: number;
  totalPages: number;
}

const { initialPosts, initialPage, totalPages } = Astro.props;
---

<section aria-label="Listado de artículos del blog con scroll infinito">
  <div class="posts" id="posts-root">
    {initialPosts.map((post) => (
      <article class="post">
        <h2><a href={`/blog/${post.slug}/`}>{post.data.title}</a></h2>
        <p>{post.data.description}</p>
      </article>
    ))}
  </div>

  <div
    id="infinite-sentinel"
    aria-hidden="true"
  ></div>

  <button
    id="fallback-load-more"
    class="button"
    type="button"
  >
    Cargar más
  </button>
</section>

<script client:load>
  const container = document.getElementById("posts-root");
  const sentinel = document.getElementById("infinite-sentinel");
  const fallbackButton = document.getElementById("fallback-load-more");

  let page = Number({initialPage});
  const totalPages = Number({totalPages});
  let loading = false;

  async function loadNextPage() {
    if (loading || page >= totalPages) return;
    loading = true;
    page += 1;

    const res = await fetch(`/api/posts.json?page=${page}`);
    if (!res.ok) {
      loading = false;
      return;
    }

    const data = await res.json();
    for (const post of data.posts) {
      const article = document.createElement("article");
      article.className = "post";
      article.innerHTML = `
        <h2><a href="/blog/${post.slug}/">${post.data.title}</a></h2>
        <p>${post.data.description}</p>
      `;
      container.appendChild(article);
    }

    loading = false;

    if (page >= totalPages && sentinel) {
      sentinel.remove();
      fallbackButton?.setAttribute("aria-disabled", "true");
    }
  }

  if ("IntersectionObserver" in window && sentinel) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          loadNextPage();
        }
      }
    }, {
      rootMargin: "200px",
    });

    observer.observe(sentinel);
  }

  if (fallbackButton) {
    fallbackButton.addEventListener("click", loadNextPage);
  }
</script>
```

Fíjate en dos detalles importantes:

- Hay un **botón de respaldo** (`fallbackButton`) por si `IntersectionObserver` no está disponible o se desactiva JavaScript.
- El centinela tiene `aria-hidden="true"` porque su único propósito es técnico.

---

## 6. Accesibilidad: no todo es «que cargue más contenido»

Algunos puntos para que paginación, «Cargar más» e infinite scroll sean accesibles:

1. **Navegación por teclado**  
   - El botón «Cargar más» debe ser un `button`, no un `<div>` clicable.  
   - Los enlaces de paginación deben seguir un orden lógico.

2. **Lectores de pantalla**  
   - Usa `aria-label` en la barra de paginación (`<nav aria-label="Paginación">`).  
   - Cuando añadas contenido nuevo dinámicamente, puedes avisar con una región `aria-live` si tiene sentido.

3. **Evitar scroll infinito sin control**  
   - Algunos usuarios pueden necesitar llegar al footer (contacto, avisos legales).  
   - Con infinite scroll, plantéate:
     - Un límite máximo de páginas cargadas automáticamente.  
     - A partir de ahí, obligar a pulsar un botón.

4. **Mantener el contexto**  
   - Si el usuario hace clic en un artículo y luego vuelve atrás, idealmente debería volver al mismo punto del listado.  
   - Para esto puedes guardar el `scrollTop` en `sessionStorage` o usar algún marcador (esto es más avanzado, pero importante en listados grandes).

---

## 7. SEO: cómo no romperlo con infinite scroll

Para que Google y otros buscadores no se pierdan:

1. **URLs paginadas accesibles sin JavaScript**  
   - Aunque implementes infinite scroll, es buena idea tener rutas como `/blog/page/2`, `/blog/page/3`.  
   - Desde ellas se puede navegar con enlaces clásicos.

2. **Enlaces rel="next" y rel="prev"**  
   - En cada página paginada, añade en `<head>`:
     - `<link rel="next" href="/blog/page/3">`  
     - `<link rel="prev" href="/blog/page/1">`  
   donde corresponda.

3. **Evita que toda la lista viva solo en JavaScript**  
   - Si el contenido adicional solo existe en llamadas XHR y no hay URLs que lo representen, Google lo tendrá muy difícil para indexarlo.

4. **Meta tags y títulos claros**  
   - Puedes incluir la página en el título, por ejemplo:  
     `Blog de desarrollo web - Página 2`.

5. **Datos estructurados**  
   - Si tienes muchos artículos, valora usar marcado estructurado tipo `BlogPosting` o `Article` por item.  
   - Esto ayuda a que los buscadores entiendan que están viendo un listado de entradas.

---

## 8. Resumen: receta práctica para tu sitio Astro

Si tuviera que resumir una estrategia razonable sería:

1. **Empieza por paginación clásica**:
   - URLs claras (`/blog/page/2`).
   - Navegación accesible.
   - Enlaces `rel="next"` y `rel="prev"`.

2. **Añade «Cargar más» como mejora progresiva**:
   - Usa un endpoint (`/api/posts.json?page=N`),
   - y en el cliente, inserta los posts sin recargar página.

3. **Considera infinite scroll solo donde tenga sentido**:
   - No lo uses por moda: valora si ayuda realmente a tus usuarios.  
   - Mantén URLs paginadas y accesibles por debajo.

4. **Cuida accesibilidad y SEO**:
   - `aria-label`, regions `aria-live` si las necesitas.
   - Títulos y meta descripciones coherentes.
   - No ocultar todo el contenido detrás de JavaScript.

---

¿Te gustaría que adaptara estos ejemplos al paginado concreto de tu blog o al listado de proyectos de tu portfolio en Astro?

Si quieres que lo veamos aplicado a tu código real (rutas, componentes y estilos), **[escríbeme](/contact)** y lo diseñamos a medida.
