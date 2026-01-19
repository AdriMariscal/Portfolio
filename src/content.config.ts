// src/content.config.ts
import { defineCollection, z } from "astro:content";

/** Schema auxiliar para URLs que pueden venir como string válido, "" o null */
const urlField = z.union([z.string().url(), z.literal(""), z.null()]).optional();
const optionalDate = z.preprocess(
  (value) => (value === "" || value === null ? undefined : value),
  z.coerce.date().optional()
);
const requiredDate = z.coerce.date();

/** BLOG */
const blog = defineCollection({
  type: "content",
  schema: z
    .object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
      date: requiredDate,
      updated: optionalDate,
      published: z.boolean().default(true),
    })
    .passthrough(),
});

/** PROJECTS */
const projects = defineCollection({
  type: "content",
  schema: z
    .object({
    title: z.string(),
      description: z.string().optional(),
      tags: z.array(z.string()).default([]),

      // estado / publicación
      published: z.boolean().default(true),
      active: z.boolean().optional(),
      status: z.string().optional(),

      // enlaces (aceptan url válida, "" o null)
      projectUrl: urlField,
      repoUrl: urlField,
      demoUrl: urlField,

      // opcionales genéricos
      date: optionalDate,
      updated: optionalDate,

      // changelog tipado
      changelog: z
        .array(
          z.object({
            version: z.string(),
            date: z.union([z.string(), z.date()]).optional(),
            changes: z
              .array(
                z.object({
                  type: z.string().optional(),
                  text: z.string(),
                })
              )
              .optional(),
          })
        )
        .default([]),
    })
    .passthrough(),
});

export const collections = { blog, projects };
