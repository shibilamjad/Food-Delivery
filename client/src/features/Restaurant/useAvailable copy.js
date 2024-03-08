import { getRestaurants } from '../../services/apiRestaurant';
import { useEffect, useState } from 'react';
import { getCurrentPosition } from '../../utils/getCurrentPostion';
import haversine from 'haversine-distance';
import { useQuery } from '@tanstack/react-query';

export function useAvailable() {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [availableRestaurants, setAvailableRestaurants] = useState([]);
  const {
    data: restaurants,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['available'],
    queryFn: getRestaurants,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the user's current position
        const position = await getCurrentPosition();
        setCurrentPosition(position.coords);

        // Calculate the distance to each restaurant
        const restaurantsWithDistance =
          restaurants &&
          restaurants.map((restaurant) => {
            const distance = haversine(
              {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
              { latitude: restaurant.lat, longitude: restaurant.long },
            );
            return {
              ...restaurant,
              distance: Math.round(distance / 1000), // Convert meters to kilometers
            };
          });

        // Filter restaurants within 30 km
        const filteredRestaurants = restaurantsWithDistance
          ? restaurantsWithDistance.filter(
              (restaurant) => restaurant.distance <= 30,
            )
          : [];

        setAvailableRestaurants(filteredRestaurants);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [restaurants]);

  return {
    availableRestaurants,
    currentPosition,
    isLoading,
    isError,
  };
}
