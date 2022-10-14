import RoundIcon from './RoundIcon';
import { PAIN_COLORS } from '@/constants/colors';

const PainIndicator = ({ level, size = 'md' }: { level: number; size?: 'sm' | 'md' | 'lg' }) => {
  return <RoundIcon color={PAIN_COLORS[level - 1]} content={`${level || '?'}`} size={size} />;
};

export default PainIndicator;
