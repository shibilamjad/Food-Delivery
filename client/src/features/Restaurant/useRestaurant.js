import { useInfiniteQuery } from '@tanstack/react-query';

import { getRestaurants } from '../../services/apiRestaurant';
import { PAGE_SIZE } from '../../utils/PAGE_SIZE';
import { useState } from 'react';

export function useRestaurant() {
  const [page, setPage] = useState(1);

  const {
    data: restaurants,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['restaurants', { page }],
    queryFn: ({ pageParam }) => getRestaurants({ page: pageParam, PAGE_SIZE }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      const nextPage = lastPage.length ? allPage.length + 1 : undefined;
      return nextPage;
    },
  });

  return {
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    restaurants,
  };
}
