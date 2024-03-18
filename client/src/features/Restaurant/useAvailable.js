import { useState } from 'react';
import { getAvailableRestaurnat } from '../../services/apiRestaurant';
import { useInfiniteQuery } from '@tanstack/react-query';
import { PAGE_SIZE } from '../../utils/PAGE_SIZE';

export function useAvailable() {
  const [page, setPage] = useState(1);

  const {
    data: availableRestaurants,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['available', { page }],
    queryFn: ({ pageParam }) =>
      getAvailableRestaurnat({ page: pageParam, PAGE_SIZE }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      const nextPage = lastPage.length ? allPage.length + 1 : undefined;
      return nextPage;
    },
  });

  return {
    availableRestaurants,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
