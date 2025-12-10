---
title: "Qué es Google Lighthouse (explicado fácil) y por qué debería importarte"
description: "Lighthouse explicado sin tecnicismos: qué mide, cómo interpretar sus notas y cómo usarlo para mejorar la velocidad, accesibilidad y SEO de tu web."
tags: ["lighthouse", "seo", "performance", "a11y", "web"]
published: true
date: 2025-10-30
---

Si tienes una web (tienda online, blog, portfolio, landing…) es probable que alguien te haya dicho:

> “Pásale un Lighthouse”  
> o  
> “Tu web tiene mala nota en PageSpeed”.

Y te quedas igual.

En este artículo vamos a ver **qué es Google Lighthouse** en lenguaje normal, **qué significan sus notas** y **cómo usarlo sin ser técnico** para mejorar tu web.

---

## Qué es Google Lighthouse en palabras sencillas

**Google Lighthouse** es una herramienta gratuita que analiza una página web y le pone nota (de **0 a 100**) en cuatro áreas:

- **Performance**: qué tan rápido se carga y responde la página.
- **Accesibilidad**: si la pueden usar personas con distintas capacidades (lectores de pantalla, teclado, etc.).
- **Best Practices**: si la web sigue buenas prácticas modernas de seguridad y calidad.
- **SEO**: si la página está bien preparada para que los buscadores la entiendan.

Piensa en Lighthouse como una **ITV de tu web**:

- No mira si tu diseño es bonito.
- No opina sobre tus textos.
- Sí revisa si **técnicamente la página está sana**: rápida, accesible y bien construida.

---

## Qué significan las notas (sin obsesionarse)

Lighthouse muestra cada apartado con un círculo de color:

- **90–100 (verde)** → Muy bien  
  Tu web está técnicamente sana. Siempre se puede mejorar algo, pero ya estás en buena liga.

- **50–89 (naranja)** → Aceptable, pero mejorable  
  Suele haber cambios relativamente sencillos con mucho impacto:  
  imágenes pesadas, fuentes que bloquean la carga, scripts que sobran…

- **0–49 (rojo)** → Problemas serios  
  Aquí suele haber fallos de base: demasiado JavaScript, imágenes enormes, HTML/CSS muy desordenado…

La clave no es “sacar un 100 porque sí”, sino **mejorar la experiencia real** de tus usuarios:

- que la página **no tarde siglos** en cargar,  
- que se pueda usar bien desde el móvil,  
- que no haya saltos raros en la pantalla,  
- que Google entienda de qué va tu sitio.

---

## Qué mide Lighthouse exactamente (explicado fácil)

### 1. Performance (velocidad percibida)

Aquí hay muchos siglas (LCP, CLS, TBT…), pero lo más importante es:

- **Qué tarda en verse el contenido principal**.
- Si la página **se puede usar** rápido (tocar botones, rellenar formularios…).
- Si la página **no pega saltos** mientras se carga (muy típico con banners e imágenes grandes).

En cristiano: *si tu web se siente lenta, la nota de Performance será baja*.

---

### 2. Accesibilidad

Comprueba cosas como:

- Si los textos tienen **buen contraste** (que se lean bien).
- Si las imágenes importantes tienen **texto alternativo**.
- Si se puede navegar con teclado, no solo con ratón.
- Si los elementos de la página están marcados correctamente (títulos, botones, formularios…).

No es solo “por cumplir”: una web accesible suele ser **más cómoda para todos**.

---

### 3. Best Practices (buenas prácticas)

Mira detalles técnicos que influyen en:

- **Seguridad** (recursos cargados por HTTPS, por ejemplo).
- **Calidad del código** (uso de APIs modernas y recomendadas).
- Errores técnicos que pueden dar problemas en algunos navegadores.

No necesitas entender cada punto, pero sí saber que una mala nota aquí indica que **hay cosas técnicas que conviene revisar**.

---

### 4. SEO (parte técnica)

