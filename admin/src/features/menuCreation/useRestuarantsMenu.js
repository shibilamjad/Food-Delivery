import { useQuery } from "@tanstack/react-query";
import { getRestaurantsMenuCreation } from "../../service/apiRestaurants";

export function useRestuarantsMenu() {
  const { data: restaurantsMenu, isLoading } = useQuery({
    queryKey: ["restaurantsMenu"],
    queryFn: getRestaurantsMenuCreation,
  });
  return { isLoading, restaurantsMenu };
}
