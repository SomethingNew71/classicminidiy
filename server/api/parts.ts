import parts from '../../data/parts.json';

export default defineEventHandler((event) => {
  return { ...parts };
});
