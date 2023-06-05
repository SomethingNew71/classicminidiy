import diagrams from '../../data/wiringDiagrams.json';

export default defineEventHandler((event) => {
  return { ...diagrams };
});
