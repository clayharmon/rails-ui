import React from 'react';
import { Navigate, Routes, Route } from "react-router-dom";
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { AppProvider } from './stores';
import Actions from './pages/Actions';

const theme = createTheme({
  palette: {
    mode: 'dark'
  }
});

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/actions/:actionName" element={<Actions />} />
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
