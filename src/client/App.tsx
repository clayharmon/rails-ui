import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { AppProvider } from './stores';
import ActionWrapper from './components/ActionWrapper';
import RakeTaskContainer from './components/actions/rake_tasks/RakeTaskContainer';
import RakeTaskDetail from './components/actions/rake_tasks/RakeTaskDetail';

const theme = createTheme({
  palette: {
    mode: 'dark'
  }
});

const App: React.FC = () => {
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route
            path="/actions/rake_tasks"
            element={
              <ActionWrapper
                selectedAction="rake_tasks"
                children={<RakeTaskContainer />}
              />
            }
          >
            <Route path=":task" element={<RakeTaskDetail />} />
          </Route>
          <Route
            path="/actions"
            element={<ActionWrapper selectedAction={null} children={null} />}
          />

          <Route
            path="*"
            element={<Navigate to="/actions/rake_tasks" replace />}
          />
        </Routes>
      </ThemeProvider>
    </AppProvider>
  );
};
export default App;
