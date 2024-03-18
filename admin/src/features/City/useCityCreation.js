import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiCityCreate } from "../../service/apiCity";

export function useCityCreation() {
  const queryClient = useQueryClient();

  const {
    mutate: cityCreate,
    isLoading,
    status,
  } = useMutation({
    mutationFn: apiCityCreate,
    onSuccess: () => {
      toast.success("City succesfully created");
      queryClient.invalidateQueries({ queryKey: ["city"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { cityCreate, isLoading, status };
}
