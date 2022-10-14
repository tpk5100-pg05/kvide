import RoundIcon from './RoundIcon';
import { getTreatmentSymbol } from '@/constants/symbols';
import { TREATMENT_IMPROVEMENT_COLORS } from '@/constants/colors';

const TreatmentEfficacyIndicator = ({
  level,
  size = 'md',
}: {
  level: number;
  size?: 'sm' | 'md' | 'lg';
}) => {
  return (
    <RoundIcon
      color={TREATMENT_IMPROVEMENT_COLORS[level]}
      content={getTreatmentSymbol(level)}
      size={size}
    />
  );
};

export default TreatmentEfficacyIndicator;
