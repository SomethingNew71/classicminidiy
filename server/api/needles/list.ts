import Needles from '~/data/needles.json';
import StarterNeedles from '~/data/default-needles.json';
import type { NeedleResponse } from '~/data/models/needles';

export default defineEventHandler(async (): Promise<NeedleResponse> => {
  return await {
    all: Needles,
    initial: StarterNeedles,
  };
});
