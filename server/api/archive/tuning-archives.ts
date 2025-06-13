import type { ArchiveItem } from '~/data/models/archive';
import * as archives from '../../../data/archive/tuningArchiveList.json';

export default defineEventHandler((event): ArchiveItem[] => {
  // Set cache headers - cache for 1 day since archive data is static
  setResponseHeaders(event, {
    'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    'CDN-Cache-Control': 'public, max-age=86400',
  });

  try {
    // This data is static JSON, so we can return it directly
    return archives.data;
  } catch (error: any) {
    console.error('Error loading tuning archives data:', error);

    // Return a proper error response
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to load tuning archives data: ${error.message || 'Unknown error'}`,
    });
  }
});
