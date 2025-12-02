---
title: "Netlify Functions y Edge Functions con Astro: servicios dinámicos sin backend propio"
description: "Tutorial paso a paso para usar Netlify Functions y Edge Functions con Astro: envío de correos con APIs externas, generación de contenido dinámico y protección de entornos de staging sin montar un servidor propio."
tags: ["astro", "netfly", "serverless", "edge-functions", "backend"]
published: true
date: 2025-11-20
---

Una de las ventajas de desplegar sitios estáticos con **Astro** en **Netlify** es que puedes añadir “superpoderes” sin montar un backend tradicional.

Con **Netlify Functions** y **Edge Functions** puedes:

- Enviar correos usando un proveedor externo (SendGrid, Resend, etc.).
- Generar PDFs o contenido personalizado bajo demanda.
- Proteger tu entorno de **staging** (como hice en `adrianmariscal.es`) con un simple middleware en el edge.
- Integrar APIs de terceros sin exponer claves en el frontend.

Todo esto sin salirte del repositorio de tu proyecto Astro.

En esta guía vamos a ver, paso a paso:

1. Qué son Netlify Functions y Edge Functions y en qué se diferencian.  
2. Cómo preparar tu proyecto Astro para usarlas.  
3. Un ejemplo práctico de **Function** que envía correos vía API externa.  
4. Un ejemplo de **Function** que genera contenido dinámico (ej. PDF o JSON personalizado).  
5. Cómo proteger tu entorno de **staging** con una **Edge Function**.  
6. Cómo llamar a estas funciones desde tus páginas y componentes Astro.  
7. Buenas prácticas y checklist final.

---

## 1. Netlify Functions vs Edge Functions: cuándo usar cada una

### Netlify Functions (lambda “clásica”)

- Se ejecutan en un entorno similar a **Node.js**.
- Ideales para:
  - Hablar con APIs externas.
  - Tareas de backend “puntuales” (enviar un email, guardar algo en una base externa, generar un fichero…).
  - Lógica que no necesita estar pegada al request en el edge.

Piensa en ellas como **mini-endpoints** tipo `/api/*` que se ejecutan bajo demanda.

### Edge Functions

- Se ejecutan **en el borde de la red (edge)**, muy cerca del usuario.
- Funcionan como un **middleware** sobre la petición:
  - Puedes redirigir, reescribir, añadir cabeceras.
  - Proteger rutas, hacer A/B testing ligero, añadir cookies, etc.
- Ideales para:
  - **Proteger entornos de staging**.
  - Aplicar reglas de acceso según IP/país.  
  - Inyectar cabeceras de seguridad.
  - Reescribir rutas sin pasar por un servidor central.

En resumen:

- **Functions** → lógica de negocio y llamadas a APIs externas.  
- **Edge Functions** → seguridad, redirecciones, reescrituras y decisiones rápidas *antes* de llegar a tu sitio.

---

## 2. Estructura básica en un proyecto Astro + Netlify

Asumiendo que ya tienes un proyecto Astro desplegado en Netlify, la estructura típica sería:

```txt
/
├─ src/
│  ├─ pages/
│  ├─ components/
│  └─ layouts/
├─ netlify/
│  ├─ functions/
│  │  └─ send-email.ts
│  └─ edge-functions/
│     └─ protect-staging.ts
├─ netlify.toml
└─ package.json
```

Algunos puntos clave:

- Las **Functions** viven por defecto en `netlify/functions/`.
- Las **Edge Functions** en `netlify/edge-functions/`.
- En `netlify.toml` defines:
  - El directorio de funciones (si cambias el defecto).
  - Qué Edge Function se aplica a qué rutas.

Ejemplo mínimo de `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[functions]
  directory = "netlify/functions"

[edge_functions]
  # Asignamos la Edge Function protect-staging a todas las rutas
  # de un subdominio de staging, por ejemplo.
  [[edge_functions]]
    function = "protect-staging"
    path = "/*"
```

> Puedes afinar el `path` a rutas concretas (`/admin/*`, `/preview/*`, etc.) según lo que quieras proteger.

---

## 3. Ejemplo 1: Netlify Function para enviar correos con una API externa

Imaginemos que quieres un formulario de contacto en tu sitio Astro que, al enviarse, llame a una API de email (por ejemplo, un proveedor tipo Resend/SendGrid/Postmark).

### 3.1 Crear la función `send-email`

Archivo: `netlify/functions/send-email.ts`

