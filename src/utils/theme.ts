import { createTheme } from '@mui/material/styles';
import { ThemeMode } from './types';

const lightTheme = createTheme({
  palette: {
    mode: 'light'
  }
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const getTheme = (mode: ThemeMode) => mode === 'dark' ? darkTheme : lightTheme;