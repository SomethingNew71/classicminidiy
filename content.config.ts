import { defineCollection, defineContentConfig, z } from '@nuxt/content';
import { asSitemapCollection } from '@nuxtjs/sitemap/content';

export default defineContentConfig({
  collections: {
    content: defineCollection(
      // adds the robots frontmatter key to the collection
      asSitemapCollection({
        type: 'page',
        // @ts-ignore
        source: {
          include: ['**/*.md'],
        },
        schema: z.object({
          code: z.string(),
          download: z.string(),
          image: z.string(),
          author: z.string(),
        }),
      })
    ),
    manuals: defineCollection({
      type: 'page',
      source: '**/manuals/**/*.md',
      schema: z.object({
        code: z.string(),
        download: z.string(),
        image: z.string(),
        author: z.string(),
      }),
    }),
    adverts: defineCollection({
      type: 'page',
      source: '**/adverts/**/*.md',
      schema: z.object({
        code: z.string(),
        download: z.string(),
        image: z.string(),
        author: z.string(),
      }),
    }),
  },
});
