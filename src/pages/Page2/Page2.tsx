import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import useEpisodes from '@/store/episodes';
import { useEffect } from 'react';

function Page2() {
  const [episodes, episodesActions] = useEpisodes();

  useEffect(() => {
    if (episodes.episodes.length <= 0) {
      try {
        episodesActions.fetchAllEpisodes();
      } catch (e) {
        console.error(e);
      }
    }
  });

  const saveEpisode = async () => {
    try {
      await episodesActions.addEpisode({
        id: `${(episodes?.episodes?.length || 0) + 2}`,
        start_time: '2021-10-10T10:10:10.000Z',
        end_time: '2021-10-10T10:10:10.000Z',
        symptoms: [],
        medication: [],
      });
    } catch (error) {
      console.log('could not add episode', error); // replace with actual error handling
      // through form
    }
  };

  return (
    <>
      <Meta title="page 2" />
      <FullSizeCenteredFlexBox flexDirection={'column'}>
        <Typography variant="h3">Home</Typography>
        {episodes.episodes !== null &&
          episodes.episodes.map((episode, index) => (
            <Typography key={index}>{episode.id}</Typography>
          ))}
        <Button onClick={saveEpisode}>Add an episode</Button>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Page2;
