import specs from '../../data/commonClearances.json';

export default defineEventHandler((event) => {
  try {
    return { ...specs };
  } catch (error) {
    console.error('Error fetching clearance specs:', error);
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
});
