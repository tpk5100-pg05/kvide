import { Episode } from '@/store/types';
import { Box, Button } from '@mui/material';
import EpisodeItem from './components/EpisodeItem';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect } from 'react';
import { FlexBox } from '../styled';

const EpisodeContainer = ({
  episodes,
  onAddNewEpisode,
  onBottomScrolled,
  showAddButton = false,
}: {
  episodes: Episode[];
  onAddNewEpisode?: () => void;
  onBottomScrolled?: () => void;
  showAddButton?: boolean;
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
        console.log('scrolled to bottom');
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
      console.log('scrolled to bottom');
      onBottomScrolled();
    }
  }, [episodes, onBottomScrolled]);

  return (
    <Box flexGrow={1} sx={{ flexGrow: 1, height: '0%', width: '100%' }}>
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
            width: '100%',
          }}
          onScroll={onScroll}
        >
          {episodes.map((episode, index) => (
            <EpisodeItem key={index} episode={episode} onClick={onClickEpisode} />
          ))}
        </div>
        <Box sx={{ p: 1 }}></Box>
        {showAddButton && onAddNewEpisode && (
          <Box sx={{ p: 1 }}>
            <Button onClick={onAddNewEpisode}>
              <AddCircleIcon fontSize="large" color="info" />
            </Button>
          </Box>
        )}
      </FlexBox>
    </Box>
  );
};

export default EpisodeContainer;
