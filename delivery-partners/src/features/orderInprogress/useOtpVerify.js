import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { verifyOtpApi } from "../../service/apiOtpConfirmation";

export function useOtpVerify() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: otpVerify } = useMutation({
    mutationFn: verifyOtpApi,
    onSuccess: () => {
      toast.success("Your Order successfully compleated");
      queryClient.invalidateQueries({ queryKey: ["details"] });
      navigate("/completed");
    },
    onError: (err) => toast.error(err.message),
  });
  return { otpVerify };
}
