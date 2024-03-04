import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateRestaurantsApi } from "../../service/apiRestaurants";
export function useUpdateRestaurants() {
  const queryClient = useQueryClient();

  const { mutate: updateRestaurant } = useMutation({
    mutationFn: (data) =>
      updateRestaurantsApi(data.updateRestaurant, data.restaurantId),
    onSuccess: (data) => {
      toast.success("Restaurant successfully updated");
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
    onError: (error) => {
      toast.error(`Failed to update Restaurant: ${error.message}`);
    },
  });
  return { updateRestaurant };
}
