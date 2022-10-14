import EpisodePage from '@/components/EpisodePage';
import { episodeRoute } from '@/routes';
import { addEpisode } from '@/store/episodes';
import useNotifications from '@/store/notifications';
import { createDefaultEpisode, Episode } from '@/store/types';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const EpisodeAdd = () => {
  const [, notifications] = useNotifications();
  const navigate = useNavigate();

  const onEpisodeAdd = useCallback(
    async (episode: Episode) => {
      try {
        const insertedEpisode = await addEpisode(episode);
        notifications.push({ message: 'Added episode' });
        navigate(episodeRoute(insertedEpisode.id));
      } catch (e) {
        // TODO: add severity parameter for determining the color of the notification, i.e infor, warning, error
        notifications.push({ message: `Could not add episode: ${e}` });
      }
    },
    [notifications, navigate],
  );

  const episode: Episode = useMemo(() => {
    return createDefaultEpisode();
  }, []);

  return (
    <EpisodePage
      title={'Add episode'}
      episode={episode}
      onEpisodeSave={onEpisodeAdd}
      add={true}
    ></EpisodePage>
  );
};

export default EpisodeAdd;
