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
          exclude: ['**/companies/**/*.md'],
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
    companies: defineCollection({
      type: 'page',
      source: '**/companies/**/*.md',
      schema: z.object({
        code: z.string(),
        download: z.string(),
        image: z.string(),
        author: z.string(),
        slug: z.string(),
      }),
    }),
  },
});
