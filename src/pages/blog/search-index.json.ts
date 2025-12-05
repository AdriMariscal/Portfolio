// src/pages/blog/search-index.json.ts
import { getCollection } from "astro:content";

type BlogIndexItem = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date: string | null;
};

const toISO = (value: unknown): string | null => {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString();
  const asDate = new Date(String(value));
  const t = asDate.getTime();
  return Number.isNaN(t) ? null : asDate.toISOString();
};

export async function GET() {
  // Mismo criterio que en [slug].astro: solo posts que NO son draft
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  const index: BlogIndexItem[] = posts.map(({ slug, data }) => {
    const rawDate = (data as any).date;
    return {
      slug,
      title: data.title ?? "Artículo sin título",
      description: data.description ?? "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      date: toISO(rawDate),
    };
  });

  // Orden descendente por fecha, como el listado normal
  index.sort((a, b) => {
    const ta = a.date ? new Date(a.date).getTime() : 0;
    const tb = b.date ? new Date(b.date).getTime() : 0;
    return tb - ta;
  });

  return new Response(JSON.stringify(index), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      // Deja que el navegador lo cachee pero siempre validando con el ETag
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
