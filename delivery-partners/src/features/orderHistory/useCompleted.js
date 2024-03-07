import { useQuery } from "@tanstack/react-query";
import { completedDetails } from "../../service/apiDeliveryBoy";

export function useCompleted() {
  const { data: orderCompleted, isLoading } = useQuery({
    queryKey: ["history"],
    queryFn: completedDetails,
  });
  return { orderCompleted, isLoading };
}
