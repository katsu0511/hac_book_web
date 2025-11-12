'use client';

import { useState, useMemo, useEffect } from 'react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

export default function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  const theme = useMemo(() => createTheme({
    palette: {
      primary: {
        main: '#38CDA4',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
          containedPrimary: {
            color: '#fff',
          },
        },
      },
    },
  }), []);

  useEffect(() => {
    const root = document.documentElement;
    const primaryColor = theme.palette.primary.main;
    root.style.setProperty('--color-primary', primaryColor);
    setMounted(true);
  }, [theme]);

  if (!mounted) return null;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
