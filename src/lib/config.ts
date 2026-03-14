// src/lib/config.ts
export const SITE = {
  title: "Adrián Mariscal",
  siteName: "Portfolio - Adrián Mariscal",
  description:
    "Web performance end-to-end con Astro y Node para sitios rápidos, claros y listos para convertir.",
  url: "https://adrianmariscal.es",
  lang: "es",
  author: "Adrián Mariscal",
  ogImage: "/logos/logo_fondo_Charcoal950.png",
  ogImageAlt: "Logo de Adrián Mariscal",
  twitterImage: "/logos/isotipo_transparente.png",
  twitterImageAlt: "Isotipo de Adrián Mariscal",
  twitterCard: "summary",
  twitterCreator: "",
  linkedin: "https://www.linkedin.com/in/adrianmariscal",
  github: "https://github.com/AdriMariscal",
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
