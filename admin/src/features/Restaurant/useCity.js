import { useQuery } from "@tanstack/react-query";
import { apiCity } from "../../service/apiCity";

export function useCity() {
  const { data: getCity } = useQuery({
    queryKey: ["city"],
    queryFn: apiCity,
  });
  return { getCity };
}
