import { login as loginApi } from '../../services/apiAuthentication';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      toast.success('Succesfully login');
      navigate('/restaurant');
    },
    onError: (err) => {
      toast.error('Provided UserName or password are incorrect');
    },
  });

  return { login, isLoading };
}
