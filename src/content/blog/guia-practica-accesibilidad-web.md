---
title: "Guía práctica de accesibilidad web: cómo hacer tu sitio más inclusivo"
description: "Introducción práctica a la accesibilidad web: contraste de colores, navegación por teclado, texto alternativo, etiquetas ARIA y herramientas gratuitas como WAVE, Lighthouse y AXE para evaluar y mejorar cualquier sitio."
tags: ["accesibilidad", "a11y", "ux", "lighthouse", "web"]
published: true
date: 2025-11-11
---

Cada vez que alguien no puede usar una web, **no es culpa de su discapacidad, es culpa de la web**.

La accesibilidad (o **a11y**) va de esto: de que personas con distintas capacidades puedan **entender, navegar y usar** tu sitio sin barreras absurdas.

En esta guía vamos a ver, con ejemplos sencillos:

- Qué significa realmente que una web sea accesible.
- Cómo mejorar **contraste de colores**, **navegación por teclado**, **texto alternativo** y **formularios**.
- Para qué sirven etiquetas **ARIA** (y cuándo _no_ usarlas).
- Cómo usar herramientas gratuitas como **WAVE**, **Lighthouse Accessibility** y **AXE** para detectar problemas.

La idea no es que te conviertas en experto WCAG en una tarde, sino que tengas una base sólida para **dejar de romper cosas básicas** y empezar a construir sitios más inclusivos.

---

## 1. Qué es la accesibilidad web (en la práctica)

Una web accesible es aquella que:

- Se puede **percibir** (aunque no veas la pantalla, no oigas el audio, o uses un contraste alto).
- Se puede **manejar** (aunque uses teclado, switch o lector de pantalla).
- Se puede **entender** (contenido y navegación claros).
- Es **robusta** (funciona con distintas tecnologías de asistencia: lectores de pantalla, ampliadores, etc.).

No es algo solo “para cumplir la ley”:

- Mejora la **experiencia para todo el mundo** (no solo para personas con discapacidad).
- Reduce tickets de soporte y abandonos por frustración.
- Cada vez tiene **más peso en SEO**: Google premia páginas usables y bien estructuradas.

---

## 2. Contraste de colores: que se pueda leer de verdad

Uno de los errores más comunes: textos claros sobre fondos claros (o oscuros sobre oscuros).

### Cómo pensar el contraste

- Para texto normal, se recomienda al menos **ratio 4.5:1**.
- Para textos grandes (títulos muy grandes), el mínimo es **3:1**.
- No solo afecta a personas con baja visión: también a quien mira la pantalla al sol o con un portátil regulero.

### Buenas prácticas rápidas

