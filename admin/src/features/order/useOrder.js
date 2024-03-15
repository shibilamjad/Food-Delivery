import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getOrder } from "../../service/apOrder";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { PAGE_SIZE } from "../../utils/PAGE_SIZE";

export function useOrders() {
  const [page, setPage] = useState(1);

  const [searchParams] = useSearchParams();
  const deliveryStatus = searchParams.get("delivery") || "all";
  const sortBy = searchParams.get("sortBy") || "startDate-desc";
  const {
    data: order,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useQuery({
    queryKey: ["order", { deliveryStatus, sortBy, page }],
    queryFn: ({ pageParam }) =>
      getOrder(deliveryStatus, sortBy, page, pageParam, PAGE_SIZE),
    getNextPageParam: (lastPage) => {
      if (lastPage.pageCount > page) {
        return page + 1;
      }
      return undefined;
    },
  });
  return { order, isLoading, fetchNextPage, hasNextPage };
}
