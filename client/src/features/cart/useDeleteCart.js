import toast from 'react-hot-toast';
import { deleateCartApi } from '../../services/apiCart';
import { useMutation, useQueryClient } from 'react-query';

export function useDeleteCart() {
  const queryClient = useQueryClient();
  const { mutate: deleateCart } = useMutation({
    mutationFn: deleateCartApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['cart'], data.user);
      toast.success('Successfully Menu deleted');
    },
    onError: () => toast.error('Menu already deleted to WatchLater'),
  });
  return { deleateCart };
}
