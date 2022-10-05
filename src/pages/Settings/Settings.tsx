import { Link } from 'react-router-dom';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DefaultIcon from '@mui/icons-material/Deblur';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import routes from '@/routes';
import { Pages } from '@/routes/types';
import Meta from '@/components/Meta';

function Settings(): JSX.Element {
  return (
    <>
      <Meta title="Settings" />
      <h1>Settings</h1>
      <Box flexGrow={1} sx={{ flexGrow: 1, height: '100vh', width: '100%', overflowY: 'scroll' }}>
        <List>
          {[Pages.Treatments, Pages.Symptoms]
            .map((index) => routes[index])
            .map(({ path, title, icon: Icon }) => (
              <ListItem key={path}>
                <ListItemButton component={Link} to={path}>
                  <ListItemIcon>{Icon ? <Icon /> : <DefaultIcon />}</ListItemIcon>
                  <ListItemText>{title}</ListItemText>
                  <NavigateNextIcon />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Box>
    </>
  );
}

export default Settings;
