import axios from 'axios';
const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const baseURL = 'https://www.googleapis.com/youtube/v3/channels';
  const id = 'UCZIUfOFhrQ9nrR06IOoAJ2Q';
  const details = 'snippet,contentDetails,statistics';
  const feed = `${baseURL}?key=${config.app.youtubeAPIKey}&id=${id}&part=${details}`;

  return axios
    .get<any>(feed)
    .then((response) => {
      const items = response.data.items[0].statistics;
      const niceResponse = {
        views: Number(items.viewCount).toLocaleString(),
        subscribers: Number(items.subscriberCount).toLocaleString(),
        videos: Number(items.videoCount).toLocaleString(),
      };
      return { ...niceResponse };
    })
    .catch((error) => {
      throw new Error(error);
    });
});
