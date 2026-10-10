import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";

const contentFile = "src/data/content.json";

// helper function to keep JSON array positions in order
const addPosition = (items: object[]) => items.map((item, index) => ({ ...item, position: index }));

const profile = defineCollection({
  loader: file(contentFile, {
    parser: (text) => ({ profile: JSON.parse(text).profile }),
  }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    email: z.string(),
  }),
});

const links = defineCollection({
  loader: file(contentFile, {
    parser: (text) => addPosition(JSON.parse(text).links),
  }),
  schema: z.object({
    position: z.number(),
    label: z.string(),
    url: z.string(),
  }),
});

const skills = defineCollection({
  loader: file(contentFile, {
    parser: (text) => addPosition(JSON.parse(text).skills),
  }),
  schema: z.object({
    position: z.number(),
    name: z.string(),
  }),
});

const projects = defineCollection({
  loader: file(contentFile, {
    parser: (text) => addPosition(JSON.parse(text).projects),
  }),
  schema: ({ image }) =>
    z.object({
      position: z.number(),
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
