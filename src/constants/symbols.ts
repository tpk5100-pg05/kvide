import { TreatmentEffectiveness } from '@/store/types';

const getTreatmentSymbol = (effectiveness: TreatmentEffectiveness): string => {
  switch (effectiveness) {
    case TreatmentEffectiveness.RELAPSE:
      return 'R';
    case TreatmentEffectiveness.NO_IMPROVEMENT:
      return 'N';
    case TreatmentEffectiveness.SOME_IMPROVEMENT:
      return 'S';
    case TreatmentEffectiveness.GOOD_IMPROVEMENT:
      return 'G';
    default:
      return '?';
  }
};

export { getTreatmentSymbol };
