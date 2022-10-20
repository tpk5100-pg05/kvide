import RoundIcon from './RoundIcon';
import { PAIN_COLORS } from '@/constants/colors';

const PainIndicator = ({
  level,
  showAllLevels = false,
  size = 'md',
}: {
  level: number;
  showAllLevels?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) => {
  if (!showAllLevels && (level == 1.5 || level === 2.5)) {
    return <div></div>;
  }
  return (
    <RoundIcon color={PAIN_COLORS[Math.floor(level) - 1]} content={`${level || '?'}`} size={size} />
  );
};

export default PainIndicator;
