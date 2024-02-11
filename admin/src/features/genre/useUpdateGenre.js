import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGenreApi } from "../../service/apiGenre";
import toast from "react-hot-toast";

export function useUpdateGenre() {
  const queryClient = useQueryClient();

  const { mutate: updateGenre } = useMutation({
    mutationFn: (data) => updateGenreApi(data.genreId, data.updateGenre),
    onSuccess: () => {
      toast.success("Genre successfully updated");
      queryClient.invalidateQueries({ queryKey: ["genre"] });
    },
    onError: (error) => {
      console.error("Error updating genre:", error);
      toast.error(`Failed to update genre: ${error.message}`);
    },
  });

  return { updateGenre };
}
