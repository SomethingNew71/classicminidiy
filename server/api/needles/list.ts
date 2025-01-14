import Needles from '~/data/needles.json';
import StarterNeedles from '~/data/default-needles.json';
import type { NeedleResponse } from '~/data/models/needles';

export default defineEventHandler(async (): Promise<NeedleResponse> => {
  try {
    return await {
      all: Needles,
      initial: StarterNeedles,
    };
  } catch (error: any) {
    return { all: [], initial: [], error: 'Failed to load needles data' };
  }
});
