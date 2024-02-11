import { login as loginApi } from '../services/apiAuthentication';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
// import { useAuth } from '../../context/AuthContext';

export function useLogin() {
  // const { setIsAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      toast.success('Succesfully login');
      // setIsAuthenticated(true);
      navigate('/menu');
    },
    onError: (err) => {
      toast.error('Provided email or password are incorrect');
    },
  });

  return { login, isLoading };
}
