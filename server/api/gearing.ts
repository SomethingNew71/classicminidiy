import { options } from '../../data/models/gearing';

export default defineEventHandler((event) => {
  return { ...options };
});
