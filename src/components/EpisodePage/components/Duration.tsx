import { FlexBox } from '@/components/styled';
import { dayFormat, timeFormat } from '@/utils/dateFormat';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { Box, TextField, Typography } from '@mui/material';
import { useMemo } from 'react';
import { Dayjs } from 'dayjs';

const Duration = ({
  isEdit,
  start,
  end,
  onStartChange,
  onEndChange,
}: {
  isEdit: boolean;
  start: Date;
  end: Date;
  onStartChange: (start: Dayjs | null) => void;
  onEndChange: (end: Dayjs | null) => void;
}) => {
  const days = useMemo(() => {
    return dayFormat(start, end);
  }, [start, end]);

  const time = useMemo(() => {
    return timeFormat(start, end);
  }, [start, end]);

  if (isEdit) {
    return (
      <FlexBox>
        <MobileDateTimePicker
          label="From"
          inputFormat="YYYY/MM/DD HH:mm"
          value={start}
          onChange={onStartChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <Box sx={{ p: 2 }}></Box>
        <MobileDateTimePicker
          label="To"
          inputFormat="YYYY/MM/DD HH:mm"
          value={end}
          onChange={onEndChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </FlexBox>
    );
  }

  return (
    <FlexBox flexDirection={'column'} sx={{ alignItems: 'center', overflow: 'visible' }}>
      <Typography variant="subtitle1">{days}</Typography>
      <Typography variant="body2" noWrap={true}>
        {time}
      </Typography>
    </FlexBox>
  );
};

export default Duration;
