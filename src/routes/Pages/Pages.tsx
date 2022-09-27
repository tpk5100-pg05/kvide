import { Route, Routes } from 'react-router-dom';

import Box from '@mui/material/Box';

import routes from '..';
import { getPageHeight } from './utils';
import EpisodePage from '@/pages/Episode';

function Pages() {
  return (
    <Box sx={{ height: (theme) => getPageHeight(theme) }}>
      <Routes>
        {Object.values(routes).map(({ path, component: Component }) => {
          return <Route key={path} path={path} element={<Component />} />;
        })}

        <Route key={'episodeView'} path={'/episodes/:id'} element={<EpisodePage />} />
      </Routes>
    </Box>
  );
}

export default Pages;
