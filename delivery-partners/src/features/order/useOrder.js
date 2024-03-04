import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../../service/apOrder";

export function useOrders() {
  const { data: order, isLoading } = useQuery({
    queryKey: ["order"],
    queryFn: getOrder,
  });
  return { order, isLoading };
}
