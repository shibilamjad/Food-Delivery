import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrderApi } from '../../services/apiOrder';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCreateOrder() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createOrder } = useMutation({
    mutationFn: createOrderApi,
    onSuccess: (orderId) => {
      queryClient.invalidateQueries(['order']);
      navigate(`/status/${orderId}`);

      toast.success('Order successfully placed');
    },
    onError: () => toast.error('Order not placed'),
  });

  return { createOrder };
}
