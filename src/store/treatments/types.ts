import { Treatment } from '@/store/types';
import { NotUndefined } from '@/utils/not-undefined';

interface TreatmentQuery {
  ids?: NotUndefined<Treatment['id']>[];
  name_regex?: RegExp;
}

type TreatmentOrderBy = keyof Treatment;
type TreatmentOrder = 'asc' | 'desc';

export type { TreatmentQuery, TreatmentOrder, TreatmentOrderBy };
