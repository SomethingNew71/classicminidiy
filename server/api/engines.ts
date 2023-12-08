import specs from '../../data/engineSize.json';

export default defineEventHandler((event) => {
  return { ...specs };
});
