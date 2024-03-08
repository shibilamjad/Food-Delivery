import { useState } from 'react';

export function useGeolocation(defaultPosition = null) {
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);

  function getPosition(e) {
    e.preventDefault();
    if (!navigator.geolocation)
      return setError('Your browser does not support geolocation');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (error) => {
        setError(error.message);
      },
    );
  }

  return { position, error, getPosition };
}
