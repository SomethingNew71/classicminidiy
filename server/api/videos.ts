import axios from 'axios';
import { YoutubeDataResponse, YoutubeThumbnails, YoutubeThumbnailsParsed } from '~/data/models';
import * as _ from 'lodash';
const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
  const id = 'UUZIUfOFhrQ9nrR06IOoAJ2Q';
  const details = 'snippet';
  const feed = `${baseURL}?key=${config.app.youtubeAPIKey}&playlistId=${id}&part=${details}`;

  return await axios
    .get<YoutubeDataResponse>(feed)
    .then((response) => {
      const items = response.data.items.map((item) => {
        console.log(item.snippet.thumbnails);

        return {
          title: item.snippet.title,
          thumbnails: organizeThumbnails(item.snippet.thumbnails),
          publishedOn: item.snippet.publishedAt,
          videoUrl: `http://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
        };
      });
      return [...items.slice(0, 3)];
    })
    .catch((error) => {
      throw new Error(error);
    });
  function organizeThumbnails(thumbs: YoutubeThumbnails): YoutubeThumbnailsParsed {
    return {
      default: thumbs.default.url,
      medium: thumbs.medium ? thumbs.medium.url : thumbs.default.url,
      high: thumbs.high ? thumbs.high.url : thumbs.default.url,
      standard: thumbs.standard.url,
      maxres: thumbs.maxres ? thumbs.maxres.url : thumbs.standard.url,
    };
  }
});
