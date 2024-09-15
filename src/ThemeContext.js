// src/ThemeContext.js
import React, { createContext, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState('dark'); // Set default mode to 'dark'

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark'
            ? {
                // Dark mode palette
                primary: {
                  main: '#000',
                },
                secondary: {
                  main: '#fff',
                },
                background: {
                  default: '#121212',
                  paper: '#1e1e1e',
                },
                text: {
                  primary: '#ffffff',
                  secondary: '#b0b0b0',
                },
              }
            : {
                // Light mode palette
                primary: {
                  main: '#6200ee',
                },
                secondary: {
                  main: '#03dac6',
                },
              }),
        },
        typography: {
          fontFamily: 'Montserrat, Roboto, sans-serif',
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeContextProvider;
