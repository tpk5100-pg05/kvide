import { NotUndefined } from '@/utils/not-undefined';
import { Symptom } from '../types';

interface SymptomQuery {
  ids?: NotUndefined<Symptom['id']>[];
  name_regex?: RegExp;
  deleted?: boolean;
}

type SymptomOrderBy = keyof Symptom;
type SymptomOrder = 'asc' | 'desc';

export type { SymptomQuery, SymptomOrder, SymptomOrderBy };
