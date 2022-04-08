import { Searcher } from 'fast-fuzzy';
import React, { useEffect, useState } from 'react';
import { Box, List, IconButton, InputAdornment, ListItem, ListItemText, TextField } from '@mui/material';
import { PlayCircle, Refresh, Search } from '@mui/icons-material';

const RakeTaskNav: React.FC = () => {
  const [rakeTasks, setRakeTasks] = useState([
    { title: 'rake db:migrate', description: 'Migrate your database' },
    { title: 'rake cache:clear', description: 'Clear your cache' },
    { title: 'rake tmp:clear', description: 'Clear cache, socket and screenshot files' }
  ]);

  const [filterText, setFilterText] = useState('');
  const [filteredRakeTasks, setFilteredRakeTasks] = useState(rakeTasks);

  useEffect(() => {
    if (filterText) {
      const searcher = new Searcher(rakeTasks, { keySelector: (obj) => obj.title });
      setFilteredRakeTasks(searcher.search(filterText));
    } else {
      setFilteredRakeTasks(rakeTasks);
    }
  }, [filterText]);

  useEffect(() => {
    setFilterText('');
    setFilteredRakeTasks(rakeTasks);
  }, [rakeTasks])

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
              ),
            }}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <IconButton sx={{height: 'min-content' }}><Refresh /></IconButton>
        </Box>
        {filteredRakeTasks.map(rakeTask => (
          <ListItem
            button
            key={rakeTask.title}
            selected={false}
            secondaryAction={
              <IconButton edge="end" aria-label="comments" onClick={() => console.log('Starting rake task')}>
                <PlayCircle color="primary" />
              </IconButton>
            }
          >
            <ListItemText
              primary={rakeTask.title}
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
