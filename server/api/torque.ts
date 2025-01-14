import type { TorqueSpecs } from '~/data/models/torque';
import specs from '../../data/torqueSpecs.json';

export default defineEventHandler((event): TorqueSpecs => {
  try {
    return { ...specs };
  } catch (error) {
    console.error('Error fetching torque specs:', error);
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
});
