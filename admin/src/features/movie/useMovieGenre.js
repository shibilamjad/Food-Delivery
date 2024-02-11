import { useQuery } from "@tanstack/react-query";
import { getGenre } from "../../service/apiGenre";

export function useMovieGenre() {
  const {
    data: movieGenre,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movie"],
    queryFn: getGenre,
  });
  return { isLoading, error, movieGenre };
}
