import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrder } from "../../service/apOrder";
import { useSearchParams } from "react-router-dom";

export function useOrders() {
  const [searchParams] = useSearchParams();
  const deliveryStatus = searchParams.get("delivery") || "all";
  const sortBy = searchParams.get("sortBy") || "startDate-desc";

  const { data: order, isLoading } = useQuery({
    queryKey: ["order", { deliveryStatus, sortBy }],
    queryFn: () => getOrder(deliveryStatus, sortBy),
  });
  return { order, isLoading };
}
