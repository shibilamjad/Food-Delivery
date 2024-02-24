import { useQuery } from '@tanstack/react-query';
import { getMenu } from '../../services/apiRestaurant';

export function useMenu() {
  const {
    data: menu,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['menu'],
    queryFn: getMenu,
  });
  return { isLoading, isError, menu };
}
