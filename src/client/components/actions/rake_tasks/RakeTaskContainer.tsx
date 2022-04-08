import React from 'react';
import { Grid } from '@mui/material'

import RakeTaskList from './RakeTaskList';
import RakeTaskDetail from './RakeTaskDetail';

const RakeTaskContainer: React.FC = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <RakeTaskList />
      </Grid>
      <Grid item xs={9}>
        <RakeTaskDetail />
      </Grid>
    </Grid>
  );
};

export default RakeTaskContainer;
