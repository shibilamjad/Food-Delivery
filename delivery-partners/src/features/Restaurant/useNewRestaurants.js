import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createRestaurantsApi } from "../../service/apiRestaurants";

export function useCreateRestaurants() {
  const queryClient = useQueryClient();
  const { mutate: createRestaurant } = useMutation({
    mutationFn: createRestaurantsApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["restaurants"]);

      toast.success("New Restaurants successfully placed");
    },
    onError: () => toast.error("restaurants not placed"),
  });

  return { createRestaurant };
}
