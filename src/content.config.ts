import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";

const contentFile = "src/data/content.json";

// helper function to keep JSON array positions in order
const inOrder = (items: object[]) => items.map((item, index) => ({ ...item, order: index }));

const profile = defineCollection({
  loader: file(contentFile, {
    parser: (text) => ({ profile: JSON.parse(text).profile }),
  }),
  schema: z.object({
    name: z.string(),
    titles: z.array(z.string()),
    tagline: z.string(),
    email: z.string(),
  }),
});

const links = defineCollection({
  loader: file(contentFile, {
    parser: (text) => inOrder(JSON.parse(text).links),
  }),
  schema: z.object({
    order: z.number(),
    label: z.string(),
    url: z.string(),
  }),
});

const skills = defineCollection({
  loader: file(contentFile, {
    parser: (text) => inOrder(JSON.parse(text).skills),
  }),
  schema: z.object({
    order: z.number(),
    name: z.string(),
  }),
});

const projects = defineCollection({
  loader: file(contentFile, {
    parser: (text) => inOrder(JSON.parse(text).projects),
  }),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      name: z.string(),
      repo: z.string(),
      description: z.string(),
      highlight: z.string(),
      website: z.string().optional(),
      stack: z.array(z.string()),
      image: image(),
    }),
});

export const collections = { profile, links, skills, projects };
