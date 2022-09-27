import { FullSizeCenteredFlexBox } from '@/components/styled';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const EpisodePage = () => {
  const { id } = useParams();

  return (
    <FullSizeCenteredFlexBox>
      <Typography variant={'h4'}>{'Episode Page ' + id}</Typography>
    </FullSizeCenteredFlexBox>
  );
};

export default EpisodePage;
