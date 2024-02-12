import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { createUserApi } from '../../services/apiAuthentication';
import { useMutation, useQueryClient } from 'react-query';

export function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: createUserApi,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      toast.success('Succesfully created account');

      navigate('/menu');
    },
    onError: () => {
      toast.error('Provided email or userName are alredy exist');
    },
  });
  return { signUp, isLoading };
}