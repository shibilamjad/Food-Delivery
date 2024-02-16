import { useQuery } from "@tanstack/react-query";
import { getOrderNofitysApi } from "../../service/apOrder";

export function useNotify() {
  const { data: notify, isLoading } = useQuery({
    queryKey: ["notify"],
    queryFn: getOrderNofitysApi,
  });
  return { notify, isLoading };
}
