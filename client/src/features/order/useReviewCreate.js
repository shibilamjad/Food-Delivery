import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createReviewApi } from '../../services/apiReview';

export function useReviewCreate() {
  const queryClient = useQueryClient();

  const { mutate: reviewCreate } = useMutation({
    mutationFn: createReviewApi,
    onSuccess: (data) => {
      toast.success('Review successfully created');
      queryClient.invalidateQueries({ queryKey: ['review'] });
    },
    onError: (error) => {
      toast.error(`Failed to review: ${error.message}`);
    },
  });
  return { reviewCreate };
}
