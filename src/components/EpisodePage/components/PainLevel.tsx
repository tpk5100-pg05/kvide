import PainIndicator from '@/components/Base/PainIndicator';
import { Box, Slider, Typography } from '@mui/material';

const marks = [1, 2, 3, 4, 5].map((painLevel) => ({
  value: painLevel,
  label: PainIndicator({ painLevel }),
}));

const PainLevel = ({
  isEdit,
  painLevel,
  onChange,
}: {
  isEdit: boolean;
  painLevel: number | undefined;
  onChange: (pain: number) => void;
}) => {
  return (
    <>
      <Box sx={{ width: '100%', p: 1 }}>
        <Typography variant="h6">Pain Level</Typography>
      </Box>
      {/* {isEdit ? ( */}
      <Slider
        step={1}
        min={1}
        max={5}
        defaultValue={painLevel}
        valueLabelDisplay="auto"
        marks={marks}
        onChange={(_, v) => {
          onChange(v as number);
        }}
        disabled={!isEdit}
      />
      {/* ) : (
        <Box>
          <PainIndicator painLevel={painLevel || 2} />
        </Box>
      )} */}
    </>
  );
};

export default PainLevel;