Este apartado **no es el SEO completo**, pero revisa la base:

- Si la página tiene **título y descripción**.
- Si es apta para móviles.
- Si el HTML está estructurado de forma que los buscadores lo entiendan.

Es como un mínimo técnico: que tu web **no esté poniendo trabas** a que Google la indexe.

---

## Cómo pasar Lighthouse a tu web (sin ser técnico)

Tienes varias formas, pero la más sencilla si no eres desarrollador es:

1. Ve a **PageSpeed Insights** (busca “PageSpeed Insights” en Google).
2. Escribe la **URL** de tu página (por ejemplo, la home o una landing importante).
3. Espera al análisis y verás las notas muy parecidas a las de Lighthouse, con explicaciones.

Si usas **Google Chrome** y te animas a un paso más:

1. Abre tu página en Chrome.
2. Haz clic derecho y elige **“Inspeccionar”**.
3. En la pestaña de herramientas, busca **“Lighthouse”** (según la versión puede salir dentro de “Más herramientas”).
4. Elige si quieres analizar en móvil o escritorio y ejecuta el test.

Con eso ya puedes ver:

- tus notas por apartado,  
- y una lista de **recomendaciones ordenadas** (qué pesa más, qué podrías arreglar primero, etc.).

---

## Cómo interpretar los resultados sin agobiarte

Cuando veas la lista de recomendaciones, puede parecerte un idioma extraño:  
“Reduce el tamaño de los recursos JavaScript”, “Evita imágenes sin `width/height`”, “Elimina CSS no utilizado”…

Si no eres técnico, quédate con esta idea:

- **Mira primero qué se repite** entre diferentes páginas.
- Prioriza lo que Lighthouse marque como **“Oportunidad”** con más impacto.
- Si trabajas con alguien que te lleva la web, comparte el informe y pide:
  - una explicación rápida en lenguaje normal,  
  - qué acciones harían primero,  
  - qué mejoras puedes esperar (velocidad, estabilidad, etc.).

---

## Mi forma de usar Lighthouse en proyectos reales

En mis proyectos nuevos suelo construir con **Astro** y desplegar en plataformas modernas (como Netlify).  
¿El objetivo? Sitios:

- **rápidos** (código y recursos justos),
- **accesibles** desde el diseño,
- y **fáciles de mantener** con el tiempo.

Algunas prácticas que aplico casi siempre:

- Imágenes optimizadas y responsivas (formatos modernos, tamaños correctos, carga diferida).
- CSS sencillo y reutilizable, sin frameworks gigantes si no hacen falta.
- JavaScript solo donde aporta valor, evitando cargar cosas que el usuario no necesita.
- Metadatos SEO y etiquetas bien cuidadas desde el principio.
- Revisión periódica con Lighthouse para **detectar regresiones** (problemas nuevos que aparecen al hacer cambios).

El resultado típico: **notas muy altas (verde)** en Lighthouse sin tener que obsesionarse con llegar al 100 exacto.

---

## ¿Te sirve Lighthouse si no eres técnico?

Sí, y mucho, si:

- Tienes una web que es importante para tu negocio.
- Sospechas que **va lenta** o recibes quejas de usuarios.
- Estás invirtiendo en publicidad o SEO y quieres asegurarte de que la parte técnica **no es un cuello de botella**.

No necesitas entender cada detalle del informe, pero sí:

- Saber que existe,
- pedir que se use en tus revisiones,
- y usarlo como **termómetro** para ver si vais a mejor o a peor con el tiempo.

---

## ¿Quieres que revisemos tu web con Lighthouse?

Si te gustaría:

- Revisar las notas de tu web,
- traducir el informe a **acciones claras**,
- y tener una lista de mejoras ordenadas por impacto y esfuerzo,

puedo ayudarte a preparar un pequeño plan de acción.

¿Te interesa?  
**[Escríbeme](/contact)** y vemos tu caso.
