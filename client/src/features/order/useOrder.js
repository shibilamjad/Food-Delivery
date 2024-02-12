import { useQuery } from 'react-query';
import { orderListApi } from '../../services/apiOrder';

export function useOrder() {
  const { data: order, isLoading } = useQuery({
    queryKey: ['order'],
    queryFn: orderListApi,
  });
  return { isLoading, order };
}
