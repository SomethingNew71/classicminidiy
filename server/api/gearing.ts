import { options } from '../../data/models/gearing';

export default defineEventHandler((event) => {
  try {
    // Set cache headers for better performance - cache for 1 day
    setResponseHeaders(event, {
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'CDN-Cache-Control': 'public, max-age=86400',
    });

    return { ...options };
  } catch (error: any) {
    console.error('Error fetching gearing options:', error);
    const statusCode = error?.statusCode || 500;
    const statusMessage = error?.message || 'Internal Server Error';
    throw createError({ statusCode, statusMessage });
  }
});
