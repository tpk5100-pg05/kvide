import { Medication } from '@/store/types';
import { NotUndefined } from '@/utils/not-undefined';

interface MedicationQuery {
  ids?: NotUndefined<Medication['id']>[];
  name_regex?: RegExp;
}

type MedicationOrderBy = keyof Medication;
type MedicationOrder = 'asc' | 'desc';

export type { MedicationQuery, MedicationOrder, MedicationOrderBy };
