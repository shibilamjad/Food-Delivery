import { useQuery } from '@tanstack/react-query';
import { getRestaurantsNearby } from '../../services/apiRestaurant';

export function useNearby() {
  const {
    data: nearby,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['nearby'],
    queryFn: getRestaurantsNearby,
  });
  return { nearby, isLoading, isError };
}
