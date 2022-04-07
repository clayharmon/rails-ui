import React from 'react';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppContainer from './AppContainer';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2ecc71'
    },
    secondary: {
      main: '#bdc3c7'
    },
    error: {
      main: '#e74c3c'
    }
  }
});

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContainer />
    </ThemeProvider>
  );
};
export default App;
