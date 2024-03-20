import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMenuApi } from "../../service/apiMenu";
import toast from "react-hot-toast";

export function useMenuDelete() {
  const queryClient = useQueryClient();

  const { mutate: deleteMenu } = useMutation({
    mutationFn: deleteMenuApi,
    onSuccess: () => {
      toast.success("Menu succesfully deleted");
      queryClient.invalidateQueries({ queryKey: ["menu"] });
    },
    onError: (err) => toast.error("Test account cannot delete restaurants"),
  });
  return { deleteMenu };
}
