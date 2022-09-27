import { Episode } from '@/store/types';
import { Typography } from '@mui/material';
// import { useState } from 'react';
import { FullSizeCenteredFlexBox } from '../styled';

const Episode = ({
  //   add,
  episode,
}: //   onSaveEpisode,
{
  add: boolean;
  episode?: Episode;
  onSaveEpisode: (episode: Episode) => void;
}) => {
  //   const [edit, setEdit] = useState<boolean>(add);

  // TODO: implement visualization and form version for every field in episode

  return (
    <FullSizeCenteredFlexBox>
      <Typography variant={'h4'}>{`Showing episode: ${episode?.id}`}</Typography>
    </FullSizeCenteredFlexBox>
  );
};
