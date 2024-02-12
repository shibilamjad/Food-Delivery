import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMenuApi } from "../../service/apiMovies";
import toast from "react-hot-toast";

export function useMovieUpdate() {
  const queryClient = useQueryClient();

  const { mutate: updateMenu } = useMutation({
    mutationFn: (data) => updateMenuApi(data.menuId, data.updateMenu),
    onSuccess: (data) => {
      toast.success("Menu successfully updated");
      queryClient.invalidateQueries({ queryKey: ["menu"] });
    },
    onError: (error) => {
      toast.error(`Failed to update Movie: ${error.message}`);
    },
  });
  return { updateMenu };
}
