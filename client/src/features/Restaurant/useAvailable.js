import { useQuery } from '@tanstack/react-query';
import { fetchAvailableMenus } from '../../services/apiRestaurant';

export function useAvailable() {
  const {
    data: availableRestaurants,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['restaurants'],
    queryFn: fetchAvailableMenus,
  });
  return { availableRestaurants, isLoading, isError };
}
