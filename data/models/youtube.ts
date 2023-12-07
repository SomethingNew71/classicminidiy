export interface YoutubeStatsResponse {
  kind: string;
  etag: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YoutubeStatsItem[];
}

export interface YoutubeStatsFEResponse {
  views: number | string;
  subscribers: number | string;
  videos: number | string;
}

export interface YoutubeStatsItem {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    title: string;
    description: string;
    customUrl: string;
    publishedAt: string;
    thumbnails: YoutubeThumbnails;
    localized: {
      title: string;
      description: string;
    };
    country: string;
  };
  contentDetails: {
    relatedPlaylists: {
      likes: string;
      uploads: string;
    };
  };
  statistics: {
    viewCount: string;
    subscriberCount: string;
    hiddenSubscriberCount: boolean;
    videoCount: string;
  };
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
export interface YoutubeVideoItemParsed {
  title: string;
  thumbnails: YoutubeThumbnailsParsed;
  publishedOn: string;
  videoUrl: string;
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
  error?: any;
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
