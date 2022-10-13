import { Episode } from '@/store/types';
import { Box, Card, Typography } from '@mui/material';

import dayjs from 'dayjs';
import { FlexBox } from '@/components/styled';
import PainIndicator from '@/components/Base/PainIndicator';
import TreatmentEfficacyIndicator from '@/components/Base/TreatmentEfficacyIndicator';

/**
 * Format a start and end date to a day, e.g Feb 26 - Feb 27
 * @param start_time The start time of the episode
 * @param end_time The end time of the episode
 * @returns formatted string
 */
const dayFormat = (start_time: Date, end_time: Date) => {
  if (dayjs(start_time).isSame(end_time, 'day')) {
    return dayjs(start_time).format('MMM D');
  }

  return dayjs(start_time).format('MMM D') + ' - ' + dayjs(end_time).format('MMM D');
};

/**
 * Format a start and end time to specic time, e.g 10:00 - 11:00
 * @param start_time
 * @param end_time
 * @returns formatted string
 */
const timeFormat = (start_time: Date, end_time: Date) => {
  return dayjs(start_time).format('HH:mm') + ' - ' + dayjs(end_time).format('HH:mm');
};

const EpisodeItem = ({ episode, onClick }: { episode: Episode; onClick: (id: number) => void }) => {
  return (
    <Box sx={{ p: 1, borderRadius: 10, width: '100%', cursor: 'pointer' }}>
      <div onClick={() => onClick(episode.id || 0)}>
        <Card sx={{ width: 'full' }}>
          <FlexBox sx={{ p: 1 }} flexDirection="row" alignItems={'center'}>
            <FlexBox sx={{ p: 1 }} flexDirection="column">
              <Box sx={{ p: 1 }}>
                <PainIndicator level={episode.pain_level ?? -1} />
              </Box>
              <Box sx={{ p: 1 }}>
                <TreatmentEfficacyIndicator level={episode.treatment_effectiveness ?? -1} />
              </Box>
            </FlexBox>
            <Box sx={{ flexGrow: 1 }}>
              <FlexBox flexDirection={'column'} sx={{ width: '100%', p: 1 }}>
                <Box sx={{ borderBottom: 1 }}>
                  <Typography variant={'subtitle1'} fontWeight={600}>
                    Symptoms:{' '}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ width: '100%' }}>
                    {episode.symptoms.map((symptom) => symptom.name).join(', ')}
                  </Typography>
                </Box>
                <Typography variant={'subtitle1'} fontWeight={600}>
                  Treatments:{' '}
                </Typography>
                <Typography variant="subtitle1">
                  {episode.treatments.map((treatment) => treatment.name).join(', ')}
                </Typography>
              </FlexBox>
            </Box>
            <FlexBox flexDirection={'column'} sx={{ alignItems: 'center', overflow: 'visible' }}>
              <Typography variant="subtitle1">
                {dayFormat(episode.start_time, episode.end_time || new Date())}
              </Typography>
              <Typography variant="body2" noWrap={true}>
                {timeFormat(episode.start_time, episode.end_time || new Date())}
              </Typography>
            </FlexBox>
          </FlexBox>
        </Card>
      </div>
    </Box>
  );
};

export default EpisodeItem;
