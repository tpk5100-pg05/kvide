import EpisodesContainer from '@/components/EpisodesContainer';
import Meta from '@/components/Meta';
import { FlexBox } from '@/components/styled';
import { routes } from '@/routes';
import { Pages } from '@/routes/types';
import { queryEpisodes } from '@/store/episodes';
import { useLiveQuery } from 'dexie-react-hooks';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EpisodesWeekGraph } from './sections/EpisodesWeekGraph';

function Home() {
  const episodeIncrement = 5;
  const [fetchedEpisodes, setFetchedEpisodes] = useState(episodeIncrement);
  const navigate = useNavigate();

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
        <EpisodesWeekGraph height={255} />
        {episodes && (
          <EpisodesContainer
            onBottomScrolled={onBottomScrolled}
            episodes={episodes}
            onAddNewEpisode={() => {
              navigate(routes[Pages.EpisodeAdd].path);
            }}
            showAddButton={true}
          />
        )}
      </FlexBox>
    </>
  );
}

export default Home;
