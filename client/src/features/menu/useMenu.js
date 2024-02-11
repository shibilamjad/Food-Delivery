import { useQuery } from 'react-query';
import { getMenu } from '../../services/apiRestaurant';

export function useMenu() {
  const {
    data: menu,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['menu'],
    queryFn: getMenu,
  });
  return { isLoading, error, menu };
}
