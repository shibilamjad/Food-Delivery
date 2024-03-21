import { useQuery } from '@tanstack/react-query';
import { getSearchRestaurants } from '../../services/apiRestaurant';

export function useSearch(search) {
  const { data: restaurants, isLoading } = useQuery({
    queryKey: ['search', { search }],
    queryFn: () => getSearchRestaurants({ search }),
  });
  return {
    restaurants,
    isLoading,
  };
}
