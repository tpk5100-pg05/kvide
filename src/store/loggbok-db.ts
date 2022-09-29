import Dexie, { Table } from 'dexie';
import { Episode, Medication, Symptom } from '@/store/types';
import { NotUndefined } from '@/utils/not-undefined';

export type SymptomSchema = Symptom;
export type SymptomSchemaInsertable = Omit<SymptomSchema, 'id'>;

export type MedicationSchema = Medication;
export type MedicationSchemaInsertable = Omit<MedicationSchema, 'id'>;

export type EpisodeSchema = Omit<Episode, 'symptoms' | 'medications'> & {
  symptomIds: NotUndefined<SymptomSchema['id']>[];
  medicationIds: NotUndefined<MedicationSchema['id']>[];
};
export type EpisodeSchemaInsertable = Omit<EpisodeSchema, 'id'>;

export class LoggbokDB extends Dexie {
  episodes!: Table<EpisodeSchema, NotUndefined<EpisodeSchema['id']>>;
  medications!: Table<MedicationSchema, NotUndefined<MedicationSchema['id']>>;
  symptoms!: Table<SymptomSchema, NotUndefined<SymptomSchema['id']>>;

  constructor() {
    super('loggbok-dexieDb');
    this.version(1).stores({
      episodes: '++id, start_time, end_time, *symptomIds, *medicationIds, notes',
      medications: '++id, &name',
      symptoms: '++id, &name',
    });
  }

  async joinEpisodeRow(episode: EpisodeSchema): Promise<Episode> {
    // const medications = await this.medications.where('id').anyOf(episode.medicationIds).toArray();
    // const symptoms = await this.symptoms.where('id').anyOf(episode.symptomIds).toArray();

    // for debugging purposes, REMEMEBER TO REMOVE
    const symptoms = [
      { id: 1, name: 'Headache' },
      { id: 2, name: 'Nausea' },
      { id: 3, name: 'Vomiting' },
      { id: 4, name: 'Dizziness' },
    ];

    const medications = [
      { id: 1, name: 'ibuprofen' },
      { id: 2, name: 'paracetamol' },
    ];

    if (!episode.id) {
      throw new Error('Episode id is undefined, this should not happen');
    }

    return {
      id: episode.id,
      start_time: episode.start_time,
      end_time: episode.end_time,
      pain_level: episode.pain_level,
      treatment_effectiveness: episode.treatment_effectiveness,
      medications,
      symptoms,
      notes: episode.notes,
    };
  }

  async joinEpisodeRows(episodes: EpisodeSchema[]): Promise<Episode[]> {
    return Promise.all(episodes.map((episode) => this.joinEpisodeRow(episode)));
  }
}

export const loggbokDB = new LoggbokDB();
