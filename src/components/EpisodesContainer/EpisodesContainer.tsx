import { Episode } from '@/store/types';
import { Box, Button } from '@mui/material';
import EpisodeItem from './components/EpisodeItem';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { FlexBox } from '../styled';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

const EpisodesContainer = ({
  episodes,
  onAddNewEpisode,
  onBottomScrolled,
  showAddButton = false,
}: {
  episodes: Episode[];
  onAddNewEpisode?: () => void;
  onBottomScrolled: () => void;
  showAddButton?: boolean;
}) => {
  const navigate = useNavigate();

  const onClickEpisode = (id: number) => {
    // TODO: might want to do some sliding animation to new page here in the future,
    // in which the page can be navigated back to
    // We can show in modal on desktop
    navigate(`/episode/${id}`);
  };

  return (
    <Box flexGrow={1} sx={{ flexGrow: 1, height: '0%', width: '100%' }}>
      <FlexBox
        flexDirection={'column'}
        sx={{ height: '100%', width: '100%', alignItems: 'center' }}
      >
        <Box sx={{ p: 1 }}></Box>
        <div
          id="episode-container"
          style={{
            overflow: 'scroll',
            paddingRight: '0.5rem',
            paddingLeft: '0.5rem',
            width: '100%',
          }}
        >
          <InfiniteScroll
            dataLength={episodes.length}
            hasMore={true}
            next={onBottomScrolled}
            scrollableTarget="episode-container"
            loader={<></>} // TODO: make component properly show loading when scrolling
          >
            {episodes.map((episode, index) => (
              <EpisodeItem key={index} episode={episode} onClick={onClickEpisode} />
            ))}
          </InfiniteScroll>
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

export default EpisodesContainer;
