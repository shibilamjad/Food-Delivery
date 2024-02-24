import { useQuery } from '@tanstack/react-query';
import { getRestaurants } from '../../services/apiRestaurant';

export function useRestaurant() {
  const {
    data: restaurants,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['restaurants'],
    queryFn: getRestaurants,
  });
  return { restaurants, isLoading, isError };
}
