import RoundIcon from './RoundIcon';
import { getTreatmentSymbol } from '@/constants/symbols';
import { TREATMENT_IMPROVEMENT_COLORS } from '@/constants/colors';
import { TreatmentEffectiveness } from '@/store/types';

const TreatmentEfficacyIndicator = ({
  efficacy,
}: {
  efficacy: TreatmentEffectiveness | undefined;
}) => {
  return (
    <RoundIcon
      color={TREATMENT_IMPROVEMENT_COLORS[efficacy?.valueOf() || 2]}
      content={efficacy ? getTreatmentSymbol(efficacy) : '?'}
    />
  );
};

export default TreatmentEfficacyIndicator;
