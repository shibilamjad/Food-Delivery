import { getCurrentPosition } from './getCurrentPostion';
import haversine from 'haversine-distance';

export async function getLocation(lat, long, setTotalDistance) {
  try {
    const position = await getCurrentPosition();
    const currentLat = position.coords.latitude;
    const currentLong = position.coords.longitude;

    const resLat = lat ? lat : null;
    const resLong = long ? long : null;

    if (resLat !== null && resLong !== null) {
      const a = { latitude: currentLat, longitude: currentLong };
      const b = { latitude: resLat, longitude: resLong };
      setTotalDistance(Math.round(haversine(a, b) / 1000));
    } else {
      console.log('Restaurant latitude or longitude is missing.');
    }
  } catch (error) {
    console.error('Error getting geolocation:', error);
  }
}
