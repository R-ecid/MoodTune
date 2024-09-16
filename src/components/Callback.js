import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = ({ onReceiveToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    let token = null;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      token = params.get('access_token');
      const expiresIn = params.get('expires_in');

      if (token) {
        // Pass the token to the parent component or store it
        onReceiveToken(token, expiresIn);

        // Remove the hash from the URL for cleanliness
        window.history.pushState(
          '',
          document.title,
          window.location.pathname + window.location.search
        );

        navigate('/'); // Redirect back to the main page
      }
    }
  }, [navigate, onReceiveToken]);

  return null; // Render nothing
};

export default Callback;
