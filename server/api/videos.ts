import axios from 'axios';
const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
  const id = 'UUZIUfOFhrQ9nrR06IOoAJ2Q';
  const details = 'snippet';

  const feed = `${baseURL}?key=${config.app.youtubeAPIKey}&playlistId=${id}&part=${details}`;

  return await axios
    .get<any>(feed)
    .then((response) => {
      const items = response.data.items.map((item: any) => {
        return {
          title: item.snippet.title,
          thumbnailUrl: item.snippet.thumbnails.medium,
          publishedOn: item.snippet.publishedAt,
          videoUrl: `http://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
        };
      });
      return [...items];
    })
    .catch((error) => {
      throw new Error(error);
    });
});