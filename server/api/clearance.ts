import specs from '../../data/commonClearances.json';

export default defineEventHandler((event) => {
  return { ...specs };
});
