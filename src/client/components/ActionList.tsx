import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar
} from '@mui/material';
import { FormatListBulleted } from '@mui/icons-material';
import ACTIONS, { Actions } from '../constants/Actions';
import { useNavigate } from 'react-router-dom';

interface ActionListProps {
  selectedAction: keyof Actions | null;
}

const drawerWidth = 240;
const ActionList: React.FC<ActionListProps> = ({ selectedAction }) => {
  const navigate = useNavigate();
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box'
        }
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <List>
        {Object.keys(ACTIONS).map((action) => (
          <ListItem
            button
            key={action}
            selected={action === selectedAction}
            onClick={() => navigate(`/actions/${action}`)}
          >
            <ListItemIcon>
              <FormatListBulleted />
            </ListItemIcon>
            <ListItemText primary={ACTIONS[action as keyof Actions].label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
export default ActionList;
