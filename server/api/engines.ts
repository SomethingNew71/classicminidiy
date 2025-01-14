import specs from '../../data/engineSize.json';

export default defineEventHandler((event) => {
  try {
    return { ...specs };
  } catch (error) {
    console.error('Error fetching engine specs:', error);
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
});
