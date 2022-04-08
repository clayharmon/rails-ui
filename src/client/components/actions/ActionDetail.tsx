import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';

import RakeTaskNav from './rake_tasks/RakeTaskNav';

const getTasks = async (): Promise<Task[]> => {
  const data = await fetch('/api/v1/actions/tasks');
  return data.json();
};

const ActionDetail: React.FC = ({}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks();
      setTasks(tasks);
    };
    fetchTasks();
  }, []);
  return (
    <Grid container spacing={1}>
      <Grid item xs={2}>
        <RakeTaskNav tasks={tasks} />
      </Grid>
      <Grid item xs={10}>
        <div></div>
      </Grid>
    </Grid>
  );
};
export default ActionDetail;
