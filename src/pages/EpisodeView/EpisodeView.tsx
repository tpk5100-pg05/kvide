import EpisodePage from '@/components/EpisodePage';
import { routes } from '@/routes';
import { Pages } from '@/routes/types';
import { queryEpisodes, editEpisode } from '@/store/episodes';
import useNotifications from '@/store/notifications';
import { Episode } from '@/store/types';
import { useLiveQuery } from 'dexie-react-hooks';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EpisodeView = () => {
  const [, notifications] = useNotifications();
  const navigate = useNavigate();
  const { id } = useParams();

  const episodes = useLiveQuery(() => {
    return queryEpisodes({ ids: [Number(id)] });
  }, [id]);

  const episode = episodes?.[0];
  console.log(episode);

  const onEpisodeChange = useCallback(
    async (episode: Episode) => {
      try {
        console.log('episodes changed in callback: ', episode);
        await editEpisode(Number(id), episode);
        notifications.push({ message: 'Episode edited' });
      } catch (e) {
        notifications.push({ message: `Could not edit episode: ${e}` });
      }
    },
    [id, notifications],
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
