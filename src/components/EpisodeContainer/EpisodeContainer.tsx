import { Episode } from '@/store/types';
import { Box, Button } from '@mui/material';
import EpisodeItem from './components/EpisodeItem';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect } from 'react';

const EpisodeContainer = ({
  episodes,
  onAddNewEpisode,
  onBottomScrolled,
}: {
  episodes: Episode[];
  onAddNewEpisode: () => void;
  onBottomScrolled?: () => void;
}) => {
  const onScroll = (e: React.UIEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (
      onBottomScrolled &&
      target &&
      target.scrollHeight &&
      target.scrollTop &&
      target.clientHeight
    ) {
      const bottom = target.scrollHeight - target.scrollTop === target.clientHeight;

      if (bottom) {
        onBottomScrolled();
      }
    }
  };

  useEffect(() => {
    const element = document.getElementById('episode-container');
    if (onBottomScrolled && element && element.scrollHeight <= element.clientHeight) {
      onBottomScrolled();
    }
  }, [episodes, onBottomScrolled]);

  return (
    <>
      <Box sx={{ p: 1 }}></Box>
      <div
        id="episode-container"
        style={{
          overflowY: 'scroll',
          paddingRight: '1rem',
          paddingLeft: '1rem',
        }}
        onScroll={onScroll}
      >
        {episodes.map((episode, index) => (
          <EpisodeItem key={index} episode={episode} />
        ))}
      </div>
      <Box sx={{ p: 1 }}></Box>
      <Box sx={{ p: 1 }}>
        <Button onClick={onAddNewEpisode}>
          <AddCircleIcon fontSize="large" color="info" />
        </Button>
      </Box>
    </>
  );
};

export default EpisodeContainer;
