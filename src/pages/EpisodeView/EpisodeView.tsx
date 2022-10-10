import EpisodePage from '@/components/EpisodePage';
import { routes } from '@/routes';
import { Pages } from '@/routes/types';
import { queryEpisodes, editEpisode } from '@/store/episodes';
import { Episode } from '@/store/types';
import { useLiveQuery } from 'dexie-react-hooks';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EpisodeView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const episodes = useLiveQuery(() => {
    return queryEpisodes({ ids: [Number(id)] });
  }, [id]);

  const onEpisodeChange = useCallback(
    (episode: Episode) => {
      console.log('onEpisodeChange', episode);
      editEpisode(Number(id), episode);
    },
    [id],
  );

  if (!episodes) {
    return null;
  }

  if (episodes && episodes.length <= 0) {
    navigate(routes[Pages.NotFound].path);
  }

  return (
    <EpisodePage title={`Episode ${id}`} episode={episodes[0]} onEpisodeSave={onEpisodeChange} />
  );
};

export default EpisodeView;
