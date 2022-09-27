import EpisodeContainer from '@/components/EpisodeContainer';
import Graph from '@/components/Graph';
import Meta from '@/components/Meta';
import { FlexBox } from '@/components/styled';
import { queryEpisodes } from '@/store/episodes';
import { Box } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { useCallback, useState } from 'react';

function Home() {
  const episodeIncrement = 5;

  const [fetchedEpisodes, setFetchedEpisodes] = useState(episodeIncrement);
  const episodes = useLiveQuery(
    () => queryEpisodes({ limit: fetchedEpisodes }, 'desc'),
    [fetchedEpisodes],
  );

  const onBottomScrolled = useCallback(() => {
    setFetchedEpisodes(fetchedEpisodes + episodeIncrement);
  }, [setFetchedEpisodes, fetchedEpisodes]);

  if (!episodes) {
    return null;
  }

  return (
    <>
      <Meta title="Home" />
      <FlexBox
        flexDirection={'column'}
        sx={{ alignItems: 'center', height: '100%', width: '100%' }}
      >
        <Graph />
        <Box flexGrow={1} sx={{ flexGrow: 1, height: '0%', width: '100%' }}>
          {episodes && (
            <EpisodeContainer
              onBottomScrolled={onBottomScrolled}
              episodes={episodes}
              onAddNewEpisode={() => {
                console.log('adding new episode');
              }}
            />
          )}
        </Box>
      </FlexBox>
    </>
  );
}

export default Home;
