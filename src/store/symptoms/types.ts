import { NotUndefined } from '@/utils/not-undefined';
import { Symptom } from '../types';

interface SymptomQuery {
  ids?: NotUndefined<Symptom['id']>[];
  name_regex?: RegExp;
}

type SymptomOrderBy = keyof Symptom;
type SymptomOrder = 'asc' | 'desc';

export type { SymptomQuery, SymptomOrder, SymptomOrderBy };
