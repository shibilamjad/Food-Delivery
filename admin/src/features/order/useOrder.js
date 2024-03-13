import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrder } from "../../service/apOrder";
import { useSearchParams } from "react-router-dom";

export function useOrders() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // filter
  const filterValue = searchParams.get("status");
  const filter =
    filterValue && filterValue !== "all"
      ? { field: "status", value: filterValue }
      : null;
  // sortBy
  const sortByRaw = searchParams.get("sortBy") || "createdAt-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const { data: order, isLoading } = useQuery({
    queryKey: ["order", filter, sortBy],
    queryFn: getOrder,
  });

  return { order, isLoading };
}
