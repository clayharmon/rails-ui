import React from 'react';
import { useParams } from "react-router-dom";
import { AppBar, Box, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { FormatListBulleted } from '@mui/icons-material';

import RakeTasks from '../components/actions/rake_tasks';

const ACTIONS = {
  rake_tasks: {
    label: 'Rake Tasks',
    component: RakeTasks
  }
}
const drawerWidth = 240;

const Actions: React.FC = () => {
  const params = useParams();
  const currentActionName = params.actionName;
  const CurrentActionComponent = ACTIONS[currentActionName].component;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        color="secondary"
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {ACTIONS[currentActionName].label}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {Object.keys(ACTIONS).map(action => (
            <ListItem
              button
              key={ACTIONS[action].label}
              selected={action === currentActionName}
            >
              <ListItemIcon>
                <FormatListBulleted />
              </ListItemIcon>
              <ListItemText primary={ACTIONS[action].label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default' }}
      >
        <Toolbar />
        <CurrentActionComponent />
      </Box>
    </Box>
  );
};
export default Actions;
