import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      endDate: z.coerce.date().optional(),
      time: z.string().optional(),
      location: z.string().optional(),
      recurring: z.string().optional(), // e.g. "3rd Monday of every month"
      image: image().optional(),
      imageAlt: z.string().optional(),
      cta: z.object({ label: z.string(), href: z.string() }).optional(),
    }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      excerpt: z.string().optional(),
      image: image().optional(),
    }),
});

export const collections = { events, news };
