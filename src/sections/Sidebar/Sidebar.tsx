import { Link } from 'react-router-dom';

import DefaultIcon from '@mui/icons-material/Deblur';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import { routes } from '@/routes';
import useSidebar from '@/store/sidebar';
import { Box, Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useLayoutEffect, useMemo, useRef, useState } from 'react';
import useOrientation from '@/hooks/useOrientation';

function Sidebar({ onHeightChange }: { onHeightChange: (height: number) => void }) {
  const initialTab: number = useMemo(() => {
    const currentPath = window.location.pathname;
    const currentTab = Object.entries(routes).findIndex(([, route]) => route.path === currentPath);
    return currentTab;
  }, []);

  const [isSidebarOpen, sidebarActions] = useSidebar();
  const [selectedTab, setSelectedTab] = useState(initialTab);

  const tabRef = useRef<HTMLDivElement>(null);
  const isPortrait = useOrientation();

  useLayoutEffect(() => {
    onHeightChange(tabRef?.current?.clientHeight || 0);
  }, [tabRef?.current?.clientHeight, onHeightChange]);

  const handleChange = (_: SyntheticEvent<Element, Event>, newTab: number) => {
    setSelectedTab(newTab);
  };

  if (isPortrait) {
    return (
      <Box
        sx={{
          width: '100%',
          bottom: '0px',
          bgcolor: 'background.paper',
          zIndex: 10000,
          position: 'sticky',
        }}
        ref={tabRef}
      >
        <Box
          sx={{
            borderBottom: 0,
            width: '100%',
            bgcolor: 'background.paper',
          }}
          color={'divider'}
        >
          <Tabs
            sx={{ width: '100%' }}
            variant={'fullWidth'}
            value={selectedTab}
            onChange={handleChange}
            centered
          >
            {Object.values(routes)
              .filter((route) => route.title && route.inNavbar)
              .map(({ title, path, icon: Icon }) => (
                <Tab
                  key={path}
                  label={title}
                  component={Link}
                  to={path}
                  sx={{ minWidth: '10px', fontSize: '0.5rem' }}
                  icon={Icon ? <Icon fontSize={'small'} /> : <DefaultIcon fontSize="small" />}
                />
              ))}
          </Tabs>
        </Box>
      </Box>
    );
  }

  return (
    <SwipeableDrawer
      anchor="left"
      open={isSidebarOpen}
      onClose={sidebarActions.close}
      onOpen={sidebarActions.open}
      disableBackdropTransition={false}
      swipeAreaWidth={30}
    >
      <List sx={{ width: 250, pt: (theme) => `${theme.mixins.toolbar.minHeight}px` }}>
        {Object.values(routes)
          .filter((route) => route.title && route.inNavbar)
          .map(({ path, title, icon: Icon }) => (
            <ListItem sx={{ p: 0 }} key={path}>
              <ListItemButton onClick={sidebarActions.close} component={Link} to={path}>
                <ListItemIcon>{Icon ? <Icon /> : <DefaultIcon />}</ListItemIcon>
                <ListItemText>{title}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </SwipeableDrawer>
  );
}

export default Sidebar;
