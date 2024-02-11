import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { uploadMenuApi } from "../../service/apiMovies";

export function useMovieCreate() {
  const queryClient = useQueryClient();
  const { mutate: createMenu } = useMutation({
    mutationFn: uploadMenuApi,
    onSuccess: () => {
      toast.success("Menu successfully created");
      queryClient.invalidateQueries({ queryKey: ["menu"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { createMenu };
}
