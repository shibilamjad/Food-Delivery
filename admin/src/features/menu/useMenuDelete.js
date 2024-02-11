import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMenuApi } from "../../service/apiMovies";
import toast from "react-hot-toast";

export function useMenuDelete() {
  const queryClient = useQueryClient();

  const { mutate: deleteMenu } = useMutation({
    mutationFn: deleteMenuApi,
    onSuccess: () => {
      toast.success("Movie succesfully deleted");
      queryClient.invalidateQueries({ queryKey: ["menu"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { deleteMenu };
}
