import { Medication, MedicationInsertable, MedicationUpdatable } from '@/store/types';
import { loggbokDB, MedicationSchema } from '@/store/loggbok-db';
import { NotUndefined } from '@/utils/not-undefined';
import { MedicationOrder, MedicationOrderBy, MedicationQuery } from '@/store/medications/types';

const addMedication = async (medication: MedicationInsertable): Promise<Medication> => {
  const res = await loggbokDB.medications.add({ name: medication.name } as MedicationSchema);
  const createdMedication = await loggbokDB.medications.get(res);

  if (!createdMedication) {
    throw new Error('Could not create medication');
  }

  return createdMedication;
};

const editMedication = async (
  id: NotUndefined<Medication['id']>,
  medication: MedicationUpdatable,
) => {
  await loggbokDB.medications.update(id, medication);
};

const getMedication = async (id: NotUndefined<Medication['id']>): Promise<Medication> => {
  const medication = await loggbokDB.medications.get(id);

  if (!medication) {
    throw new Error('Could not find medication');
  }

  return medication;
};

const queryMedications = async (
  query: MedicationQuery = {},
  order: MedicationOrder = 'asc',
  orderBy: MedicationOrderBy = 'id',
): Promise<Medication[]> => {
  let foundMedications = await Promise.resolve(
    !query.ids
      ? loggbokDB.medications.toCollection()
      : loggbokDB.medications.where('id').anyOf(query.ids),
  );

  if (typeof query.name_regex !== 'undefined') {
    foundMedications = foundMedications.and(
      (medication) => !!query.name_regex?.test(medication.name),
    );
  }

  if (order === 'desc') {
    foundMedications = foundMedications.reverse();
  }

  return foundMedications.sortBy(orderBy);
};

const deleteMedication = async (id: NotUndefined<Medication['id']>) => {
  await loggbokDB.medications.delete(id);
};

export { addMedication, editMedication, getMedication, queryMedications, deleteMedication };
