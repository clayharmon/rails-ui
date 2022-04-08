import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import ActionsList from './ActionList';
import ActionBar from './ActionBar';
import { Actions } from '../constants/Actions';

interface ActionWrapperProps {
  selectedAction: keyof Actions | null;
}

const ActionWrapper: React.FC<ActionWrapperProps> = ({
  selectedAction,
  children
}) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <ActionBar selectedAction={selectedAction} />
      <ActionsList selectedAction={selectedAction} />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
export default ActionWrapper;
