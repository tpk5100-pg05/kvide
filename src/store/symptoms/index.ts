import { Symptom, SymptomInsertable, SymptomUpdatable } from '@/store/types';
import { loggbokDB } from '@/store/loggbok-db';
import { NotUndefined } from '@/utils/not-undefined';
import { SymptomOrder, SymptomOrderBy, SymptomQuery } from '@/store/symptoms/types';

const addSymptom = async (symptom: SymptomInsertable) => {
  const res = await loggbokDB.symptoms.add({ name: symptom.name });
  const createdSymptom = await loggbokDB.symptoms.get(res);

  if (!createdSymptom) {
    throw new Error('Could not create symptom');
  }

  return createdSymptom;
};

const editSymptom = async (id: NotUndefined<Symptom['id']>, symptom: SymptomUpdatable) => {
  await loggbokDB.symptoms.update(id, symptom);
};

const getSymptom = async (id: NotUndefined<Symptom['id']>): Promise<Symptom> => {
  const symptom = await loggbokDB.symptoms.get(id);

  if (!symptom) {
    throw new Error('Could not find symptom');
  }

  return symptom;
};

const querySymptoms = async (
  query: SymptomQuery = {},
  order: SymptomOrder,
  orderBy: SymptomOrderBy = 'id',
) => {
  let foundSymptoms = await Promise.resolve(
    !query.ids
      ? loggbokDB.symptoms.toCollection()
      : loggbokDB.symptoms.where('id').anyOf(query.ids),
  );

  if (typeof query.name_regex === 'undefined') {
    foundSymptoms = foundSymptoms.and((symptom) => !!query.name_regex?.test(symptom.name));
  }

  if (order === 'desc') {
    foundSymptoms = foundSymptoms.reverse();
  }

  return foundSymptoms.sortBy(orderBy);
};

const deleteSymptom = async (id: NotUndefined<Symptom['id']>) => {
  await loggbokDB.symptoms.delete(id);
};

export { addSymptom, editSymptom, getSymptom, querySymptoms, deleteSymptom };
