import { useQuery } from '@tanstack/react-query';
import { orderDetailsReviewApi } from '../../services/apiOrder';

export function useOrderReview(orderId) {
  const { data: orderReview, isLoading } = useQuery({
    queryKey: ['details', orderId],
    queryFn: () => orderDetailsReviewApi(orderId),
    enabled: Boolean(orderId),
  });
  return { isLoading, orderReview };
}
