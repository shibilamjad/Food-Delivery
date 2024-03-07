import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { takeDeliveryBoyOrdersApi } from "../../service/apiDeliveryBoy";

export function useTakeOrder() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: takeOrder } = useMutation({
    mutationFn: takeDeliveryBoyOrdersApi,
    onSuccess: () => {
      toast.success("Your Order successfully placed");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      navigate("/detailsOrder");
    },
    onError: (err) => toast.error(err.message),
  });
  return { takeOrder };
}
