import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';

interface AppProps {}

const ActionNav: React.FC<AppProps> = ({}) => {
  return (
    <Box>
      <List>
        {['Procfile', 'Rake tasks', 'NPM scripts'].map((text) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>

    </Box>
  );
};
export default ActionNav;
