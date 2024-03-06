import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { takeDeliveryBoyOrdersApi } from "../../service/apiDeliveryBoy";

export function useTakeOrder() {
  const queryClient = useQueryClient();

  const { mutate: takeOrder } = useMutation({
    mutationFn: takeDeliveryBoyOrdersApi,
    onSuccess: () => {
      toast.success("Your Order successfully placed");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { takeOrder };
}
