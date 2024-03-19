import { forgetPasswordApi } from '../../services/apiAuthentication';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

export function useForgetPassword() {
  const navigate = useNavigate();

  const { mutate: forgetPassword, isLoading } = useMutation({
    mutationFn: forgetPasswordApi,
    onSuccess: (data) => {
      toast.success('Succesfully reset Password');
      navigate('/sign-in');
    },
    onError: (err) => {
      toast.error('Provided Mobile Number or password are incorrect');
    },
  });

  return { forgetPassword, isLoading };
}
