import { Searcher } from 'fast-fuzzy';
import React, { useEffect, useState } from 'react';
import {
  Box,
  List,
  IconButton,
  InputAdornment,
  ListItem,
  ListItemText,
  TextField
} from '@mui/material';
import { PlayCircle, Refresh, Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface RakeTaskNavProps {
  currentTask?: string;
}

const RakeTaskNav: React.FC<RakeTaskNavProps> = ({ currentTask }) => {
  const navigate = useNavigate();

  const [rakeTasks, setRakeTasks] = useState([
    { task: 'db:migrate', description: 'Migrate your database' },
    { task: 'cache:clear', description: 'Clear your cache' },
    {
      task: 'tmp:clear',
      description: 'Clear cache, socket and screenshot files'
    }
  ]);

  const [filterText, setFilterText] = useState('');
  const [filteredRakeTasks, setFilteredRakeTasks] = useState(rakeTasks);

  useEffect(() => {
    if (filterText) {
      const searcher = new Searcher(rakeTasks, {
        keySelector: (obj) => obj.task
      });
      setFilteredRakeTasks(searcher.search(filterText));
    } else {
      setFilteredRakeTasks(rakeTasks);
    }
  }, [filterText]);

  useEffect(() => {
    setFilterText('');
    setFilteredRakeTasks(rakeTasks);
  }, [rakeTasks]);

  return (
    <Box>
      <List
        sx={{
          overflow: 'auto',
          height: 'calc(100vh - 96px)'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            sx={{ width: '100%', p: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <IconButton sx={{ height: 'min-content' }}>
            <Refresh />
          </IconButton>
        </Box>
        {filteredRakeTasks.map((rakeTask) => (
          <ListItem
            button
            key={rakeTask.task}
            selected={currentTask === rakeTask.task}
            onClick={() => navigate(rakeTask.task)}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="comments"
                onClick={() => console.log('Starting rake task')}
              >
                <PlayCircle color="primary" />
              </IconButton>
            }
          >
            <ListItemText
              primary={rakeTask.task}
              secondary={rakeTask.description}
              onClick={() => console.log('Opening rake task detail')}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RakeTaskNav;
