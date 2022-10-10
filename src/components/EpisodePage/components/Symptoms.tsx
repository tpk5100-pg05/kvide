import { Symptom } from '@/store/types';
import { Card, Collapse, Typography } from '@mui/material';
import { Box } from '@mui/system';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { FlexBox } from '@/components/styled';
import { useState } from 'react';

const Symptoms = ({ symptoms }: { isEdit: boolean; symptoms: Symptom[] }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ width: '100%', cursor: 'pointer' }} component="div" onClick={() => setOpen(!open)}>
      <Card>
        <FlexBox sx={{ width: '100%', p: 2, alignItems: 'center' }}>
          <PsychologyAltIcon sx={{ fontSize: 40 }} />
          <Typography variant="h6">Symptoms</Typography>
          <Box sx={{ flexGrow: 1 }} />
          {!open ? (
            <ChevronRightIcon />
          ) : (
            <ChevronRightIcon sx={{ transform: 'rotate(90deg)', transisition: 'transform 0.2s' }} />
          )}
          <Collapse in={open}>
            {symptoms.map((symptom, index) => (
              <Box key={index} sx={{ borderTop: 2 }}>
                <Typography variant="subtitle1">{symptom.name}</Typography>
              </Box>
            ))}
          </Collapse>
        </FlexBox>
      </Card>
    </Box>
  );
};

export default Symptoms;
