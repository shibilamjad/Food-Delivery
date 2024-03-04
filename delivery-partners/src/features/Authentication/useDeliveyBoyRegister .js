import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDeliveryBoy } from "../../service/apiAuthentication";

export function useDeliveyBoyRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: createDeliveryBoy,
    onSuccess: (data) => {
      queryClient.setQueryData(["deliveryBoy"], data.deliveryBoy);
      toast.success("Succesfully created account");

      navigate("/");
    },
    onError: () => {
      toast.error("Provided mobile or name are alredy exist");
    },
  });
  return { signUp, isLoading };
}
