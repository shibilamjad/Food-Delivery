import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clearCartApi } from '../../services/apiCart';
import toast from 'react-hot-toast';

export function useClearCarts() {
  const queryClient = useQueryClient();
  const { mutate: clearCarts } = useMutation({
    mutationFn: clearCartApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['cart'], data.user);
      toast.success('All items removed from the cart');
    },
    onError: () => toast.error('CartList is already removed'),
  });

  return { clearCarts };
}
