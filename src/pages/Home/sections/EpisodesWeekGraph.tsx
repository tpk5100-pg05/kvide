import { FunctionComponent, useMemo } from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { green, red } from '@mui/material/colors';
import dayjs from 'dayjs';

import { queryEpisodes } from '@/store/episodes';

interface EpisodesWeekGraphProps {
  startDate?: Date;
  width?: number | string;
  height?: number | string;
  sx?: SxProps<Theme>;
}

const EpisodesWeekGraph: FunctionComponent<EpisodesWeekGraphProps> = ({
  startDate = dayjs().day(0).startOf('day').toDate(),
  width = '100%',
  height = '100%',
  sx = {},
}) => {
  const endDate = useMemo(() => dayjs(startDate).add(7, 'day').endOf('day').toDate(), [startDate]);
  const episodes = useLiveQuery(() =>
    queryEpisodes({ after: startDate, before: endDate }, 'asc', 'start_time'),
  );

  return (
    <Box width={width} height={height} sx={sx}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={episodes} margin={{ top: 16, bottom: 5, left: 5, right: 32 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="start_time"
            tickFormatter={(value) => dayjs(value).format('ddd')}
            type="number"
            domain={[startDate.getTime(), endDate.getTime()]}
          />
          <YAxis domain={[0, 5]} width={32} />
          <Tooltip />
          <Line dataKey="pain_level" stroke={red[500]} />
          <Line dataKey="treatment_effectiveness" stroke={green[500]} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export { EpisodesWeekGraph };
