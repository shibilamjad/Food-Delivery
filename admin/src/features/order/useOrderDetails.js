import { useQuery } from "@tanstack/react-query";
import { getOrderDetailsApi } from "../../service/apOrder";

export function useOrderDetails(orderId) {
  const { data: details, isLoading } = useQuery({
    queryKey: ["details", orderId],
    queryFn: () => getOrderDetailsApi(orderId),
    enabled: Boolean(orderId),
  });
  return { isLoading, details };
}
