import { useMutation, useQueryClient } from 'react-query';
import { createOrderApi } from '../../services/apiOrder';
import toast from 'react-hot-toast';

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const { mutate: createOrder } = useMutation({
    mutationFn: createOrderApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['order']);
      toast.success('Order successfully placed');
    },
    onError: () => toast.error('Order not placed'),
  });

  return { createOrder };
}
