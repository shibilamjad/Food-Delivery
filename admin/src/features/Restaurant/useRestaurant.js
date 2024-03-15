import { useQuery } from "@tanstack/react-query";
import { getRestaurants } from "../../service/apiRestaurants";

export function useRestaurant(search) {
  const { data: restaurants, isLoading } = useQuery({
    queryKey: ["restaurants", { search }],
    queryFn: () => getRestaurants(search),
  });
  return { restaurants, isLoading };
}
