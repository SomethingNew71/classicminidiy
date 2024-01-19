import Needles from '~/data/needles.json';
import StarterNeedles from '~/data/default-needles.json';
import type { Needle } from '~/data/models/needles';

export default defineEventHandler((): { all: Needle[]; initial: Needle[] } => {
  return {
    all: Needles,
    initial: StarterNeedles,
  };
});
