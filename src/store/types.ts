type AtomEffectParams = {
  // eslint-disable-next-line
  [key: string]: any;
};

interface Episode {
  id?: Readonly<number>;
  start_time: Date;
  end_time?: Date;
  pain_level?: number;
  treatment_effectiveness?: TreatmentEffectiveness;
  symptoms: Symptom[];
  medications: Medication[];
  notes?: string;
}

const enum TreatmentEffectiveness {
  RELAPSE = 0,
  NO_IMPROVEMENT = 1,
  SOME_IMPROVEMENT = 2,
  GOOD_IMPROVEMENT = 3,
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

export { TreatmentEffectiveness };
