import diagrams from '../../data/wiringDiagrams.json';

export default defineEventHandler((event) => {
  try {
    return { ...diagrams };
  } catch (error) {
    console.error('Error wiring diagrams:', error);
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
});
