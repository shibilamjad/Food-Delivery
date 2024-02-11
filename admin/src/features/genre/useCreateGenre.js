import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGenreApi } from "../../service/apiGenre";
import toast from "react-hot-toast";

export function useCreateGenre() {
  const queryClient = useQueryClient();

  const { mutate: createGenre, isLoading: isCreating } = useMutation({
    mutationFn: createGenreApi,
    onSuccess: () => {
      {
        toast.success("New genre successfully created");
        queryClient.invalidateQueries({ queryKey: ["genre"] });
      }
    },
    onError: (err) => toast.error(err.message),
  });
  return { createGenre, isCreating };
}
