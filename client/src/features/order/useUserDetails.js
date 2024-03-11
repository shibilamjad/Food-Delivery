import { useQuery } from '@tanstack/react-query';
import { orderUserDetails } from '../../services/apiOrder';

export function useUserDetails() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: orderUserDetails,
  });
  return { isLoading, user };
}
