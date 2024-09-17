// src/utils/mapMoodToGenres.js
const mapMoodToGenres = (moodInput) => {
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
      // Additional mappings can be added here
    };
  
    // Normalize the mood input
    const mood = moodInput.toLowerCase();
  
    const matchedGenres = new Set();
  
    for (const [key, genres] of Object.entries(moodGenreMap)) {
      if (mood.includes(key)) {
        genres.forEach((genre) => matchedGenres.add(genre));
      }
    }
  
    if (matchedGenres.size > 0) {
      // Limit to 5 genres
      return Array.from(matchedGenres).slice(0, 5).join(',');
    }
  
    // Default to 'pop' if no match found
    return 'pop';
  };
  
  export default mapMoodToGenres;
  