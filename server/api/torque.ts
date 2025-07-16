import type { TorqueSpecs } from '../../data/models/torque';
import specs from '../../data/torqueSpecs.json';

export default defineEventHandler((event): TorqueSpecs => {
  try {
    // Set cache headers for better performance - cache for 1 day
    setResponseHeaders(event, {
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'CDN-Cache-Control': 'public, max-age=86400',
    });

    return { ...specs };
  } catch (error) {
    console.error('Error fetching torque specs:', error);
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
});
