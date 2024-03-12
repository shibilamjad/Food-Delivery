import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { otpApi } from "../../service/apiOtpConfirmation";

export function useOtp() {
  const { mutate: otpSend } = useMutation({
    mutationFn: otpApi,
    onSuccess: () => {
      toast.success("Otp sent successfully");
    },
    onError: (err) => toast.error(err.message),
  });
  return { otpSend };
}
