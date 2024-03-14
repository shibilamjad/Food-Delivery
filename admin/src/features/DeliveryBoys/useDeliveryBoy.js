import { useQuery } from "@tanstack/react-query";
import { getDeliveryBoysApi } from "../../service/apiDeliveryBoy";

export function useDeliveryBoy() {
  const { data: deliveryBoys, isLoading } = useQuery({
    queryKey: ["deliveryBoys"],
    queryFn: getDeliveryBoysApi,
  });
  return { deliveryBoys, isLoading };
}
