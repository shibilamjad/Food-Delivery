import { useInfiniteQuery } from "@tanstack/react-query";
import { getRestaurants } from "../../service/apiRestaurants";
import { useState } from "react";
import { PAGE_SIZE } from "../../utils/PAGE_SIZE";

export function useRestaurant(search) {
  const [page, setPage] = useState(1);

  const {
    data: restaurants,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["restaurants", { page, search }],
    queryFn: ({ pageParam }) =>
      getRestaurants({ search, page: pageParam, PAGE_SIZE }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });
  return {
    restaurants,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
