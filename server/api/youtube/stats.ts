import axios from 'axios';
import type { YoutubeStatsFEResponse, YoutubeStatsResponse } from '~/data/models/youtube';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const baseURL = 'https://www.googleapis.com/youtube/v3/channels';
  const id = 'UCZIUfOFhrQ9nrR06IOoAJ2Q';
  const details = 'snippet,contentDetails,statistics';
  const feed = `${baseURL}?key=${config.app.youtubeAPIKey}&id=${id}&part=${details}`;
  try {
    return axios.get<YoutubeStatsResponse>(feed).then((response): YoutubeStatsFEResponse => {
      const items = response.data.items[0].statistics;
      const niceResponse: YoutubeStatsFEResponse = {
        views: Number(items.viewCount).toLocaleString(),
        subscribers: Number(items.subscriberCount).toLocaleString(),
        videos: Number(items.videoCount).toLocaleString(),
      };
      return { ...niceResponse };
    });
  } catch (error) {
    throw new Error(`Error with youtube stats API - ${error}`);
  }
});
