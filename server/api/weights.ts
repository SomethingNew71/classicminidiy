import specs from '../../data/weights.json';
import type { Weights } from '~/data/models/weights';

export default defineEventHandler((event): Weights => {
  try {
    // Set cache headers for better performance - cache for 1 day
    setResponseHeaders(event, {
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'CDN-Cache-Control': 'public, max-age=86400',
    });

    return { ...specs };
  } catch (error) {
    console.error('Error fetching weights data:', error);
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
});
