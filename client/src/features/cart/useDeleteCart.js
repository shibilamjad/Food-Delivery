import toast from 'react-hot-toast';
import { deleateCartApi } from '../../services/apiCart';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteCart() {
  const queryClient = useQueryClient();
  const { mutate: deleteCart } = useMutation({
    mutationFn: deleateCartApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['cart'], data.user);
      toast.success('Successfully Menu removed from CartList');
    },
    onError: () => toast.error('Menu already removed to CartList'),
  });
  return { deleteCart };
}