```ts
import type { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const body = event.body ? JSON.parse(event.body) : null;

    if (!body || !body.email || !body.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Faltan campos obligatorios" }),
      };
    }

    const { email, name, message } = body;

    // Aquí llamarías a tu API externa de correo.
    // Ejemplo genérico:
    const apiKey = process.env.MI_PROVEEDOR_EMAIL_API_KEY;

    const response = await fetch("https://api.email-provider.com/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "no-reply@tu-dominio.com",
        to: "contacto@tu-dominio.com",
        subject: `Nuevo mensaje de ${name || "Contacto web"}`,
        text: `Email: ${email}

Mensaje:
${message}`,
      }),
    });

    if (!response.ok) {
      console.error("Error enviando correo:", await response.text());
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "No se ha podido enviar el correo" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch (error) {
    console.error("Error en send-email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error interno" }),
    };
  }
};

export { handler };
```

Puntos importantes:

- Solo aceptamos **POST**.
- Validamos campos mínimos (`email`, `message`).
- Las claves se leen de `process.env` (configuradas como **Environment Variables** en Netlify, nunca en el código fuente).
- Devolvemos respuestas limpias en JSON.

### 3.2 Formulario en Astro que llama a la Function

En `src/pages/contacto.astro` (o similar):

```astro
---
const title = "Contacto";
---

<html lang="es">
  <head>
    <title>{title}</title>
  </head>
  <body>
    <main>
      <h1>Contacta conmigo</h1>

      <form id="contact-form">
        <label for="name">Nombre</label>
        <input id="name" name="name" type="text" />

        <label for="email">Correo electrónico</label>
        <input id="email" name="email" type="email" required />

        <label for="message">Mensaje</label>
        <textarea id="message" name="message" required></textarea>

        <button type="submit">Enviar</button>
      </form>

      <p id="form-status" aria-live="polite"></p>
    </main>

    <script client:load>
      const form = document.getElementById("contact-form");
      const status = document.getElementById("form-status");

      form?.addEventListener("submit", async (event) => {
        event.preventDefault();

        status.textContent = "Enviando…";

        const formData = new FormData(form);
        const payload = {
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        };

        const res = await fetch("/.netlify/functions/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (res.ok && data.ok) {
          status.textContent = "Mensaje enviado correctamente. Gracias :)";
          form.reset();
        } else {
          status.textContent = data.error || "Ha ocurrido un error al enviar el mensaje.";
        }
      });
    </script>
  </body>
</html>
```

Observa que llamamos a la Function como si fuera un endpoint:

```txt
/.netlify/functions/send-email
```

Netlify se encarga de enrutar esto a tu código de `send-email.ts`.

---

## 4. Ejemplo 2: Function para generar contenido dinámico (PDF o JSON personalizado)

Generar PDFs suele implicar librerías más pesadas (pueden ir en una Function clásica). Aquí no entramos al detalle de una librería específica, pero el patrón es similar.

### Function para generar un documento personalizado

Archivo: `netlify/functions/generate-document.ts`

```ts
import type { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const body = event.body ? JSON.parse(event.body) : null;

    if (!body || !body.fullName || !body.reason) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Faltan datos para generar el documento" }),
      };
    }

    const { fullName, reason } = body;

    // Aquí podrías usar una librería para generar PDF.
    // Para simplificar, devolveremos un texto dinámico.
    const content = `
      Documento personalizado

      Nombre: ${fullName}
      Motivo: ${reason}

      Generado automáticamente por Netlify Functions + Astro.
    `.trim();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
      body: content,
    };
  } catch (error) {
    console.error("Error generando documento:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error interno" }),
    };
  }
};

export { handler };
```

Desde Astro, podrías:

- Llamar a esta Function desde un botón “Descargar borrador”.  
- Incluso desde el servidor (en `getStaticPaths`/`get` si necesitas pre-generar algo).

Ejemplo de llamada desde el cliente:

```ts
const res = await fetch("/.netlify/functions/generate-document", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ fullName, reason }),
});

const text = await res.text();
// Mostrarlo en pantalla o iniciar descarga...
```

---

## 5. Ejemplo 3: Proteger el entorno de staging con una Edge Function

En tu caso, ya has utilizado **Edge Functions** para proteger el entorno de staging de `adrianmariscal.es`. Vamos a ver un patrón típico: **protección con token o contraseña simple**.

### 5.1 Edge Function `protect-staging`

Archivo: `netlify/edge-functions/protect-staging.ts`

