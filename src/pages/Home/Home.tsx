import EpisodeContainer from '@/components/EpisodeContainer';
import Graph from '@/components/Graph';
import Meta from '@/components/Meta';
import { FlexBox } from '@/components/styled';
import { queryEpisodes } from '@/store/episodes';
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
    setFetchedEpisodes((prev) => prev + episodeIncrement);
  }, [setFetchedEpisodes]);

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
        {episodes && (
          <EpisodeContainer
            onBottomScrolled={onBottomScrolled}
            episodes={episodes}
            onAddNewEpisode={() => {
              console.log('adding new episode');
            }}
            showAddButton={true}
          />
        )}
      </FlexBox>
    </>
  );
}

export default Home;
