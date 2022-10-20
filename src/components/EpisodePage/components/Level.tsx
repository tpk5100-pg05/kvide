import { Box, Card, Slider, Typography } from '@mui/material';
import { useMemo } from 'react';

const Level = ({
  title,
  isEdit,
  level,
  onChange,
  Indicator,
  step = 1,
  steps,
  children,
}: {
  title: string;
  isEdit: boolean;
  level: number | undefined;
  onChange: (newLevel: number) => void;
  Indicator: ({ level }: { level: number }) => JSX.Element;
  step?: number;
  steps: number[];
  children?: JSX.Element;
}) => {
  const marks = useMemo(() => {
    return steps.map((level) => ({
      value: level,
      label: Indicator({ level }),
    }));
  }, [Indicator, steps]);

  return (
    <Card sx={{ width: '100%', p: 1, pb: 4, pr: 4, pl: 4 }}>
      <Box sx={{ width: '100%', p: 1 }}>
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Slider
        step={step}
        min={steps[0]}
        max={steps[steps.length - 1]}
        defaultValue={level}
        valueLabelDisplay="auto"
        marks={marks}
        onChange={(_, v) => {
          onChange(v as number);
        }}
        disabled={!isEdit}
      />
      {children && (
        <>
          <Box sx={{ pb: 4, width: '100%' }}></Box> {children}
        </>
      )}
    </Card>
  );
};

export default Level;
