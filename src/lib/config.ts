// src/lib/config.ts
export const SITE = {
  title: "Adrián Mariscal",
  siteName: "Portfolio - Adrián Mariscal",
  description: "Arquitecto Salesforce & dev web ligero. Proyectos, blog y contacto.",
  url: "https://adrianmariscal.es",
  lang: "es",
  author: "Adrián Mariscal",
  ogImage: "/og-default.png",
  twitterCreator: "",
};

export const THEME = {
  color: "#0B1F3B", // theme-color/meta; coincide con tu primario
};

export const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/projects", label: "Proyectos" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contacto" },
] as const;
