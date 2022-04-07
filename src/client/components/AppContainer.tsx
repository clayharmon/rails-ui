import React from 'react';
import { AppBar, Box, Grid, Toolbar, Typography } from '@mui/material';
import ActionDetail from './ActionDetail';
import ActionNav from './ActionNav';

interface AppProps {}

const AppContainer: React.FC<AppProps> = ({}) => {
  return (
    <>
      <AppBar position="static" sx={{ marginBottom: 1 }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Rails UI
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <ActionNav />
          </Grid>
          <Grid item xs={10}>
            <ActionDetail />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default AppContainer;
