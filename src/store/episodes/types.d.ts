interface Episode {
  id: string;
  start_time: string;
  end_time: string;
  symptoms: string[];
  medication: string[];
}

interface EpisodesState {
  episodes: Episode[];
  currentEpisodeId: string;
}

type Actions = {
  editEpisode: (episode: Episode) => Promise<void>;
  addEpisode: (episode: Episode) => Promise<void>;
  fetchAllEpisodes: () => Promise<void>;
  setCurrentEpisode: (id: string) => void;
};

export type { Actions, EpisodesState, Episode };
