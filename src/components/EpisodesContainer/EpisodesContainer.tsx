import { Episode } from '@/store/types';
import { Box, Fab } from '@mui/material';
import EpisodeItem from './components/EpisodeItem';
import AddIcon from '@mui/icons-material/Add';
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

        {showAddButton && onAddNewEpisode && (
          <Fab
            color="primary"
            onClick={onAddNewEpisode}
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
          >
            <AddIcon />
          </Fab>
        )}
      </FlexBox>
    </Box>
  );
};

export default EpisodesContainer;
