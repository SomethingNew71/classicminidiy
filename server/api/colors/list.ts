import type { Color } from '~/data/models/colors';
import colors from '../../../data/colors.json';

export default defineEventHandler((event): Color[] => {
  return colors;
});
