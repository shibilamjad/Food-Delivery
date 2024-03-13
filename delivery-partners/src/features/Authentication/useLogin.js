import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deliveryBoyLoginApi } from "../../service/apiAuthentication";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: deliveryBoyLoginApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["deliveryBoy"], data.deliveryBoy);
      toast.success("Succesfully login");
      navigate("/");
    },
    onError: (err) => {
      toast.error("Provided Mobile or password are incorrect");
    },
  });

  return { login, isLoading };
}
