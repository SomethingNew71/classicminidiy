import specs from '../../../data/engineCodes.json';

export default defineEventHandler((event) => {
  // Set cache headers - cache for 1 year since engine codes data is very static
  setResponseHeaders(event, {
    'Cache-Control': 'public, max-age=31536000, s-maxage=31536000',
    'CDN-Cache-Control': 'public, max-age=31536000',
  });

  try {
    // This data is static JSON, so we can return it directly
    return specs;
  } catch (error: any) {
    console.error('Error loading engine codes data:', error);

    // Return a proper error response
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to load engine codes data: ${error.message || 'Unknown error'}`,
    });
  }
});
