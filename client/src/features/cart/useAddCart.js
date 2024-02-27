import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCartApi } from '../../services/apiCart';
import toast from 'react-hot-toast';

export function useAddCart() {
  const queryClient = useQueryClient();
  const { mutate: addCart } = useMutation({
    mutationFn: addCartApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['cart'], data.user);
      toast.success('Successfully added to cart');
    },
    onError: () => toast.error('Failed to add to cart'),
  });
  return { addCart };
}
