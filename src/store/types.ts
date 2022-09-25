type AtomEffectParams = {
  // eslint-disable-next-line
  [key: string]: any;
};

interface Episode {
  id?: Readonly<number>;
  start_time: Date;
  end_time?: Date;
  symptoms: Symptom[];
  medications: Medication[];
  notes?: string;
}

type EpisodeInsertable = Omit<Episode, 'id' | 'symptoms' | 'medications'> & {
  symptoms: (Required<Pick<Symptom, 'id'>> & Partial<Pick<Symptom, 'name'>>)[];
  medications: (Required<Pick<Medication, 'id'>> & Partial<Pick<Medication, 'name'>>)[];
};
type EpisodeUpdatable = Partial<Episode>;

interface Symptom {
  id?: Readonly<number>;
  name: string;
}

type SymptomInsertable = Omit<Symptom, 'id'>;
type SymptomUpdatable = Partial<SymptomInsertable>;

interface Medication {
  id?: Readonly<number>;
  name: string;
}

type MedicationInsertable = Omit<Medication, 'id'>;
type MedicationUpdatable = Partial<MedicationInsertable>;

export type {
  AtomEffectParams,
  Episode,
  EpisodeInsertable,
  EpisodeUpdatable,
  Medication,
  SymptomInsertable,
  MedicationUpdatable,
  Symptom,
  MedicationInsertable,
  SymptomUpdatable,
};
