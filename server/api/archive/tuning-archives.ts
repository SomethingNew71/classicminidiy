import type { ArchiveItem } from '~/data/models/archive';
import * as archives from '../../../data/archive/tuningArchiveList.json';

export default defineEventHandler((event): ArchiveItem[] => {
  return archives.data;
});
