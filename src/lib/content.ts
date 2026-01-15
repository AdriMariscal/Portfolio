// src/lib/content.ts
import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

/** Nº total de proyectos (para la métrica del Hero) */
export async function countProjects() {
  const projects = await getCollection("projects");
  return projects.length;
}

/** Proyectos destacados (para la sección Featured) */
export async function getFeaturedProjects() {
  const projects = await getCollection("projects");
  return projects.filter(
    (project: CollectionEntry<"projects">) => project.data.featured === true
  );
}

/** Últimos posts (para “Últimos artículos” del index) */
export async function getRecentPosts(limit = 3) {
  const posts = await getCollection("blog");
  const published = posts.filter(
    (post: CollectionEntry<"blog">) => !post.data.draft
  );
  published.sort(
    (a: CollectionEntry<"blog">, b: CollectionEntry<"blog">) =>
      new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
  return published.slice(0, limit);
}

export const toSlug = (s: string) =>
  s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

// Helpers puros y reutilizables

export const slugifyTag = (tag: string) =>
  tag.toLowerCase().trim().replace(/\s+/g, '-');

// Dado un referer y el origin del sitio, devuelve una URL interna segura para "Volver"
export function computeBackHref(referer: string, siteOrigin = ''): string {
  const isInternal =
    referer.startsWith('/') ||
    (siteOrigin && referer.startsWith(siteOrigin)) ||
    referer.includes('/blog/') ||
    referer.includes('/tags/');

  function normalizeInternalRef(ref: string): string {
    try {
      if (ref.startsWith('/')) return ref;
      const u = new URL(ref);
      if (siteOrigin && u.origin === siteOrigin) {
        return `${u.pathname}${u.search}${u.hash}`;
      }
      if (u.pathname?.startsWith('/blog') || u.pathname?.startsWith('/tags')) {
        return `${u.pathname}${u.search}${u.hash}`;
      }
    } catch {
      // si no es URL válida, caemos a /blog
    }
    return '/blog';
  }

  return isInternal ? normalizeInternalRef(referer) : '/blog';
}
