import { TreatmentEffectiveness } from '@/store/types';

const getTreatmentEfficacyDescription = (effectiveness: TreatmentEffectiveness): string => {
  switch (effectiveness) {
    case TreatmentEffectiveness.RELAPSE:
      return 'The treatment resulted in a full relapse of the symptoms';
    case TreatmentEffectiveness.NO_IMPROVEMENT:
      return 'The treatment did not result in any improvement';
    case TreatmentEffectiveness.SOME_IMPROVEMENT:
      return 'The treatment resulted in some improvement';
    case TreatmentEffectiveness.GOOD_IMPROVEMENT:
      return 'The treatment resulted in a good improvement of the symptom conditions';
    default:
      return '?';
  }
};

const getPainLevelDescription = (painLevel: number): string => {
  switch (painLevel) {
    case 1:
      return 'No pain';
    case 2:
      return 'Mild pain';
    case 3:
      return 'Moderate pain';
    case 4:
      return 'Severe pain';
    case 5:
      return 'Extreme pain';
    default:
      return '?';
  }
};

export { getTreatmentEfficacyDescription, getPainLevelDescription };
