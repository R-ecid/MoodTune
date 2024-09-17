import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import backgroundImage from '../assets/images/landing-bg.jpg';
import { motion } from 'framer-motion';
import MusicNoteIcon from '@mui/icons-material/MusicNote'; 

const HeroContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  textAlign: 'center',
  color: theme.palette.common.white,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(1.5, 4),
  fontSize: '1.2rem',
}));

const Login = () => {
  const CLIENT_ID = '93ea2cedce834677b52fe6154f991134';
  const REDIRECT_URI = 'https://moodtune.netlify.app/callback';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';

const scopes = [
  'user-read-private',
  'user-read-email',
  'user-top-read', // Added scope
];


  const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(scopes.join(' '))}`;

  return (
    <HeroContainer>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold' }}>
          MoodTune
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Discover songs that match your mood
        </Typography>
        <a href={authUrl} style={{ textDecoration: 'none' }}>
          <StyledButton
            variant="contained"
            color="secondary"
            startIcon={<MusicNoteIcon />}
          >
            Connect with Spotify
          </StyledButton>
        </a>
      </motion.div>
    </HeroContainer>
  );
};

export default Login;
