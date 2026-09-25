import type { PeriodUnit } from '../data-source.models.js';

export type PeriodEntity = {
  _id: string;
  name: string;
  unit: PeriodUnit;
  values: string[];
  createdAt: Date;
};
