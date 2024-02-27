import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { adminLoginApi } from "../../service/apiAuthentication";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: loginAdmin, isLoading } = useMutation({
    mutationFn: adminLoginApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      toast.success("Succesfully login");
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { loginAdmin, isLoading };
}
