import { getAvailableRestaurnat } from '../../services/apiRestaurant';
import { useQuery } from '@tanstack/react-query';

export function useAvailable() {
  const {
    data: availableRestaurants,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['available'],
    queryFn: getAvailableRestaurnat,
  });

  return { availableRestaurants, isLoading, isError };
}
