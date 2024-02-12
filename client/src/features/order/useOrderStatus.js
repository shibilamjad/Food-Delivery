import { useQuery } from 'react-query';
import { orderStatusApi } from '../../services/apiOrder';

export function useOrderStatus() {
  const { data: orderStatus, isLoading } = useQuery({
    queryKey: ['status'],
    queryFn: orderStatusApi,
  });
  return { isLoading, orderStatus };
}
