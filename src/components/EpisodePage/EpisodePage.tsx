import { Episode } from '@/store/types';
import Edit from '@mui/icons-material/Edit';
import { Box, Button, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { FlexBox } from '../styled';
import PainLevel from './components/PainLevel';
import Symptoms from './components/Symptoms';

const EpisodePage = ({
  episode,
  onEpisodeSave,
  title,
  add = false,
}: {
  episode: Episode;
  onEpisodeSave: (ep: Episode) => void;
  title: string;
  add?: boolean;
}) => {
  const [isEditing, setIsEditing] = useState(Boolean(add));
  const [updatedEpisode, setUpdatedEpisode] = useState(episode);

  const onPainLevelChange = useCallback((pain: number) => {
    console.log('onPainLevelChange', pain);
    setUpdatedEpisode((prev) => ({ ...prev, pain_level: pain }));
  }, []);

  const onSave = () => {
    onEpisodeSave(updatedEpisode);
    setIsEditing(false);
  };

  return (
    <>
      <FlexBox flexDirection={'column'} sx={{ width: '100%', alignItems: 'center', p: 5 }}>
        <Typography variant="h4" component="h1" sx={{ marginBottom: 2, display: 'inline-block' }}>
          {title}
        </Typography>
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            style={{ cursor: 'hover', float: 'right' }}
            color="info"
          >
            <Edit />
          </Button>
        ) : (
          <Button onClick={onSave}>Save</Button>
        )}
        <Box sx={{ p: 2, width: '100%' }}></Box>
        <PainLevel isEdit={isEditing} painLevel={episode.pain_level} onChange={onPainLevelChange} />
        <Box sx={{ p: 2, width: '100%' }}></Box>
        <Symptoms isEdit={isEditing} symptoms={episode.symptoms} />
      </FlexBox>
    </>
  );
};

export default EpisodePage;
