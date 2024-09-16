import React, { useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useTheme,
  Box,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { ColorModeContext } from '../ThemeContext';

const Header = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <AppBar position="static" enableColorOnDark>
      <Toolbar>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center', // Center the content
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}
          >
            MoodTune
          </Typography>
          <IconButton
            sx={{ position: 'absolute', right: 0 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
