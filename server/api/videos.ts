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
  const feed = `${baseURL}?key=${config.app.youtubeAPIKey}&playlistId=${id}&part=${details}`;
  try {
    return await axios.get<YoutubeDataResponse>(feed).then((response): YoutubeVideoItemParsed[] => {
      const items = response.data.items.map((item) => {
        return {
          title: item.snippet.title,
          thumbnails: organizeThumbnails(item.snippet.thumbnails),
          publishedOn: DateTime.fromISO(item.snippet.publishedAt).toFormat('LLL dd, yyyy'),
          videoUrl: `http://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
        };
      });
      return [...items.slice(0, 3)];
    });
  } catch (error) {
    throw new Error(`Error with youtube API - ${error}`);
  }

  function organizeThumbnails(thumbs: YoutubeThumbnails): YoutubeThumbnailsParsed {
    try {
      let defaultThumb = thumbs.default ? thumbs.default.url : '';
      let standardThumb = thumbs.standard ? thumbs.standard.url : defaultThumb;
      return {
        default: defaultThumb,
        medium: thumbs.medium ? thumbs.medium.url : defaultThumb,
        high: thumbs.high ? thumbs.high.url : defaultThumb,
        standard: standardThumb,
        maxres: thumbs.maxres ? thumbs.maxres.url : standardThumb,
      };
    } catch (error) {
      return {
        error: error,
        default: '',
        medium: '',
        high: '',
        standard: '',
        maxres: '',
      };
    }
  }
});
