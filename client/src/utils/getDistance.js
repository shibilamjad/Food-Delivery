import haversine from 'haversine-distance';

export async function getDistance(
  restaurantLat,
  restaurantLong,
  lattitude,
  longitude,
) {
  try {
    const distance = haversine(
      { latitude: lattitude, longitude: longitude },
      { latitude: restaurantLat, longitude: restaurantLong },
    );

    const totalDistance = Math.round(distance / 1000); // Convert meters to kilometers
    return totalDistance;
  } catch (error) {
    console.error('Error getting geolocation:', error);
  }
}
