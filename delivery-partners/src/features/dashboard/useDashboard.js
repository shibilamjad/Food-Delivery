import { useQuery } from "@tanstack/react-query";
import { getTotalSats } from "../../service/apiDashboard";

export function useDashboard() {
  const { data: orderStats, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getTotalSats,
  });
  return { orderStats, isLoading };
}
