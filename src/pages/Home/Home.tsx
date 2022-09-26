import EpisodeContainer from '@/components/EpisodeContainer';
import Graph from '@/components/Graph';
import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { queryEpisodes } from '@/store/episodes';
import { useLiveQuery } from 'dexie-react-hooks';
import { useCallback, useState } from 'react';

function Home() {
  const episodeIncrement = 10;

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
      <FullSizeCenteredFlexBox flexDirection={'column'}>
        <Graph />
        {episodes && (
          <EpisodeContainer
            onBottomScrolled={onBottomScrolled}
            episodes={episodes}
            onAddNewEpisode={() => {
              console.log('adding new episode');
            }}
          />
        )}
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Home;
