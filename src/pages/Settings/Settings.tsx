import { Link } from 'react-router-dom';
import { Card, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DefaultIcon from '@mui/icons-material/Deblur';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { routes } from '@/routes';
import { Pages } from '@/routes/types';
import Meta from '@/components/Meta';

function Settings(): JSX.Element {
  return (
    <>
      <Meta title="Settings" />
      <Card sx={{ mt: 3, mb: 3, pl: 5, pr: 5, width: '100%' }}>
        <h1>Settings</h1>
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
      </Card>
    </>
  );
}

export default Settings;
