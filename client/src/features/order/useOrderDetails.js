import { useQuery, useQueryClient } from 'react-query';
import { orderDetailsApi } from '../../services/apiOrder';

export function useDetails(orderId) {
  const { data: details, isLoading } = useQuery({
    queryKey: ['details', orderId],
    queryFn: () => orderDetailsApi(orderId),
    enabled: Boolean(orderId),
  });
  return { isLoading, details };
}
