import { Treatment } from '@/store/types';
import { NotUndefined } from '@/utils/not-undefined';

interface TriggerQuery {
  ids?: NotUndefined<Treatment['id']>[];
  name_regex?: RegExp;
  deleted?: boolean;
}

type TriggerOrderBy = keyof Treatment;
type TriggerOrder = 'asc' | 'desc';

export type { TriggerQuery, TriggerOrder, TriggerOrderBy };
