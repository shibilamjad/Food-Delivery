import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { deliveryBoyOrderConfirmApi } from "../../service/apiDeliveryBoy";

export function useConfirm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: confirm } = useMutation({
    mutationFn: deliveryBoyOrderConfirmApi,
    onSuccess: () => {
      toast.success("Your Order successfully compleated");
      queryClient.invalidateQueries({ queryKey: ["details"] });
      navigate("/restaurants");
    },
    onError: (err) => toast.error(err.message),
  });
  return { confirm };
}
