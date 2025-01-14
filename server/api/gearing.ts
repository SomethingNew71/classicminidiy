import { options } from '../../data/models/gearing';

export default defineEventHandler((event) => {
  try {
    return { ...options };
  } catch (error) {
    console.error('Error fetching gearing options:', error);
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
});
