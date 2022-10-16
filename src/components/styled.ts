import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const FlexBox = styled(Box)({
  display: 'flex',
});

const CenteredFlexBox = styled(FlexBox)({
  justifyContent: 'center',
  alignItems: 'center',
});

const FullSizeCenteredFlexBox = styled(CenteredFlexBox)({
  width: '100%',
  height: '100%',
});

const BorderedCenteredFlexBox = styled(CenteredFlexBox)({
  tp: 4,
  width: '80%',
  border: '10px',
  borderRadius: '20px',
  borderColor: 'white',
  backgroundColor: '#83577A',
  opacity: 0.9,
});

export { FlexBox, CenteredFlexBox, FullSizeCenteredFlexBox, BorderedCenteredFlexBox };
