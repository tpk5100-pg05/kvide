import { Route, Routes } from 'react-router-dom';

import Box from '@mui/material/Box';

import { routes } from '..';
import { FlexBox } from '@/components/styled';
import useOrientation from '@/hooks/useOrientation';
import { bottomHeight, topHeight } from '@/state';
import { useRecoilState } from 'recoil';

function Pages() {
  const isPortrait = useOrientation();
  const [bottom] = useRecoilState(bottomHeight);
  const [top] = useRecoilState(topHeight);

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        pt: `${top}px`,
        pb: `${bottom}px`,
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
