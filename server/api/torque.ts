import type { TorqueSpecs } from '~/data/models/torque';
import specs from '../../data/torqueSpecs.json';

export default defineEventHandler((event): TorqueSpecs => {
  return { ...specs };
});
