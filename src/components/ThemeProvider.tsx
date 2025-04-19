// ThemeProviderWrapper.tsx
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from '../utils/theme';
import { useTheme } from '../store/appStore';

export const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const themeMode = useTheme(); // 'light' | 'dark' | 'system'
  const theme = getTheme(themeMode);

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};