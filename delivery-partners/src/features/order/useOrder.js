import { useQuery } from "@tanstack/react-query";
import { getDeliveryBoyOrders } from "../../service/apiDeliveryBoy";

export function useDeliveryBoyOrder() {
  const { data: order, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getDeliveryBoyOrders,
  });
  return { order, isLoading };
}
