// src/lib/config.ts
export const SITE = {
  title: "Adrián Mariscal",
  siteName: "Portfolio - Adrián Mariscal",
  description:
    "Rendimiento web, SEO técnico y UX para sitios rápidos con Astro y Node. Auditoría clara, métricas y mejoras accionables.",
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
  { href: "/about", label: "About" },
  { href: "/services", label: "Servicios" },
  { href: "/projects", label: "Proyectos" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contacto" },
] as const;
