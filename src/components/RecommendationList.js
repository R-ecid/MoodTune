// src/components/RecommendationList.js
import React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Avatar,
  Box,
} from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import { motion } from 'framer-motion';

const RecommendationList = ({ recommendations }) => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      // Remove or adjust margins if necessary
      sx={{
        mt: 1,
        // Optionally adjust the width here as well
        // width: '100%',
      }}
    >
      <List>
        {recommendations.map((song) => (
          <ListItem key={song.id}>
            <ListItemAvatar>
              <Avatar src={song.albumArt} alt={song.title} variant="square" />
            </ListItemAvatar>
            <ListItemText primary={song.title} secondary={song.artist} />
            {song.previewUrl ? (
              <IconButton
                color="primary"
                onClick={() => window.open(song.previewUrl, '_blank')}
                component={motion.div}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <PlayArrow />
              </IconButton>
            ) : (
              <IconButton color="primary" disabled>
                <PlayArrow />
              </IconButton>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RecommendationList;
