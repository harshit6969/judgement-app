// src/components/ThemeProvider.tsx
import { useEffect } from 'react';
import { useTheme } from '../store/appStore';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  
  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.remove('light', 'dark');
    
    const effectiveTheme = theme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? 'dark' 
        : 'light'
      : theme;
    
    document.documentElement.classList.add(effectiveTheme);
  }, [theme]);

  return <>{children}</>;
};