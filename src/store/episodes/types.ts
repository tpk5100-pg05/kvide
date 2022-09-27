import { Episode, EpisodeInsertable, EpisodeUpdatable, Symptom } from '@/store/types';
import { NotUndefined } from '@/utils/not-undefined';

type EpisodesState = Record<string, never>;

interface EpisodeQuery {
  ids?: NotUndefined<Episode['id']>[];

  before?: Date;
  after?: Date;

  start_time?: Date;
  end_time?: Date;

  treatment_effectiveness?: Episode['treatment_effectiveness'];
  pain_level?: Episode['pain_level'];

  symptoms?: NotUndefined<Symptom>['id'][];
  medications?: NotUndefined<Symptom>['id'][];

  notes?: string;

  limit?: number;
}

type EpisodeOrderBy = keyof Episode;
type EpisodeOrder = 'asc' | 'desc';

type Actions = {
  editEpisode: (id: NotUndefined<Episode['id']>, episode: EpisodeUpdatable) => Promise<void>;
  addEpisode: (episode: EpisodeInsertable) => Promise<Episode>;
  getEpisode: (id: NotUndefined<Episode['id']>) => Promise<Episode>;
  queryEpisodes: (
    query?: EpisodeQuery,
    order?: EpisodeOrder,
    orderBy?: EpisodeOrderBy,
  ) => Promise<Episode[]>;
  deleteEpisode: (id: NotUndefined<Episode['id']>) => Promise<void>;
};

export type { Actions, EpisodesState, EpisodeQuery, EpisodeOrder, EpisodeOrderBy };
