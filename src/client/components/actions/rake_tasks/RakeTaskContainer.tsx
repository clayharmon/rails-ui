import React from 'react';
import { Grid } from '@mui/material';

import RakeTaskList from './RakeTaskList';
import { Outlet, useParams } from 'react-router-dom';

const RakeTaskContainer: React.FC = () => {
  const { task } = useParams();
  return (
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <RakeTaskList currentTask={task} />
      </Grid>
      <Grid item xs={9}>
        <Outlet context={task} />
      </Grid>
    </Grid>
  );
};

export default RakeTaskContainer;
