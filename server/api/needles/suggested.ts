import needles from '../../../data/suggestedNeedles.json';

export default defineEventHandler((event) => {
  // Set cache headers - cache for 1 day since suggested needles data is static
  setResponseHeaders(event, {
    'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    'CDN-Cache-Control': 'public, max-age=86400',
  });

  try {
    // This data is static JSON, so we can return it directly
    return needles;
  } catch (error: any) {
    console.error('Error loading suggested needles data:', error);

    // Return a proper error response
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to load suggested needles data: ${error.message || 'Unknown error'}`,
    });
  }
});
