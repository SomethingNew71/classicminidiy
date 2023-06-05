import specs from '../../data/torqueSpecs.json';

export default defineEventHandler((event) => {
  return { ...specs };
});
