// src/components/MainApp.js
import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import MoodInput from './MoodInput';
import RecommendationList from './RecommendationList';
import UserInfo from './UserInfo';
import Header from './Header';

const MainApp = ({ accessToken, onLogout }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [themeMode, setThemeMode] = useState('light');

  // Function to handle theme toggling
  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Function to receive recommendations from MoodInput
  const handleGetRecommendations = (newRecommendations) => {
    setRecommendations(newRecommendations);
  };

  // Optional: Persist theme mode in localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('themeMode');
    if (storedTheme) {
      setThemeMode(storedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header onLogout={onLogout} themeMode={themeMode} toggleTheme={toggleTheme} />
      {/* Dimmed Background Container */}
      <Box
        sx={{
          p: 2,
          m: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
          borderRadius: 2,
        }}
      >
        <Grid container spacing={2}>
          {/* Left Side: User Info */}
          <Grid item xs={12} md={3}>
            <UserInfo accessToken={accessToken} />
          </Grid>

          {/* Right Side: Mood Input and Recommendations */}
          <Grid item xs={12} md={9}>
            <MoodInput
              accessToken={accessToken}
              onGetRecommendations={handleGetRecommendations}
            />
            <RecommendationList recommendations={recommendations} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default MainApp;
