// src/components/MoodInput.js
import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';

const MoodInput = ({ onGetRecommendations }) => {
  const [mood, setMood] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission
    if (mood.trim() === '') {
      alert('Please enter your mood.');
      return;
    }
    onGetRecommendations(mood);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        alignItems="center"
        justifyContent="center"
        mt={4}
        gap={2}
      >
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
        >
          Get Recommendations
        </Button>
      </Box>
    </motion.div>
  );
};

export default MoodInput;
