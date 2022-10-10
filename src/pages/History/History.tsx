import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { useLiveQuery } from 'dexie-react-hooks';
import { queryEpisodes } from '@/store/episodes';
import { useCallback, useState } from 'react';
import EpisodesContainer from '@/components/EpisodesContainer';
import { EpisodeOrder, EpisodeOrderBy } from '@/store/episodes/types';
import Filters from './components/Filters';

function History() {
  const episodeIncrement = 5;

  const [fetchedEpisodes, setFetchedEpisodes] = useState(episodeIncrement);

  const [orderBy, setOrderBy] = useState<EpisodeOrderBy>('id');

  const [order, setOrder] = useState<EpisodeOrder>('desc');

  const episodes = useLiveQuery(
    () => queryEpisodes({ limit: fetchedEpisodes }, order, orderBy),
    [fetchedEpisodes, order],
  );

  const onBottomScrolled = useCallback(() => {
    setFetchedEpisodes((prev) => prev + episodeIncrement);
  }, [setFetchedEpisodes]);

  const onOrderByChange = useCallback((orderBy: EpisodeOrderBy) => {
    setOrderBy(orderBy);
  }, []);
  const onOrderChange = useCallback((order: EpisodeOrder) => {
    setOrder(order);
  }, []);

  if (!episodes) {
    return null;
  }

  return (
    <>
      <Meta title="history" />
      <FullSizeCenteredFlexBox flexDirection={'column'} sx={{ height: '100%' }}>
        <Filters
          onOrderChange={onOrderChange}
          onOrderByChange={onOrderByChange}
          sortOptions={['start_time', 'pain_level', 'treatment_effectiveness']}
          defaultOrderBy={'start_time'}
        />
        {episodes && <EpisodesContainer onBottomScrolled={onBottomScrolled} episodes={episodes} />}
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default History;
