import { useQuery } from "@tanstack/react-query";
import { orderDetailsApi } from "../../service/apiDeliveryBoy";

export function useOrderDetails() {
  const { data: details, isLoading } = useQuery({
    queryKey: ["details"],
    queryFn: orderDetailsApi,
  });
  return { isLoading, details };
}
