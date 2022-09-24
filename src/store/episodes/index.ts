import { useCallback, useMemo } from 'react';
import { atom, useRecoilState } from 'recoil';

import { Actions, Episode, EpisodesState } from './types';

const episodesState = atom<EpisodesState>({
  key: 'episodes-state',
  default: { episodes: [], currentEpisodeId: '' },
});

const useEpisodes = (): [EpisodesState, Actions] => {
  const [episodes, setEpisodes] = useRecoilState(episodesState);

  const addEpisode = useCallback(
    (episode: Episode) => {
      setEpisodes((prev) => {
        const episodes = [...prev.episodes, episode];
        return { ...prev, episodes };
      });

      return addEpisodeDB(episode);
    },
    [setEpisodes],
  );

  /**
   * edit an episode in store
   */
  const editEpisode = useCallback(
    (episode: Episode) => {
      setEpisodes((episodes): EpisodesState => {
        const index = episodes.episodes.findIndex((episode: Episode) => {
          return episode.id === episode.id;
        });

        if (index !== -1) {
          const replacedEpisodes = [...episodes.episodes];
          replacedEpisodes[index] = episode;
          return { ...episodes, episodes: replacedEpisodes };
        }

        return episodes;
      });

      return editEpisodeDB(episode);
    },
    [setEpisodes],
  );

  const fetchAllEpisodes = useCallback(async () => {
    try {
      const newEpisodes = await fetchEpisodes();
      setEpisodes((prev) => {
        return { ...prev, episodes: newEpisodes };
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }, [setEpisodes]);

  const setCurrentEpisode = useCallback(
    (id: string) => {
      setEpisodes((episodes): EpisodesState => {
        return { ...episodes, currentEpisodeId: id };
      });
    },
    [setEpisodes],
  );

  const actions = useMemo(
    () => ({ addEpisode, editEpisode, fetchAllEpisodes, setCurrentEpisode }),
    [addEpisode, editEpisode, fetchAllEpisodes, setCurrentEpisode],
  );

  return [episodes, actions];
};

const fetchEpisodes = (): Episode[] => {
  return JSON.parse(localStorage.getItem('episodes') || '[]') || [];
};

const editEpisodeDB = async (episode: Episode): Promise<void> => {
  // TODO actually edit or insert the episode in indexDB

  const episodes = JSON.parse(localStorage.getItem('episodes') || '[]') || [];

  const index = episodes.findIndex((episode: Episode) => {
    return episode.id === episode.id;
  });

  if (index !== -1) {
    episodes[index] = episode;
  } else {
    episodes.push(episode);
  }

  localStorage.setItem('episodes', JSON.stringify(episodes));
};

const addEpisodeDB = async (episode: Episode): Promise<void> => {
  // TODO actually add an episode entry in indexDB
  const episodes = JSON.parse(localStorage.getItem('episodes') || '[]') || [];
  localStorage.setItem('episodes', JSON.stringify([...episodes, episode]));
};

export default useEpisodes;
