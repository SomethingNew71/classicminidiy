import axios from 'axios';
import type {
  YoutubeDataResponse,
  YoutubeThumbnails,
  YoutubeThumbnailsParsed,
  YoutubeVideoItemParsed,
} from '~/data/models/youtube';
import * as _ from 'lodash';
import { DateTime } from 'luxon';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
  const id = 'UUZIUfOFhrQ9nrR06IOoAJ2Q';
  const details = 'snippet';
  const feed = `${baseURL}?key=${config.youtubeAPIKey}&playlistId=${id}&part=${details}`;

  try {
    const response = await axios.get<YoutubeDataResponse>(feed);
    const items = response.data.items.map((item) => ({
      title: item.snippet.title,
      thumbnails: organizeThumbnails(item.snippet.thumbnails),
      publishedOn: DateTime.fromISO(item.snippet.publishedAt).toFormat('LLL dd, yyyy'),
      videoUrl: `http://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
    }));
    return items.slice(0, 3);
  } catch (error: any) {
    throw new Error(`Error with youtube API - ${error?.message}`);
  }

  function organizeThumbnails(thumbs: YoutubeThumbnails): YoutubeThumbnailsParsed {
    const defaultThumb = thumbs.default?.url || '';
    const standardThumb = thumbs.standard?.url || defaultThumb;
    return {
      default: defaultThumb,
      medium: thumbs.medium?.url || defaultThumb,
      high: thumbs.high?.url || defaultThumb,
      standard: standardThumb,
      maxres: thumbs.maxres?.url || standardThumb,
    };
  }
});
