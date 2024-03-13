import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { deliveryBoyLogoutApi } from "../../service/apiAuthentication";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: deliveryBoyLogoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      toast.success("Succesfully Logout");
      navigate("/sign-in", { replace: true });
    },
  });

  return { logout, isLoading };
}
