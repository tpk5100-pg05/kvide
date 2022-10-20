import GitHubIcon from '@mui/icons-material/GitHub';
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
import { repository, title } from '@/config';
import useSidebar from '@/store/sidebar';
import useTheme from '@/store/theme';

import { routes } from '@/routes';
import { Pages } from '@/routes/types';

import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const [, sidebarActions] = useSidebar();
  const [, themeActions] = useTheme();

  function returnHome() {
    navigate(routes[Pages.Home].path);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="transparent" elevation={1} position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <FlexBox sx={{ alignItems: 'center' }}>
            <IconButton
              onClick={sidebarActions.toggle}
              size="large"
              edge="start"
              color="info"
              aria-label="menu"
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Divider orientation="vertical" flexItem />

            <IconButton
              onClick={returnHome}
              size="large"
              edge="start"
              color="error"
              aria-label="home"
              sx={{ mr: 1 }}
            >
              <HomeIcon />
            </IconButton>

            <Button onClick={returnHome} color="error">
              {title}
            </Button>
          </FlexBox>
          <FlexBox>
            <Tooltip title="It's open source" arrow>
              <IconButton color="info" size="large" component="a" href={repository} target="_blank">
                <GitHubIcon />
              </IconButton>
            </Tooltip>
            <Divider orientation="vertical" flexItem />
            <Tooltip title="Switch theme" arrow>
              <IconButton color="info" edge="end" size="large" onClick={themeActions.toggle}>
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
