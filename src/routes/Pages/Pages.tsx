import { Route, Routes } from 'react-router-dom';

import Box from '@mui/material/Box';

import { routes } from '..';
import { getPageHeight } from './utils';
import { FlexBox } from '@/components/styled';
import useOrientation from '@/hooks/useOrientation';

function Pages() {
  const isPortrait = useOrientation();

  return (
    <Box
      sx={{
        height: (theme) => getPageHeight(theme, isPortrait),
        width: '100%',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
      }}
    >
      <FlexBox
        flexDirection={'column'}
        sx={{ alignItems: 'center', height: '100%', width: isPortrait ? '100%' : '60%' }}
      >
        <Routes>
          {Object.values(routes).map(({ path, component: Component }) => {
            return <Route key={path} path={path} element={<Component />} />;
          })}
        </Routes>
      </FlexBox>
    </Box>
  );
}

export default Pages;
