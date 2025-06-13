import Needles from '~/data/needles.json';
import StarterNeedles from '~/data/default-needles.json';
import type { NeedleResponse } from '~/data/models/needles';

export default defineEventHandler(async (event): Promise<NeedleResponse> => {
  // Set cache headers - cache for 1 day since needle data is static
  setResponseHeaders(event, {
    'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    'CDN-Cache-Control': 'public, max-age=86400',
  });

  try {
    // This data is static JSON, so we can return it directly
    return {
      all: Needles,
      initial: StarterNeedles,
    };
  } catch (error: any) {
    console.error('Error loading needles data:', error);

    // Return a proper error response
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to load needles data: ${error.message || 'Unknown error'}`,
    });
  }
});
