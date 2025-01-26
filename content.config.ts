import { defineCollection, defineContentConfig, z } from '@nuxt/content';
// @ts-ignore
// import { asSitemapCollection } from '@nuxtjs/sitemap';

export default defineContentConfig({
  collections: {
    content: defineCollection({
      // Load every file inside the `content` directory
      source: '**/*.md',
      // Specify the type of content in this collection
      type: 'page',
      schema: z.object({
        tags: z.array(z.string()),
        image: z.string(),
        date: z.date(),
      }),
    }),
    // @ts-ignore
    // sitemap: asSitemapCollection({
    //   type: 'page',
    //   source: '**/*.md',
    // }),
  },
});
