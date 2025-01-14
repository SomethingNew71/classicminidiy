import parts from '../../data/parts.json';

export default defineEventHandler((event) => {
  try {
    return { ...parts };
  } catch (error) {
    console.error('Error fetching parts:', error);
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
});
