import { ParsedContent } from '@nuxt/content/dist/runtime/types';

export interface Color {
  primaryColor: string;
  code: string;
  imageSwatch: string;
  ditzlerPpgCode: string;
  duluxCode: string;
  name: string;
  shortCode: string;
  years: string;
  id: string;
  hasSwatch: boolean;
  images?: ColorImages[];
}

export interface ColorImages {
  url: string;
  contributor: string;
}

export interface YoutubeDataResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  items: YoutubeVideoItem[];
  pageInfo: YoutubePageInfo;
}

export interface YoutubeVideoItem {
  kind: string;
  etag: string;
  id: string;
  snippet: YoutubeSnippet;
}

export interface YoutubeSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: YoutubeThumbnails;
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: YoutubeResourceId;
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
}

export interface YoutubeThumbnails {
  default: ThumbnailDefault;
  standard: ThumbnailStandard;
  medium?: ThumbnailMedium;
  high?: ThumbnailHigh;
  maxres?: ThumbnailMaxres;
}
export interface YoutubeThumbnailsParsed {
  default: string;
  medium: string;
  high: string;
  standard: string;
  maxres: string;
}

export interface ThumbnailDefault {
  url: string;
  width: number;
  height: number;
}

export interface ThumbnailMedium {
  url: string;
  width: number;
  height: number;
}

export interface ThumbnailHigh {
  url: string;
  width: number;
  height: number;
}

export interface ThumbnailStandard {
  url: string;
  width: number;
  height: number;
}

export interface Post extends ParsedContent {
  image?: string;
  author?: string;
  date?: string;
  description?: string;
  slug?: string;
}

export interface ThumbnailMaxres {
  url: string;
  width: number;
  height: number;
}

export interface YoutubeResourceId {
  kind: string;
  videoId: string;
}

export interface YoutubePageInfo {
  totalResults: number;
  resultsPerPage: number;
}
