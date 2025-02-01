import specs from '../../data/weights.json';
import type { Weights } from '~/data/models/weights';

export default defineEventHandler((): Weights => {
  try {
    return { ...specs };
  } catch (error) {
    console.error('Error fetching torque specs:', error);
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
});
