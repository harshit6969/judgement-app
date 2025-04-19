import { createTheme } from '@mui/material/styles';
import { ThemeMode } from './types';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#C1121F', // Deep, muted red (less aggressive)
      light: '#D62E2E', // Soft highlight
      dark: '#8C0D15', // Rich dark shade
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#2D3748', // Dark slate (better than pure black)
      light: '#4A5568', // Lighter slate
      dark: '#1A202C', // Near-black
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F8F9FA', // Off-white (softer than #FFF)
      paper: '#FFFFFF', // Pure white for cards
    },
    text: {
      primary: '#1A202C', // Deep gray (better readability)
      secondary: '#4A5568', // Medium gray
      disabled: '#A0AEC0', // Lighter gray
    },
    error: {
      main: '#E53E3E', // Softer error red
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#DD6B20', // Warm amber
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#38A169', // Natural green
      contrastText: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '2.5rem',
      color: '#1A202C',
      letterSpacing: '-0.5px',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      color: '#1A202C',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12, // Modern rounded corners
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3182CE', // Softer Facebook blue
      light: '#5B9BD5', // Lighter blue
      dark: '#2C5282', // Deep navy
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#A0AEC0', // Light gray (text/icons)
      light: '#CBD5E0', // Brighter gray
      dark: '#718096', // Muted gray
      contrastText: '#1A202C',
    },
    background: {
      default: '#121212', // True dark (not #000)
      paper: '#1E1E1E', // Card surface
    },
    text: {
      primary: '#E2E8F0', // Soft white (reduced glare)
      secondary: '#A0AEC0', // Medium gray
      disabled: '#4A5568', // Darker gray
    },
    error: {
      main: '#FC8181', // Soft red
      contrastText: '#1A202C',
    },
    warning: {
      main: '#F6AD55', // Muted amber
      contrastText: '#1A202C',
    },
    success: {
      main: '#68D391', // Soft green
      contrastText: '#1A202C',
    },
  },
  typography: {
    ...lightTheme.typography,
    h1: {
      ...lightTheme.typography.h1,
      color: '#E2E8F0', // Light text in dark mode
    },
    h2: {
      ...lightTheme.typography.h2,
      color: '#E2E8F0',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          // Ensure contrast in dark mode
          backgroundColor: '#4299E1',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#3182CE',
          },
          '&.Mui-disabled': {
            backgroundColor: '#2D3748',
            color: '#718096',
          }
        }
      }
    }
  }
});

export const getTheme = (mode: ThemeMode) => {
    switch (mode) {
        case 'dark':
            return darkTheme;
        case 'light':
            return lightTheme;
        case 'system':
        default:
            return window.matchMedia('(prefers-color-scheme: dark)').matches
                ? darkTheme
                : lightTheme;
    }
};