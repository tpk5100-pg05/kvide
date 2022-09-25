import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';

import { useLiveQuery } from 'dexie-react-hooks';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import EpisodeActions from '@/store/episodes';
import { TreatmentEffectiveness } from '@/store/types';

function Page2() {
  const episodes = useLiveQuery(() => EpisodeActions.queryEpisodes());

  console.log(episodes);

  const saveEpisode = async () => {
    try {
      await EpisodeActions.addEpisode({
        start_time: new Date(),
        end_time: new Date(),
        pain_level: 1,
        treatment_effectiveness: TreatmentEffectiveness.SOME_IMPROVEMENT,
        symptoms: [],
        medications: [],
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
        {episodes &&
          episodes.map((episode) => <Typography key={episode.id}>{episode.id}</Typography>)}
        <Button onClick={saveEpisode}>Add an episode</Button>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Page2;
