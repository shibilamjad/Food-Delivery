import { useQuery } from '@tanstack/react-query';
import { apiCity } from '../../services/apiCity';

export function useCity() {
  const { data: getCity, isLoading } = useQuery({
    queryKey: ['city'],
    queryFn: apiCity,
  });
  return { getCity, isLoading };
}
