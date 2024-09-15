// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ThemeContextProvider from './ThemeContext';
import { CssBaseline, GlobalStyles } from '@mui/material';
import Header from './components/Header';
import Login from './components/Login';
import Callback from './components/Callback';
import MainApp from './components/MainApp';
import backgroundImage from './assets/images/SoundVibesBackground.jpg'; // Import the background image

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [tokenExpiryTime, setTokenExpiryTime] = useState(null);

  // Load token from localStorage if available
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const expiryTime = localStorage.getItem('tokenExpiryTime');
    if (token && expiryTime && new Date().getTime() < expiryTime) {
      setAccessToken(token);
      setTokenExpiryTime(expiryTime);
    }
  }, []);

  // Function to handle receiving the token
  const handleTokenReceive = (token, expiresIn) => {
    const expiryTime = new Date().getTime() + expiresIn * 1000;
    setAccessToken(token);
    setTokenExpiryTime(expiryTime);

    // Store in localStorage
    localStorage.setItem('accessToken', token);
    localStorage.setItem('tokenExpiryTime', expiryTime);
  };

  // Check token expiration
  useEffect(() => {
    if (tokenExpiryTime) {
      const timeout = setTimeout(() => {
        setAccessToken(null);
        setTokenExpiryTime(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenExpiryTime');
        alert('Session has expired. Please log in again.');
      }, tokenExpiryTime - new Date().getTime());

      return () => clearTimeout(timeout);
    }
  }, [tokenExpiryTime]);

  return (
    <ThemeContextProvider>
      <CssBaseline />
      {/* Apply GlobalStyles to set the background image */}
      <GlobalStyles
        styles={{
          body: {
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            margin: 0,
            padding: 0,
          },
          '#root': {
            position: 'relative',
            zIndex: 1,
          },
        }}
      />
      <Header />
      <Routes>
        <Route
          path="/"
          element={accessToken ? <MainApp accessToken={accessToken} /> : <Login />}
        />
        <Route
          path="/callback"
          element={<Callback onReceiveToken={handleTokenReceive} />}
        />
      </Routes>
    </ThemeContextProvider>
  );
}

export default App;
