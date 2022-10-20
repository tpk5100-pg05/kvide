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
      return 'Mild pain. Can function';
    case 1.5:
      return 'Slight pain. Can somewhat function';
    case 2:
      return 'Moderate pain. Can function, but it is difficult ';
    case 2.5:
      return 'Severe pain. Can hardly function';
    case 3:
      return 'Extreme pain. Cannot function';
    default:
      return '?';
  }
};

export { getTreatmentEfficacyDescription, getPainLevelDescription };
