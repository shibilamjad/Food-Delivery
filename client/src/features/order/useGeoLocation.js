import { useEffect, useState } from 'react';
import { getAddress } from '../../services/apiGeocoding';

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export function useGeoLocation() {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const positionObj = await getPosition();
        const newPosition = {
          latitude: positionObj.coords.latitude,
          longitude: positionObj.coords.longitude,
        };

        setPosition(newPosition);
      } catch (error) {
        console.error('Error getting position:', error);
      }
    };

    if (!position) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        if (!position) return;

        // Only fetch address if position is available
        const addressObj = await getAddress(position);
        const formattedAddress = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

        setAddress(formattedAddress);
      } catch (error) {
        console.error('Error getting address:', error);
      }
    };

    fetchAddress();
  }, [position]);

  return { position, address };
}
