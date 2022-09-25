import { EpisodeOrder, EpisodeOrderBy, EpisodeQuery } from './types';
import { Episode, EpisodeInsertable, EpisodeUpdatable } from '@/store/types';
import { EpisodeSchema, loggbokDB } from '@/store/loggbok-db';
import { NotUndefined } from '@/utils/not-undefined';

const addEpisode = async (episode: EpisodeInsertable) => {
  const insertableEpisode: EpisodeSchema = {
    start_time: episode.start_time,
    end_time: episode.end_time,
    pain_level: episode.pain_level,
    treatmentEffectiveness: episode.treatment_effectiveness?.valueOf(),
    notes: episode.notes,
    symptomIds: episode.symptoms.map((symptom) => symptom.id),
    medicationIds: episode.medications.map((medication) => medication.id),
  };

  const res = await loggbokDB.episodes.add(insertableEpisode);
  const createdEpisode = await loggbokDB.episodes.get(res);

  if (!createdEpisode) {
    throw new Error('Could not create episode');
  }

  return loggbokDB.joinEpisodeRow(createdEpisode);
};

const editEpisode = async (id: NotUndefined<Episode['id']>, episode: EpisodeUpdatable) => {
  await loggbokDB.episodes.update(id, episode);
};

const getEpisode = async (id: NotUndefined<Episode['id']>) => {
  const episode = await loggbokDB.episodes.get(id);

  if (!episode) {
    throw new Error('Could not find episode');
  }

  return loggbokDB.joinEpisodeRow(episode);
};

const queryEpisodes = async (
  query: EpisodeQuery = {},
  order: EpisodeOrder = 'asc',
  orderBy: EpisodeOrderBy = 'id',
): Promise<Episode[]> => {
  let storedEpisodes = !query.ids
    ? await Promise.resolve(loggbokDB.episodes.toCollection())
    : await loggbokDB.episodes.where('id').anyOf(query.ids);

  if (query.start_time) {
    storedEpisodes = storedEpisodes.and((episode) => episode.start_time === query.start_time);
  }
  if (query.end_time) {
    storedEpisodes = storedEpisodes.and((episode) => episode.end_time === query.end_time);
  }
  if (query.notes) {
    // TODO: fix type error
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    storedEpisodes = storedEpisodes.and((episode) => !!episode.notes?.includes(query.notes!));
  }
  if (query.symptoms) {
    storedEpisodes = storedEpisodes.and((episode) =>
      episode.symptomIds.some((id) => query.symptoms?.includes(id)),
    );
  }
  if (query.medications) {
    storedEpisodes = storedEpisodes.and((episode) =>
      episode.medicationIds.some((id) => query.medications?.includes(id)),
    );
  }
  if (query.before) {
    // TODO: fix type error
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    storedEpisodes = storedEpisodes.and((episode) => episode.start_time < query.before!);
  }
  if (query.after) {
    // TODO: fix type error
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    storedEpisodes = storedEpisodes.and((episode) => episode.start_time > query.after!);
  }

  if (order === 'asc') {
    storedEpisodes = storedEpisodes.reverse();
  }

  return loggbokDB.joinEpisodeRows(await storedEpisodes.sortBy(orderBy));
};
export default {
  addEpisode,
  editEpisode,
  getEpisode,
  queryEpisodes,
};
