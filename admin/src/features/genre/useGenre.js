import { useQuery } from "@tanstack/react-query";
import { getGenre } from "../../service/apiGenre";

export function useGenre() {
  const {
    data: genre,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["genre"],
    queryFn: getGenre,
  });
  return { isLoading, error, genre };
}
