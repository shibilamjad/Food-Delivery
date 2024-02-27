import { useQuery } from "@tanstack/react-query";
import { getRestaurants } from "../../service/apiRestaurants";

export function useRestaurant() {
  const { data: restaurants, isLoading } = useQuery({
    queryKey: ["restaurants"],
    queryFn: getRestaurants,
  });
  return { restaurants, isLoading };
}
