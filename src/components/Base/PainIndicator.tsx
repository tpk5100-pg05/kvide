import RoundIcon from './RoundIcon';
import { PAIN_COLORS } from '@/constants/colors';

const PainIndicator = ({ painLevel }: { painLevel: number }) => {
  return <RoundIcon color={PAIN_COLORS[painLevel - 1]} content={`${painLevel || '?'}`} />;
};

export default PainIndicator;
