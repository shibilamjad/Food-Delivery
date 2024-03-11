import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { createUserApi } from '../../services/apiAuthentication';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: createUserApi,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      toast.success('Succesfully created account');

      navigate('/restaurant');
    },
    onError: () => {
      toast.error('Provided Mobile  are alredy exist');
    },
  });
  return { signUp, isLoading };
}
