// src/components/UserInfo.js
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Stack,
} from '@mui/material';
import { motion } from 'framer-motion';
import mapMoodToGenres from '../utils/mapMoodToGenres';

const UserInfo = ({ accessToken }) => {
  const [userName, setUserName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [topTracks, setTopTracks] = useState([]);
  const [mood, setMood] = useState('neutral');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user's profile information
        const userResponse = await fetch('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const userData = await userResponse.json();

        if (userResponse.ok) {
          setUserName(userData.display_name);
          if (userData.images && userData.images.length > 0) {
            setProfilePicture(userData.images[0].url);
          }
        } else {
          console.error('Error fetching user profile:', userData.error);
        }

        // Fetch user's top tracks from the last 4 weeks
        const topTracksResponse = await fetch(
          'https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=short_term',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const topTracksData = await topTracksResponse.json();

        if (
          topTracksResponse.ok &&
          topTracksData.items &&
          topTracksData.items.length > 0
        ) {
          setTopTracks(topTracksData.items);

          // Define analyzeMood inside useEffect
          const analyzeMood = async (tracks) => {
            try {
              const trackIds = tracks.map((track) => track.id).join(',');

              const audioFeaturesResponse = await fetch(
                `https://api.spotify.com/v1/audio-features?ids=${trackIds}`,
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
              );
              const audioFeaturesData = await audioFeaturesResponse.json();

              if (
                audioFeaturesResponse.ok &&
                audioFeaturesData.audio_features &&
                audioFeaturesData.audio_features.length > 0
              ) {
                // Calculate average valence and energy
                let totalValence = 0;
                let totalEnergy = 0;

                audioFeaturesData.audio_features.forEach((feature) => {
                  totalValence += feature.valence;
                  totalEnergy += feature.energy;
                });

                const avgValence =
                  totalValence / audioFeaturesData.audio_features.length;
                const avgEnergy =
                  totalEnergy / audioFeaturesData.audio_features.length;

                // Determine mood based on average valence and energy
                let mood = 'neutral';

                if (avgValence > 0.6 && avgEnergy > 0.6) {
                  mood = 'happy';
                } else if (avgValence < 0.4 && avgEnergy < 0.4) {
                  mood = 'sad';
                } else if (avgEnergy > 0.7) {
                  mood = 'energetic';
                } else if (avgEnergy < 0.3) {
                  mood = 'calm';
                }

                return mood;
              } else {
                console.warn(
                  'No audio features available or error fetching audio features:',
                  audioFeaturesData.error
                );
                return 'neutral';
              }
            } catch (error) {
              console.error('Error analyzing mood:', error);
              return 'neutral';
            }
          };

          // Analyze mood based on top tracks
          const userMood = await analyzeMood(topTracksData.items);
          setMood(userMood);
        } else {
          console.warn(
            'No top tracks available or error fetching top tracks:',
            topTracksData.error
          );
          setTopTracks([]);
          setMood('neutral');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [accessToken]);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 360,
        padding: 1,
      }}
      component={motion.div}
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Stack to align Avatar and Greeting horizontally */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
        {profilePicture ? (
          <Avatar src={profilePicture} alt={userName} sx={{ width: 56, height: 56 }} />
        ) : (
          <Avatar sx={{ width: 56, height: 56 }}>
            {userName ? userName.charAt(0) : 'U'}
          </Avatar>
        )}
        <Typography variant="h5" sx={{ color: 'white' }}>
          Hello, {userName || 'User'}!
        </Typography>
      </Stack>

      <Typography variant="h6" sx={{ color: 'white' }}>
        Your Top 5 Tracks:
      </Typography>
      <List>
        {topTracks && topTracks.length > 0 ? (
          topTracks.map((track) => (
            <ListItem key={track.id}>
              <ListItemAvatar>
                <Avatar
                  src={track.album.images[0]?.url}
                  alt={track.name}
                  variant="square"
                />
              </ListItemAvatar>
              <ListItemText
                primary={track.name}
                secondary={track.artists.map((artist) => artist.name).join(', ')}
                primaryTypographyProps={{ color: 'white' }}
                secondaryTypographyProps={{ color: 'gray' }}
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="body1" sx={{ color: 'white' }}>
            No top tracks available.
          </Typography>
        )}
      </List>
      <Typography variant="h6" sx={{ mt: 2, color: 'white' }}>
        Your Current Mood:
      </Typography>
      <Typography variant="body1" sx={{ color: 'white' }}>
        {mood.charAt(0).toUpperCase() + mood.slice(1)}
      </Typography>
      <Typography variant="h6" sx={{ mt: 2, color: 'white' }}>
        Genre Recommendation:
      </Typography>
      <Typography variant="body1" sx={{ color: 'white' }}>
        {mapMoodToGenres(mood).split(',').join(', ')}
      </Typography>
    </Box>
  );
};

export default UserInfo;
