// src/components/MoodInput.js
import React, { useState } from 'react';
import { TextField, Button, Box, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import mapMoodToGenres from '../utils/mapMoodToGenres';

const MoodInput = ({ accessToken, onGetRecommendations }) => {
  const [mood, setMood] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mood.trim()) {
      return;
    }

    setLoading(true);

    // Fetch recommendations based on mood
    const seedGenres = mapMoodToGenres(mood);

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/recommendations?seed_genres=${seedGenres}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();

      const recommendations = data.tracks.map((track) => ({
        id: track.id,
        title: track.name,
        artist: track.artists.map((artist) => artist.name).join(', '),
        albumArt: track.album.images[0]?.url,
        previewUrl: track.preview_url,
      }));

      onGetRecommendations(recommendations);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setLoading(false);
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{ mb: 1 }} // Reduced margin bottom
    >
      <Box component="form" onSubmit={handleSubmit} display="flex" gap={2}>
        <TextField
          label="Enter your mood..."
          variant="outlined"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Get Recommendations'}
        </Button>
      </Box>
    </Box>
  );
};

export default MoodInput;
