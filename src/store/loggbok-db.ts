import Dexie, { Table } from 'dexie';
import { Episode, Medication, Symptom } from '@/store/types';
import { WithOptionalProperty } from '@/utils/with-optional-property';
import { NotUndefined } from '@/utils/not-undefined';

export type SymptomSchema = WithOptionalProperty<Symptom, 'id'>;
export type MedicationSchema = WithOptionalProperty<Medication, 'id'>;
export type EpisodeSchema = Partial<Pick<Episode, 'id'>> &
  Omit<Episode, 'symptoms' | 'medications'> & {
    symptomIds: NotUndefined<SymptomSchema['id']>[];
    medicationIds: NotUndefined<MedicationSchema['id']>[];
  };

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
    const medications = await this.medications.where('id').anyOf(episode.medicationIds).toArray();
    const symptoms = await this.symptoms.where('id').anyOf(episode.symptomIds).toArray();

    return {
      id: episode.id,
      start_time: episode.start_time,
      end_time: episode.end_time,
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
