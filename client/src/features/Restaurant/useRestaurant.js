import { useQuery } from '@tanstack/react-query';
import haversine from 'haversine-distance';
import { useEffect, useState } from 'react';

import { getRestaurants } from '../../services/apiRestaurant';
import { getCurrentPosition } from '../../utils/getCurrentPostion';

export function useRestaurant() {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [allRestaurant, setAllRestaurant] = useState([]);
  const {
    data: restaurants,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['restaurants'],
    queryFn: getRestaurants,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the user's current position
        const position = await getCurrentPosition();
        setCurrentPosition(position.coords);

        if (restaurants) {
          // Calculate the distance to each restaurant
          const restaurantsWithDistance = restaurants.map((restaurant) => {
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

          setAllRestaurant(restaurantsWithDistance);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [restaurants]);

  return { allRestaurant, isLoading, isError };
}
