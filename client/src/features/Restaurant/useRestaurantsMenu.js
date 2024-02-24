import { useQuery } from '@tanstack/react-query';
import { getRestaurantsMenu } from '../../services/apiRestaurant';

export function useRestaurantsMenu(restaurantId) {
  const {
    data: restaurantMenu,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['restaurants', restaurantId],
    queryFn: () => getRestaurantsMenu(restaurantId),
    enabled: Boolean(restaurantId),
  });
  return { isLoading, restaurantMenu, isError };
}
