import { useQuery } from "@tanstack/react-query";
import { getRestaurantsMenu } from "../../service/apiRestaurants";

export function useRestaurantsMenu(restaurantId) {
  const {
    data: restaurantMenu,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["menu", restaurantId],
    queryFn: () => getRestaurantsMenu(restaurantId),
    enabled: Boolean(restaurantId),
  });
  return { isLoading, restaurantMenu, isError };
}
