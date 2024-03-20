import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRestaurantApi } from "../../service/apiRestaurants";
import toast from "react-hot-toast";

export function useRestaurantDelete() {
  const queryClient = useQueryClient();
  const { mutate: deleteRestaurant } = useMutation({
    mutationFn: deleteRestaurantApi,
    onSuccess: () => {
      toast.success("restaurants succesfully deleted");
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
    onError: (err) => toast.error("Test account cannot delete restaurants"),
  });
  return { deleteRestaurant };
}
