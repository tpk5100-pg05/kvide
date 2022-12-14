import ThemeIcon from '@mui/icons-material/InvertColors';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';

import { FlexBox } from '@/components/styled';
import { title } from '@/config';
import useSidebar from '@/store/sidebar';
import useTheme from '@/store/theme';

import { routes } from '@/routes';
import { Pages } from '@/routes/types';

import { useNavigate } from 'react-router-dom';
import useOrientation from '@/hooks/useOrientation';
import { useLayoutEffect, useRef } from 'react';

function Header({ onHeightChange }: { onHeightChange: (height: number) => void }) {
  const navigate = useNavigate();
  const isPortrait = useOrientation();
  const [, sidebarActions] = useSidebar();
  const [, themeActions] = useTheme();

  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    onHeightChange(ref?.current?.clientHeight || 0);
  }, [ref?.current?.clientHeight, onHeightChange]);

  function returnHome() {
    navigate(routes[Pages.Home].path);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="primary" ref={ref} elevation={1} position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <FlexBox sx={{ alignItems: 'center' }}>
            {!isPortrait && (
              <IconButton
                onClick={sidebarActions.toggle}
                size="large"
                edge="start"
                aria-label="menu"
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Divider orientation="vertical" flexItem />

            <Button onClick={returnHome}>
              <HomeIcon sx={{ mt: -0.5, mr: 0.5 }} />
              {title}
            </Button>
          </FlexBox>
          <FlexBox>
            <Tooltip title="Switch theme" arrow>
              <IconButton edge="end" size="large" onClick={themeActions.toggle}>
                <ThemeIcon />
              </IconButton>
            </Tooltip>
          </FlexBox>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
