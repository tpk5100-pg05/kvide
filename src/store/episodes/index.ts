import { EpisodeOrder, EpisodeOrderBy, EpisodeQuery } from './types';
import { Episode, EpisodeInsertable, EpisodeUpdatable } from '@/store/types';
import { EpisodeSchema, EpisodeSchemaInsertable, loggbokDB } from '@/store/loggbok-db';
import { NotUndefined } from '@/utils/not-undefined';

const addEpisode = async (episode: EpisodeInsertable) => {
  const episodeToCreate: EpisodeSchemaInsertable = {
    start_time: episode.start_time,
    end_time: episode.end_time,
    pain_level: episode.pain_level,
    treatment_effectiveness: episode.treatment_effectiveness,
    notes: episode.notes,
    symptomIds: episode.symptoms.map((symptom) => symptom.id),
    treatmentIds: episode.treatments.map((treatment) => treatment.id),
  };

  const res = await loggbokDB.episodes.add(episodeToCreate as EpisodeSchema);
  const createdEpisode = await loggbokDB.episodes.get(res);

  if (!createdEpisode) {
    throw new Error('Could not create episode');
  }

  return loggbokDB.joinEpisodeRow(createdEpisode);
};

const editEpisode = async (id: NotUndefined<Episode['id']>, episode: EpisodeUpdatable) => {
  const episodeToEdit: EpisodeSchema = {
    id: id,
    start_time: episode.start_time,
    end_time: episode.end_time,
    pain_level: episode.pain_level,
    treatment_effectiveness: episode.treatment_effectiveness,
    notes: episode.notes,
    symptomIds: episode.symptoms.map((symptom) => symptom.id),
    treatmentIds: episode.treatments.map((treatment) => treatment.id),
  };
  await loggbokDB.episodes.update(id, episodeToEdit);
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
  let foundEpisodes = await Promise.resolve(
    !query.ids
      ? loggbokDB.episodes.toCollection()
      : loggbokDB.episodes.where('id').anyOf(query.ids),
  );

  if (typeof query.start_time !== 'undefined') {
    foundEpisodes = foundEpisodes.and((episode) => episode.start_time === query.start_time);
  }
  if (typeof query.end_time !== 'undefined') {
    foundEpisodes = foundEpisodes.and((episode) => episode.end_time === query.end_time);
  }
  if (typeof query.notes !== 'undefined') {
    // TODO: fix type error
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    foundEpisodes = foundEpisodes.and((episode) => !!episode.notes?.includes(query.notes!));
  }
  if (query.symptoms) {
    foundEpisodes = foundEpisodes.and((episode) =>
      episode.symptomIds.some((id) => query.symptoms?.includes(id)),
    );
  }
  if (query.treatments) {
    foundEpisodes = foundEpisodes.and((episode) =>
      episode.treatmentIds.some((id) => query.treatments?.includes(id)),
    );
  }
  if (typeof query.before !== 'undefined') {
    // TODO: fix type error
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    foundEpisodes = foundEpisodes.and((episode) => episode.start_time < query.before!);
  }
  if (typeof query.after !== 'undefined') {
    // TODO: fix type error
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    foundEpisodes = foundEpisodes.and((episode) => episode.start_time > query.after!);
  }
  if (typeof query.treatment_effectiveness !== 'undefined') {
    foundEpisodes = foundEpisodes.and(
      (episode) => episode.treatment_effectiveness === query.treatment_effectiveness,
    );
  }
  if (typeof query.pain_level !== 'undefined') {
    foundEpisodes = foundEpisodes.and((episode) => episode.pain_level === query.pain_level);
  }

  if (order === 'desc') {
    foundEpisodes = foundEpisodes.reverse();
  }

  if (query.limit) {
    foundEpisodes = foundEpisodes.limit(query.limit);
  }

  return loggbokDB.joinEpisodeRows(await foundEpisodes.sortBy(orderBy));
};

const deleteEpisode = async (id: NotUndefined<Episode['id']>) => {
  await loggbokDB.episodes.delete(id);
};

export { addEpisode, editEpisode, getEpisode, queryEpisodes, deleteEpisode };
