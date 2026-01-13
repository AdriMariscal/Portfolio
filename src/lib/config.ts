// src/lib/config.ts
export const SITE = {
  title: "Adrián Mariscal",
  siteName: "Portfolio - Adrián Mariscal",
  description:
    "Rendimiento web, SEO técnico y UX para sitios rápidos en Astro y Node. Proyectos, blog y contacto.",
  url: "https://adrianmariscal.es",
  lang: "es",
  author: "Adrián Mariscal",
  ogImage: "/logo.png",
  twitterCreator: "",
};

export const THEME = {
  color: "#0A0A0A", // theme-color/meta; coincide con el fondo del tema oscuro
};

export const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/projects", label: "Proyectos" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contacto" },
] as const;
