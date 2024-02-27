import { useQuery } from "@tanstack/react-query";
import { getMenuId } from "../../service/apiMenu";

export function useMenuEdit(menuId) {
  const { data: menuEdit, isLoading } = useQuery({
    queryKey: ["menu", menuId],
    queryFn: () => getMenuId(menuId),
    enabled: Boolean(menuId),
  });
  return { isLoading, menuEdit };
}
