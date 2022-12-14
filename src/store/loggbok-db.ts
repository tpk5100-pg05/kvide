import Dexie, { Table } from 'dexie';
import { Episode, Treatment, Symptom, Trigger } from '@/store/types';
import { NotUndefined } from '@/utils/not-undefined';

export type SymptomSchema = Symptom;
export type SymptomSchemaInsertable = Omit<SymptomSchema, 'id'>;

export type TreatmentSchema = Treatment;
export type TreatmentSchemaInsertable = Omit<TreatmentSchema, 'id'>;

export type TriggerSchema = Trigger;
export type TriggerSchemaInsertable = Omit<TriggerSchema, 'id'>;

export type EpisodeSchema = Omit<Episode, 'symptoms' | 'treatments' | 'triggers'> & {
  symptomIds: NotUndefined<SymptomSchema['id']>[];
  treatmentIds: NotUndefined<TreatmentSchema['id']>[];
  triggerIds: NotUndefined<TreatmentSchema['id']>[];
};
export type EpisodeSchemaInsertable = Omit<EpisodeSchema, 'id'>;

export class LoggbokDB extends Dexie {
  episodes!: Table<EpisodeSchema, NotUndefined<EpisodeSchema['id']>>;
  treatments!: Table<TreatmentSchema, NotUndefined<TreatmentSchema['id']>>;
  symptoms!: Table<SymptomSchema, NotUndefined<SymptomSchema['id']>>;
  triggers!: Table<TriggerSchema, NotUndefined<TriggerSchema['id']>>;

  constructor() {
    super('loggbok-dexieDb');
    this.version(4).stores({
      episodes: '++id, start_time, end_time, *symptomIds, *treatmentIds, *triggerIds, notes',
      treatments: '++id, &name, deleted',
      symptoms: '++id, &name, deleted',
      triggers: '++id, &name, deleted',
    });
  }

  async joinEpisodeRow(episode: EpisodeSchema): Promise<Episode> {
    const treatments = await this.treatments
      .where('id')
      .anyOf(episode.treatmentIds || [])
      .toArray();
    const symptoms = await this.symptoms
      .where('id')
      .anyOf(episode.symptomIds || [])
      .toArray();
    const triggers = await this.triggers
      .where('id')
      .anyOf(episode.triggerIds || [])
      .toArray();

    if (!episode.id) {
      throw new Error('Episode id is undefined, this should not happen');
    }

    return {
      id: episode.id,
      start_time: episode.start_time,
      end_time: episode.end_time,
      pain_level: episode.pain_level,
      treatment_effectiveness: episode.treatment_effectiveness,
      treatments,
      symptoms,
      triggers,
      notes: episode.notes,
    };
  }

  async joinEpisodeRows(episodes: EpisodeSchema[]): Promise<Episode[]> {
    return Promise.all(episodes.map((episode) => this.joinEpisodeRow(episode)));
  }
}

export const loggbokDB = new LoggbokDB();
