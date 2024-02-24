import { useQuery } from "@tanstack/react-query";
import { getRestaurantId } from "../../service/apiRestaurants";

export function useRestaurantId(reastaurantId) {
  const { data: restaurantDetail, isLoading } = useQuery({
    queryKey: ["restaurants", reastaurantId],
    queryFn: () => getRestaurantId(reastaurantId),
    enabled: Boolean(reastaurantId),
  });
  return { isLoading, restaurantDetail };
}
