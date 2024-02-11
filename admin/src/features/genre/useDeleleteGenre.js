import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGenreApi } from "../../service/apiGenre";
import toast from "react-hot-toast";

export function useDeleleteGenre() {
  const queryClient = useQueryClient();

  const { mutate: deleteGenre, isLoading: isDeleting } = useMutation({
    mutationFn: deleteGenreApi,
    onSuccess: () => {
      {
        toast.success("Genre successfully Deleleted");
        queryClient.invalidateQueries({ queryKey: ["genre"] });
      }
    },
    onError: (err) => toast.error(err.message),
  });
  return { deleteGenre, isDeleting };
}
