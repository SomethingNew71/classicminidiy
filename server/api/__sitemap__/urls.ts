//@ts-ignore
import type { ParsedContent } from '@nuxt/content/dist/runtime/types';
import { serverQueryContent } from '#content/server';

export default defineSitemapEventHandler(async (e: any) => {
  const contentList = (await serverQueryContent(e).find()) as ParsedContent[];
  return contentList.map((c) => {
    return asSitemapUrl({ loc: c._path, images: c.image ? [c.image] : [] });
  });
});