- Evita textos en gris muy claro sobre blanco (#aaa sobre #fff, por ejemplo).
- Usa herramientas de comprobación de contraste:
  - Extensiones de navegador.
  - La sección de **Accessibility** en las DevTools.
  - Herramientas online específicas de contraste.

### Tip básico de diseño

Si tienes dudas, tira hacia:

- **Texto más oscuro** y fondo más claro.
- Fondo oscuro y texto muy claro.

Es mejor pecar de “un poco sobrio” que de ilegible.

---

## 3. Navegación por teclado: Tab, Enter y poco más

Muchas personas navegan **sin ratón**:

- Usuarios de lectores de pantalla.
- Personas con diversidad motora.
- Usuarios que simplemente prefieren el teclado.

Si tu web solo se puede usar con ratón, tienes un problema.

### Qué debe poder hacerse solo con teclado

- Moverse por los links y botones con `Tab` y `Shift + Tab`.
- Activar acciones con `Enter` o `Space`.
- Acceder a menús, formularios, pestañas, modales…

### Puntos clave

1. **Orden de foco lógico**

   El foco (ese “resaltado” que se mueve con Tab) debe seguir el orden visual:

   - Cabecera → navegación → contenido → footer, etc.
   - Evita cambiar el orden solo con CSS (por ejemplo, usando `order` en flex sin pensar); puede desordenar el foco.

2. **Estilo del foco visible**

   Nunca lo quites con `outline: none` **sin sustituirlo por algo mejor**.

   Haz que el elemento enfocado se vea claramente, por ejemplo:

   ```css
   :focus-visible {
     outline: 2px solid currentColor;
     outline-offset: 4px;
   }
   ```

3. **”Skip links” o enlace de saltar contenido**

   En páginas largas, ayuda tener un enlace tipo:

   ```html
   <a href="#main" class="skip-link">Saltar al contenido principal</a>
   ```

   Visible al recibir foco, permite saltar la navegación y llegar al contenido principal rápidamente.

---

## 4. Texto alternativo: que las imágenes “hablen”

El **texto alternativo** (`alt`) en imágenes es clave para:

- Personas que usan lectores de pantalla.
- Cuando la imagen no carga (conexión lenta, bloqueo…).
- SEO (Google usa ese texto para entender la imagen).

### Cómo escribir buenos `alt`

- Para imágenes **informativas** (gráficos, ilustraciones explicativas):  
  Describe lo importante para entender el contenido.

  ```html
  <img src="/stats.png" alt="Gráfico de barras: las visitas aumentan un 20 % en el último mes" />
  ```

- Para imágenes **decorativas** (puramente estéticas):  
  Usa `alt=""` y añade `role="presentation"` si quieres reforzarlo. Así el lector de pantalla la ignora.

  ```html
  <img src="/pattern.svg" alt="" role="presentation" />
  ```

- No empieces siempre con “Imagen de…”.  
  El lector de pantalla ya indica que es una imagen.

---

## 5. Formularios accesibles: etiquetas, errores y ayudas

Los formularios son un punto crítico: son donde la persona **interactúa** de verdad con tu web.

### Etiquetas (`label`) siempre conectadas

Cada campo debe tener una etiqueta clara asociada con `for` e `id`:

```html
<label for="email">Correo electrónico</label>
<input id="email" name="email" type="email" autocomplete="email" />
```

Nada de usar solo `placeholder` como etiqueta.

### Mensajes de error claros

Cuando algo falla:

- Indica **qué campo** tiene el problema.
- Explica **qué hay que hacer** para corregirlo.

Por ejemplo:

```html
<label for="email">Correo electrónico</label>
<input id="email" name="email" type="email" aria-describedby="email-help email-error" />
<p id="email-help">Te enviaremos la confirmación a esta dirección.</p>
<p id="email-error" class="error" aria-live="polite">Introduce un correo válido (ejemplo@dominio.com).</p>
```

- `aria-describedby` asocia ayudas y errores al campo.  
- `aria-live="polite"` hace que el lector de pantalla anuncie los errores cuando aparecen.

---

## 6. ARIA: útil, pero con cuidado

**ARIA** (Accessible Rich Internet Applications) son atributos especiales para mejorar la accesibilidad de componentes complejos: menús desplegables, tabs, modales, etc.

Ejemplos: `role="dialog"`, `aria-expanded`, `aria-controls`, `aria-label`, `aria-hidden`…

### Regla de oro

> **No uses ARIA para arreglar lo que ya se puede hacer con HTML normal.**

- Si un enlace va a otra página → usa `<a>`, no `<div role="link">`.
- Si es un botón que abre un menú → usa `<button>`, no `<span role="button">`.

### Dónde ARIA sí tiene sentido

- Menús, acordeones, tabs, modales personalizados.
- Componentes que no existen como elemento HTML nativo.

Ejemplo sencillo de botón que controla un acordeón:

```html
<button
  class="accordion__trigger"
  aria-expanded="false"
  aria-controls="section-1"
  id="accordion-button-1"
>
  Pregunta frecuente 1
</button>

<div
  id="section-1"
  role="region"
  aria-labelledby="accordion-button-1"
  hidden
>
  <p>Respuesta a la pregunta frecuente 1.</p>
</div>
```

Y con JavaScript:

- Cambias `aria-expanded` entre `"true"` / `"false"`.
- Añades o quitas el atributo `hidden` en el panel.

---

## 7. Herramientas gratuitas para evaluar accesibilidad

No hace falta ir a ciegas. Hay varias herramientas que te ayudan a detectar problemas.

### 7.1 WAVE (Web Accessibility Evaluation Tool)

- Disponible como **extensión de navegador**.
- Muestra:
  - Errores (en rojo).
  - Avisos (en amarillo).
  - Información sobre títulos, landmarks (`<main>`, `<nav>`, etc.).
  - Problemas de contraste.
- Es muy visual: ideal para revisar páginas concretas.

Forma de usarla:

1. Abres tu página.
2. Pulsas el icono de WAVE.
3. Analizas los marcadores que aparecen sobre la página.

---

### 7.2 Lighthouse – apartado de Accessibility

Si ya estás usando **Lighthouse** (como hemos visto en otra entrada), tendrás una pestaña de **Accessibility**:

- Te da una **nota de 0 a 100** en accesibilidad.
- Lista problemas típicos:
  - Falta de texto alternativo.
  - Contraste insuficiente.
  - Botones sin nombre accesible.
  - etc.

Úsalo como:

- Una **foto rápida** de cómo está tu página.
- Un checklist de arreglos prioritarios (empezando por los errores más graves).

---

### 7.3 AXE (Deque)

**AXE DevTools** (extensión para Chrome/Firefox):

- Integrado en las **DevTools** (como una pestaña más).
- Muy potente para:
  - Filtrar por tipos de problema.
  - Ver el código exacto donde ocurre.
  - Entender el impacto.

Es una buena herramienta para desarrolladores que ya están cómodos con el inspector del navegador.

---

### 7.4 Pruebas manuales sencillas

Además de las herramientas, hay pruebas manuales que cuentan mucho:

- **Navegar toda la página solo con teclado** (Tab, Shift+Tab, Enter, Space, Escape).
- Probar la página con:
  - Tamaño de texto aumentado.
  - Zoom al 200 %.
- Escuchar cómo la lee un lector de pantalla (NVDA en Windows, VoiceOver en Mac).

---

## 8. Checklist rápida para tu próxima revisión

Cuando revises tu sitio (blog, portfolio, landing…), puedes usar esta checklist rápida:

1. **Estructura**
   - ¿Hay un solo `<h1>` claro por página?
   - ¿Los títulos siguen un orden lógico (h2, h3…)?

2. **Contraste**
   - ¿Los textos tienen suficiente contraste con el fondo?
   - ¿Los enlaces son distinguibles (color y/o subrayado)?

3. **Teclado**
   - ¿Puedes navegar todo con Tab?
   - ¿Se ve dónde está el foco?
   - ¿Los menús y modales se controlan con teclado?

4. **Imágenes**
   - ¿Todas las imágenes informativas tienen `alt` descriptivo?
   - ¿Las decorativas usan `alt=""`?

5. **Formularios**
   - ¿Todos los campos tienen `label` asociado?
   - ¿Los errores se explican claramente?
   - ¿Se indican los campos obligatorios?

6. **ARIA (si la usas)**
   - ¿Solo se usa cuando HTML no es suficiente?
   - ¿Los atributos (`aria-expanded`, `aria-controls`, etc.) se actualizan bien con JS?

7. **Herramientas**
   - ¿Has pasado WAVE, Lighthouse y/o AXE?
   - ¿Has corregido al menos los errores más graves?

---

## 9. Accesibilidad como parte del proceso, no como “parche”

La accesibilidad no debería ser “lo que miras al final si sobra tiempo”, sino algo integrado desde el principio:

- En el diseño (colores, tamaños, jerarquía).
- En el desarrollo (HTML semántico, foco, estados).
- En los contenidos (lenguaje claro, encabezados bien usados).

Y no hace falta hacerlo perfecto desde el día 1: basta con que, en cada iteración, preguntes:

> “¿Estoy dejando fuera a alguien con este cambio?”

---

¿Te gustaría que revisemos juntos tu web desde el punto de vista de accesibilidad y preparemos una lista de mejoras priorizadas?

Si quieres una auditoría práctica (no solo teoría), **[escríbeme](/contact)** y vemos tu caso paso a paso.
