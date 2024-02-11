import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../../service/apiMovies";

export function useMovies() {
  const { data: menu, isLoading } = useQuery({
    queryKey: ["menu"],
    queryFn: getMovies,
  });
  return { menu, isLoading };
}
