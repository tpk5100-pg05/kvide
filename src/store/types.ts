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
  triggers: Trigger[];
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
    triggers: [],
    notes: '',
  };
};

interface PrintableEpisode {
  id: number;
  start_time: string;
  date_time: string;
  end_time: string;
  pain_level: string;
  treatment_effectiveness: string;
  symptoms: string;
  medications: string;
  triggers: string;
  notes: string;
}

interface PrintableNotes {
  notesNum: string;
  id: number;
  notes: string;
  date: string;
}

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
type EpisodeUpdatable = EpisodeInsertable;

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

interface Trigger {
  id: Readonly<number>;
  name: string;
  deleted?: boolean;
}

type TriggerInsertable = Omit<Treatment, 'id'>;
type TriggerUpdatable = Partial<TreatmentInsertable>;

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
  Trigger,
  TriggerInsertable,
  TriggerUpdatable,
  SymptomUpdatable,
  PrintableEpisode,
  PrintableNotes,
};

export { TreatmentEffectiveness, createDefaultEpisode };
