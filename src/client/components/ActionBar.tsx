import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import ACTIONS, { Actions } from '../constants/Actions';

interface ActionBarProps {
  selectedAction: keyof Actions | null;
}

const drawerWidth = 240;
const ActionBar: React.FC<ActionBarProps> = ({ selectedAction }) => {
  const label = selectedAction ? ACTIONS[selectedAction].label : '';
  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      color="secondary"
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          {label}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default ActionBar;
