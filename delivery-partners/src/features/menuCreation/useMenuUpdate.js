import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMenuApi } from "../../service/apiMenu";
import toast from "react-hot-toast";

export function useMenuUpdate() {
  const queryClient = useQueryClient();

  const { mutate: updateMenu } = useMutation({
    mutationFn: (data) => updateMenuApi(data.menuId, data.updateMenu),
    onSuccess: (data) => {
      toast.success("Menu successfully updated");
      queryClient.invalidateQueries({ queryKey: ["menu"] });
    },
    onError: (error) => {
      toast.error(`Failed to update menu: ${error.message}`);
    },
  });
  return { updateMenu };
}
