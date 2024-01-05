import needles from '../../../data/needles.json';
import starterNeedles from '../../../data/default-needles.json';

export default defineEventHandler(() => {
  return {
    needles,
    starterNeedles,
  };
});
