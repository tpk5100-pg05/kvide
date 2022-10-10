type AtomEffectParams = {
  // eslint-disable-next-line
  [key: string]: any;
};

interface Episode {
  id: Readonly<number>;
  start_time: Date;
  end_time?: Date;
  pain_level?: number;
  treatment_effectiveness?: TreatmentEffectiveness;
  symptoms: Symptom[];
  treatments: Treatment[];
  notes?: string;
}

const createDefaultEpisode = (): Episode => {
  const current_time = new Date();

  const end_time = new Date();
  end_time.setHours(end_time.getHours() + 1);

  return {
    id: -1,
    start_time: current_time,
    end_time: end_time,
    pain_level: 1,
    treatment_effectiveness: TreatmentEffectiveness.NO_IMPROVEMENT,
    symptoms: [],
    treatments: [],
    notes: '',
  };
};

const enum TreatmentEffectiveness {
  RELAPSE = 0,
  NO_IMPROVEMENT = 1,
  SOME_IMPROVEMENT = 2,
  GOOD_IMPROVEMENT = 3,
}

type EpisodeInsertable = Omit<Episode, 'id' | 'symptoms' | 'treatments'> & {
  symptoms: (Required<Pick<Symptom, 'id'>> & Partial<Pick<Symptom, 'name'>>)[];
  treatments: (Required<Pick<Treatment, 'id'>> & Partial<Pick<Treatment, 'name'>>)[];
};
type EpisodeUpdatable = Partial<Episode>;

interface Symptom {
  id: Readonly<number>;
  name: string;
  deleted?: boolean;
}

type SymptomInsertable = Omit<Symptom, 'id'>;
type SymptomUpdatable = Partial<SymptomInsertable>;

interface Treatment {
  id: Readonly<number>;
  name: string;
  deleted?: boolean;
}

type TreatmentInsertable = Omit<Treatment, 'id'>;
type TreatmentUpdatable = Partial<TreatmentInsertable>;

export type {
  AtomEffectParams,
  Episode,
  EpisodeInsertable,
  EpisodeUpdatable,
  Treatment,
  SymptomInsertable,
  TreatmentUpdatable,
  Symptom,
  TreatmentInsertable,
  SymptomUpdatable,
};

export { TreatmentEffectiveness, createDefaultEpisode };
