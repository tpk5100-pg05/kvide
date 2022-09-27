import { Episode } from '@/store/types';
import { Box, Button } from '@mui/material';
import EpisodeItem from './components/EpisodeItem';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect } from 'react';
import useOrientation from '@/hooks/useOrientation';
import { FlexBox } from '../styled';

const EpisodeContainer = ({
  episodes,
  onAddNewEpisode,
  onBottomScrolled,
}: {
  episodes: Episode[];
  onAddNewEpisode: () => void;
  onBottomScrolled?: () => void;
}) => {
  const isPortrait = useOrientation();

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

  const onClickEpisode = (id: number) => {
    console.log(`clicked episode: ${id}`);
  };

  useEffect(() => {
    const element = document.getElementById('episode-container');
    if (onBottomScrolled && element && element.scrollHeight <= element.clientHeight) {
      onBottomScrolled();
    }
  }, [episodes, onBottomScrolled]);

  return (
    <FlexBox
      flexDirection={'column'}
      sx={{ p: 1, height: '100%', width: '100%', alignItems: 'center' }}
    >
      <Box sx={{ p: 1 }}></Box>
      <div
        id="episode-container"
        style={{
          overflowY: 'scroll',
          paddingRight: '1rem',
          paddingLeft: '1rem',
          width: isPortrait ? '100%' : '60%',
        }}
        onScroll={onScroll}
      >
        {episodes.map((episode, index) => (
          <EpisodeItem key={index} episode={episode} onClick={onClickEpisode} />
        ))}
      </div>
      <Box sx={{ p: 1 }}></Box>
      <Box sx={{ p: 1 }}>
        <Button onClick={onAddNewEpisode}>
          <AddCircleIcon fontSize="large" color="info" />
        </Button>
      </Box>
    </FlexBox>
  );
};

export default EpisodeContainer;