```ts
export default async (request: Request) => {
  const url = new URL(request.url);

  // Permitir tráfico a recursos estáticos (ajusta a tus needs)
  if (url.pathname.startsWith("/assets/") || url.pathname.startsWith("/favicon")) {
    return fetch(request);
  }

  // Por ejemplo, comprobar un header o cookie con un token
  const tokenFromEnv = Deno.env.get("STAGING_ACCESS_TOKEN");
  const authHeader = request.headers.get("x-staging-token") ?? "";
  const cookieHeader = request.headers.get("cookie") ?? "";

  const hasValidHeader = authHeader === tokenFromEnv;
  const hasValidCookie = cookieHeader.includes(`staging_token=${tokenFromEnv}`);

  if (hasValidHeader || hasValidCookie) {
    // Usuario autorizado → dejamos pasar la request
    return fetch(request);
  }

  // Usuario no autorizado → devolvemos 401 o una página básica
  return new Response(
    `
      <!doctype html>
      <html lang="es">
        <head><meta charset="utf-8"><title>Staging protegido</title></head>
        <body>
          <h1>Entorno de staging protegido</h1>
          <p>Necesitas un token válido para acceder.</p>
        </body>
      </html>
    `,
    {
      status: 401,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    }
  );
};
```

### 5.2 Asignar la Edge Function al entorno de staging

En `netlify.toml`:

```toml
[edge_functions]
  # Para el entorno de staging, podrías tener un `context` distinto
  # o usar un site config diferente. A modo de ejemplo:
  [[edge_functions]]
    function = "protect-staging"
    path = "/*"
```

En Netlify:

- Configuras la variable de entorno `STAGING_ACCESS_TOKEN` solo en el **site** (o contexto) de staging.
- La versión de producción puede no tener esta Edge Function asignada, o tener otra distinta.

Con esto:

- Cualquier petición que no incluya el token (en header o cookie) recibe un 401.
- Es una forma ligera y rápida de proteger staging sin montar login completo.

---

## 6. Cómo encajar todo esto en Astro sin perder la filosofía “menos JS”

La gracia de usar Functions y Edge Functions con Astro es que:

- Puedes mantener la **mayor parte del sitio estático**.
- Solo añadir JS donde hace falta interactividad real.

Patrones recomendados:

- Formularios que:
  - Usan HTML estándar.
  - Un pequeño script para llamar a la Function.
- Páginas que cargan datos dinámicos **bajo demanda**:
  - ej. botón “Generar borrador”, “Enviar correo”, “Descargar PDF”.
- Edge Functions que actúan como **middleware de seguridad o routing** sin tocar tu código Astro.

Si diseñas bien las rutas:

- `/` y tus páginas de contenido siguen siendo HTML estático (rápido y SEO-friendly).
- `/.netlify/functions/*` hacen el trabajo sucio del backend.
- Las Edge Functions añaden seguridad y reglas extra sin que el usuario lo note.

---

## 7. Buenas prácticas y checklist final

Para cerrar, una lista rápida de cosas a revisar al trabajar con Netlify Functions + Edge Functions en Astro:

### Seguridad

- [ ] Nunca expones claves de API en el frontend: siempre van en `process.env` (Functions) o `Deno.env` (Edge).
- [ ] Validas y sanitizas cualquier dato que viene del cliente.
- [ ] Para entornos de staging o previews, usas Edge Functions como capa extra de protección.

### Arquitectura

- [ ] Mantienes las Functions **pequeñas y específicas** (una cosa bien hecha por función).
- [ ] Centralizas lógica compartida (helpers, clientes de API) en módulos reutilizables.
- [ ] No conviertes todo en endpoints: solo lo que realmente necesita backend.

### Rendimiento

- [ ] No abusas de Edge Functions para lógica pesada (recuerda que están en el edge).
- [ ] Cacheas respuestas cuando tiene sentido (cabeceras `Cache-Control`).
- [ ] Sigues aprovechando al máximo el render estático de Astro.

### DX (experiencia de desarrollo)

- [ ] Usas `netlify dev` en local para probar Functions y Edge Functions.
- [ ] Tienes logs claros (`console.log`, `console.error`) para depurar en el dashboard de Netlify.
- [ ] Versionas y documentas tus Functions como parte del proyecto Astro.

---

Si ya estás usando Astro y Netlify para tu portfolio o tus proyectos, añadir Functions y Edge Functions es el siguiente paso natural para:

- Conectar APIs externas.
- Proteger entornos de staging.
- Construir pequeños servicios dinámicos sin mantener un servidor 24/7.

¿Te gustaría que bajemos esto a tu caso concreto (por ejemplo, proteger otras secciones de tu sitio, o montar un pequeño servicio de generación de documentos legales con Functions)?

Si quieres, **[escríbeme](/contact)** y diseñamos juntos la arquitectura más sencilla posible que cubra tus necesidades reales.
