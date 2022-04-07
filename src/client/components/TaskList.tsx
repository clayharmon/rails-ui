import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import { Task } from './ActionDetail';

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <Box>
      <List>
        {tasks.map(({ task }) => (
          <ListItem button key={task}>
            <ListItemText primary={task} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
export default TaskList;
