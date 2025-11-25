
import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../apis/lp";
import { QUERY_KEY } from "../constants/key";



type UseGetInfiniteLpListParams = {
  limit: number;
  search: string;
  order: "asc" | "desc";
  enabled?: boolean;
  staleTime?: number;
  gcTime?: number;
};

function useGetInfiniteLpList({ limit, search, order, enabled = true, staleTime, gcTime }: UseGetInfiniteLpListParams) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      getLpList({ cursor: pageParam, limit, search, order }),
    queryKey: [QUERY_KEY.lps, search, order],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      // lastPage 또는 lastPage.data가 undefined/null일 때 안전하게 처리
      if (!lastPage || !lastPage.data || typeof lastPage.data.hasNext === 'undefined') {
        return undefined;
      }
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
    enabled,
    staleTime,
    gcTime,
  });
}

export default useGetInfiniteLpList;