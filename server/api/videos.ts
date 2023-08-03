import axios from 'axios';
import { YoutubeDataResponse } from '~/data/models';
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
        return {
          title: item.snippet.title,
          thumbnails: item.snippet.thumbnails,
          publishedOn: item.snippet.publishedAt,
          videoUrl: `http://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
        };
      });
      return [...items.slice(0, 3)];
    })
    .catch((error) => {
      throw new Error(error);
    });
});
