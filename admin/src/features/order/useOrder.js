import { useInfiniteQuery } from "@tanstack/react-query";
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
    data: orders,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["order", { deliveryStatus, sortBy, page }],
    queryFn: ({ pageParam }) =>
      getOrder({ deliveryStatus, sortBy, page: pageParam, PAGE_SIZE }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });
  return {
    orders,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
