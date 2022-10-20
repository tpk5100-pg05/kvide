import { FunctionComponent, useMemo } from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';

import { queryEpisodes } from '@/store/episodes';

interface EpisodesWeekGraphProps {
  startDate?: Date;
  width?: number | string;
  height?: number | string;
  sx?: SxProps<Theme>;
}

const EpisodesWeekGraph: FunctionComponent<EpisodesWeekGraphProps> = ({
  startDate = dayjs().day(0).toDate(),
  width = '100%',
  height = '100%',
  sx = {},
}) => {
  const episodes = useLiveQuery(() => queryEpisodes({ after: startDate }, 'asc'));
  const entries = useMemo(() => {
    if (!episodes) return [];
    const slots = Array.from({ length: 7 }, (_, i) => ({
      day: dayjs(startDate).add(i, 'days').toDate(),
      pain_level: 0,
    }));

    for (const episode of episodes ?? []) {
      const day = dayjs(episode.start_time);
      const slot = slots.find((slot) => dayjs(slot.day).isSame(day, 'day'));
      if (!slot) continue;
      slot.pain_level = Math.max(slot.pain_level, episode.pain_level ?? 0);
      console.dir(slot);
    }

    return slots;
  }, [episodes, startDate]);

  return (
    <Box width={width} height={height} sx={sx}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={entries} margin={{ top: 16, bottom: 5, left: 5, right: 32 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" tickFormatter={(value) => dayjs(value).format('dddd')} />
          <YAxis domain={[0, 5]} width={32} />
          <Tooltip />
          <Bar dataKey="pain_level" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export { EpisodesWeekGraph };
