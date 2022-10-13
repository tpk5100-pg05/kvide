import { Treatment, TreatmentInsertable, TreatmentUpdatable } from '@/store/types';
import { loggbokDB, TreatmentSchema } from '@/store/loggbok-db';
import { NotUndefined } from '@/utils/not-undefined';
import { TreatmentOrder, TreatmentOrderBy, TreatmentQuery } from '@/store/treatments/types';

const addTreatment = async (treatment: TreatmentInsertable): Promise<Treatment> => {
  const res = await loggbokDB.treatments.add({ name: treatment.name } as TreatmentSchema);
  const createdTreatment = await loggbokDB.treatments.get(res);

  if (!createdTreatment) {
    throw new Error('Could not create treatment');
  }

  return createdTreatment;
};

const editTreatment = async (id: NotUndefined<Treatment['id']>, treatment: TreatmentUpdatable) => {
  await loggbokDB.treatments.update(id, treatment);
};

const getTreatment = async (id: NotUndefined<Treatment['id']>): Promise<Treatment> => {
  const treatment = await loggbokDB.treatments.get(id);

  if (!treatment) {
    throw new Error('Could not find treatment');
  }

  return treatment;
};

const queryTreatments = async (
  query: TreatmentQuery = {},
  order: TreatmentOrder = 'asc',
  orderBy: TreatmentOrderBy = 'id',
): Promise<Treatment[]> => {
  let foundTreatments = await Promise.resolve(
    !query.ids
      ? loggbokDB.treatments.toCollection()
      : loggbokDB.treatments.where('id').anyOf(query.ids),
  );

  // filter out deleted treatments
  foundTreatments = foundTreatments.and((treatment) => !!treatment.deleted === !!query.deleted);

  if (typeof query.name_regex !== 'undefined') {
    foundTreatments = foundTreatments.and((treatment) => !!query.name_regex?.test(treatment.name));
  }

  if (order === 'desc') {
    foundTreatments = foundTreatments.reverse();
  }

  return foundTreatments.sortBy(orderBy);
};

const deleteTreatment = async (id: NotUndefined<Treatment['id']>) => {
  const isTreatmentUsed = await loggbokDB.episodes.where('treatmentIds').equals(id).count();

  // soft delete if treatment is used in at least one episode
  if (isTreatmentUsed) {
    await loggbokDB.treatments.update(id, { deleted: true });
  } else {
    await loggbokDB.treatments.delete(id);
  }
};

export { addTreatment, editTreatment, getTreatment, queryTreatments, deleteTreatment };
