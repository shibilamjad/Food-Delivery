import { useQuery } from '@tanstack/react-query';
import { cartListApi } from '../../services/apiCart';

export function useCart() {
  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: cartListApi,
  });
  return { isLoading, cart };
}
