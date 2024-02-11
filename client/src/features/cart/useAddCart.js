import { useMutation, useQueryClient } from 'react-query';
import { addCartApi } from '../../services/apiCart';
import toast from 'react-hot-toast';

export function useAddCart() {
  const queryClient = useQueryClient();
  const { mutate: addCart } = useMutation({
    mutationFn: addCartApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['cart'], data.user);
      toast.success('Successfully Cart added');
    },
    onError: () => toast.error('Cart already added to WatchLater'),
  });
  return { addCart };
}
