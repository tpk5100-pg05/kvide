import { Episode } from '@/store/types';
import { Box, Card, Typography } from '@mui/material';

import { PAIN_COLORS, TREATMENT_IMPROVEMENT_COLORS } from '@/constants/pain';

import dayjs from 'dayjs';
import { FlexBox } from '@/components/styled';

const timeFormat = (date: Date) => dayjs(date).format('HH:mm');

const EpisodeItem = ({ episode }: { episode: Episode }) => {
  return (
    <Box sx={{ p: 1, borderRadius: 10 }}>
      <Card>
        <FlexBox sx={{ p: 1 }} flexDirection="row" alignItems={'center'}>
          <FlexBox sx={{ p: 1 }} flexDirection="column">
            <RoundIcon
              color={PAIN_COLORS[episode.pain_level || 0]}
              content={`${episode.pain_level || '?'}`}
            />
            <RoundIcon
              color={TREATMENT_IMPROVEMENT_COLORS[episode.treatment_effectiveness?.valueOf() || 0]}
              content={`${episode.treatment_effectiveness || '?'}`}
            />
          </FlexBox>

          <Typography variant="subtitle1">{`${timeFormat(episode.start_time)} - ${timeFormat(
            episode.end_time || new Date(),
          )}`}</Typography>
        </FlexBox>
      </Card>
    </Box>
  );
};

const RoundIcon = ({ color, content }: { color: string; content: string }) => {
  return (
    <Box
      sx={{
        backgroundColor: color,
        borderRadius: '100%',
        width: '2rem',
        height: '2rem',
        textAlign: 'center',
      }}
    >
      <Typography variant="subtitle1">{content}</Typography>
    </Box>
  );
};

export default EpisodeItem;
