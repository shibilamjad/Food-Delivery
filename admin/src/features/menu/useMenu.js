import { useQuery } from "@tanstack/react-query";
import { getMenu } from "../../service/apiMenu";

export function useMenu() {
  const { data: menu, isLoading } = useQuery({
    queryKey: ["menu"],
    queryFn: getMenu,
  });
  return { menu, isLoading };
}
