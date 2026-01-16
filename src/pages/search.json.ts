// src/pages/search.json.ts
import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

type SearchDocument = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  type: "post" | "project";
  url: string;
};

type TokenIndex = Record<string, Array<[string, number]>>;

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const tokenize = (value: string) =>
  normalize(value)
    .split(" ")
    .map((token) => token.trim())
    .filter((token) => token.length > 1);

const addTokens = (
  index: Map<string, Map<string, number>>,
  tokens: string[],
  docId: string,
  weight: number
) => {
  tokens.forEach((token) => {
    const perDoc = index.get(token) ?? new Map<string, number>();
    perDoc.set(docId, (perDoc.get(docId) ?? 0) + weight);
    index.set(token, perDoc);
  });
};

const toIndexObject = (index: Map<string, Map<string, number>>): TokenIndex => {
  const output: TokenIndex = {};
  for (const [token, byDoc] of index.entries()) {
    output[token] = Array.from(byDoc.entries());
  }
  return output;
};

export async function GET() {
  const posts = await getCollection(
    "blog",
    ({ data }: CollectionEntry<"blog">) => !data.draft && (data.published ?? true)
  );
  const projects = await getCollection(
    "projects",
    ({ data }: CollectionEntry<"projects">) => data.published ?? true
  );

  const documents: SearchDocument[] = [
    ...posts.map((post: CollectionEntry<"blog">) => ({
      id: `post-${post.slug}`,
      title: post.data.title ?? "Artículo sin título",
      description: post.data.description ?? "",
      tags: Array.isArray(post.data.tags) ? post.data.tags : [],
      type: "post" as const,
      url: `/blog/${post.slug}/`,
    })),
    ...projects.map((project: CollectionEntry<"projects">) => ({
      id: `project-${project.slug}`,
      title: project.data.title ?? "Proyecto sin título",
      description: project.data.description ?? "",
      tags: Array.isArray(project.data.tags) ? project.data.tags : [],
      type: "project" as const,
      url: `/projects/${project.slug}/`,
    })),
  ];

  const index = new Map<string, Map<string, number>>();

  documents.forEach((doc) => {
    addTokens(index, tokenize(doc.title), doc.id, 4);
    addTokens(index, tokenize(doc.description), doc.id, 2);
    addTokens(index, tokenize(doc.tags.join(" ")), doc.id, 3);
  });

  const payload = {
    documents,
    index: toIndexObject(index),
  };

  return new Response(JSON.stringify(payload), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
