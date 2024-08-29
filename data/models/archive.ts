import type { ParsedContent } from '@nuxt/content';

export interface ArchiveCard {
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface Post extends ParsedContent {
  image?: string;
  author?: string;
  date?: string;
  description?: string;
  slug?: string;
  code?: string;
  download?: string;
}
