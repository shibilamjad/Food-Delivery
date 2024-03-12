import { useQuery } from "@tanstack/react-query";
import { getTotalOrderDeliveryBoy } from "../../service/apiDashboard";

export function useDashboard() {
  const { data: orderStats, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getTotalOrderDeliveryBoy,
  });
  return { orderStats, isLoading };
}
