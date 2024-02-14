import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateQuantity } from '../../services/apiCart';

export function useUpdateQuantity() {
  const queryClient = useQueryClient();
  const { mutate: updateCart } = useMutation({
    mutationFn: (data) => updateQuantity(data.menuItemId, data.action),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['cart']);
    },
  });
  return { updateCart };
}
