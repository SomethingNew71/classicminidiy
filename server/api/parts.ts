import parts from '../../data/parts.json';

export default defineEventHandler((event) => {
  try {
    // Set cache headers for better performance - cache for 1 day
    setResponseHeaders(event, {
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'CDN-Cache-Control': 'public, max-age=86400',
    });

    return { ...parts };
  } catch (error: any) {
    console.error('Error fetching parts:', error);
    // More detailed error handling
    const statusCode = error?.statusCode || 500;
    const statusMessage = error?.message || 'Internal Server Error';
    throw createError({ statusCode, statusMessage });
  }
});
