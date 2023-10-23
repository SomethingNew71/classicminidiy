import type { ParsedContent } from '@nuxt/content/dist/runtime/types';
import { DateTime } from 'luxon';

//server/api/_sitemap-urls.ts
export default cachedEventHandler(
  async () => {
    const blogPages = await $fetch<ParsedContent>('/api/_content/query', {
      method: 'GET',
      query: {
        _params: { where: [{ _path: '--REGEX /^/' }], limit: 100 },
      },
    }).then((res) => res);

    return blogPages.map((page: any) => ({
      loc: page._path,
      lastmod: DateTime.fromFormat(page.date, 'LLLL dd yyyy'),
      changefreq: 'daily',
      priority: 0.8,
    }));
  },
  {
    name: 'Classic Mini DIY',
    maxAge: 60 * 10, // cache URLs for 10 minutes
  }
);
