import needles from '../../../data/suggestedNeedles.json';

export default defineEventHandler(() => {
  try {
    return needles;
  } catch (error: any) {
    return { error: 'Failed to load suggested needles' + error?.message };
  }
});
