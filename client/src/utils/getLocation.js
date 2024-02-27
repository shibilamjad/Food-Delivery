import { getCurrentPosition } from './getCurrentPostion';
import haversine from 'haversine-distance';

export async function getLocation(lat, long, setTotalDistance) {
  try {
    // Get the user's current position
    const position = await getCurrentPosition();
    const currentLat = position.coords.latitude;
    const currentLong = position.coords.longitude;

    // Calculate the distance between the user's current location and the restaurant's location
    const distance = haversine(
      { latitude: currentLat, longitude: currentLong },
      { latitude: lat, longitude: long },
    );

    setTotalDistance(Math.round(distance / 1000)); // Convert meters to kilometers
  } catch (error) {
    console.error('Error getting geolocation:', error);
  }
}
