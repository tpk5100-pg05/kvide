import { Link } from 'react-router-dom';
import {
  Box,
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import DefaultIcon from '@mui/icons-material/Deblur';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { routes } from '@/routes';
import { Pages } from '@/routes/types';
import Meta from '@/components/Meta';

function Settings(): JSX.Element {
  return (
    <>
      <Meta title="Settings" />
      <Box sx={{ height: '100%', width: '100%', p: 2, position: 'relative' }}>
        <Card
          sx={{
            p: 2,
            width: '100%',
            height: '100%',
          }}
        >
          <h1>Settings</h1>
          <List>
            {[Pages.Treatments, Pages.Symptoms, Pages.Triggers]
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
        </Card>
      </Box>
    </>
  );
}

export default Settings;
