import React, { useState } from 'react';
import { Container } from '@mui/material';
import MoodInput from './MoodInput';
import RecommendationList from './RecommendationList';

const MainApp = ({ accessToken }) => {


const mapMoodToGenres = (mood) => {
  const moodGenreMap = {
    happy: ['happy', 'pop', 'dance'],
    joyful: ['happy', 'pop', 'dance'],
    cheerful: ['happy', 'pop'],
    sad: ['sad', 'acoustic', 'piano'],
    unhappy: ['sad', 'acoustic', 'blues'],
    melancholy: ['sad', 'acoustic', 'blues'],
    depressed: ['sad', 'acoustic', 'blues'],
    energetic: ['dance', 'edm', 'electronic'],
    excited: ['dance', 'edm', 'party'],
    pumped: ['dance', 'edm', 'work-out'],
    relaxed: ['chill', 'ambient', 'study'],
    calm: ['chill', 'ambient', 'new-age'],
    peaceful: ['chill', 'ambient'],
    angry: ['metal', 'heavy-metal', 'hardcore'],
    furious: ['metal', 'heavy-metal', 'hardcore'],
    aggressive: ['metal', 'punk'],
    romantic: ['romance', 'r-n-b'],
    loving: ['romance', 'r-n-b'],
    nostalgic: ['classical', 'jazz', 'blues'],
    reflective: ['classical', 'piano', 'singer-songwriter'],
    lonely: ['acoustic', 'sad', 'piano'],
    adventurous: ['rock', 'alternative', 'indie'],
    hopeful: ['pop', 'folk', 'indie'],
    confident: ['hip-hop', 'rap', 'trap'],
    determined: ['hip-hop', 'rap', 'work-out'],
    stressed: ['ambient', 'sleep', 'study'],
    sleepy: ['sleep', 'ambient', 'new-age'],
    festive: ['party', 'dance', 'holiday'],
  };

  // Normalize the mood input
  const moodLower = mood.toLowerCase();

  // Find a matching genre
  for (const [key, value] of Object.entries(moodGenreMap)) {
    if (moodLower.includes(key)) {
      return value;
    }
  }

  // Default to 'pop' if no match found
  return 'pop';
};


  const [recommendations, setRecommendations] = useState([]);

  const handleGetRecommendations = async (mood) => {
    try {
      // Map the mood to seed genres or tracks
      const seedGenres = mapMoodToGenres(mood);

      // Fetch recommendations from Spotify
      const response = await fetch(
        `https://api.spotify.com/v1/recommendations?seed_genres=${seedGenres}&limit=8`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      const data = await response.json();

      // Map the data to match your component's expected format
      const tracks = data.tracks.map((track) => ({
        id: track.id,
        title: track.name,
        artist: track.artists.map((artist) => artist.name).join(', '),
        albumArt: track.album.images[0]?.url,
        previewUrl: track.preview_url,
      }));

      setRecommendations(tracks);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      alert('There was an error fetching recommendations. Please try again.');
    }
  };

  <Container maxWidth="md" sx={{ overflow: 'hidden' }}>
  {/* MoodInput and RecommendationList */}
</Container>


  return (
    <Container maxWidth="md">
      <MoodInput onGetRecommendations={handleGetRecommendations} />
      {recommendations.length > 0 && (
        <RecommendationList recommendations={recommendations} />
      )}
    </Container>
  );
};

export default MainApp;
