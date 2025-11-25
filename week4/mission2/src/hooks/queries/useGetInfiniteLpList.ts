import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import type { PAGINATION_ORDER } from "../../enums/common";
import { QUERY_KEY } from "../../constants/key";

/**
 * @param limit - 한 번에 가져올 개수 (예: 10)
 * @param search - 디바운스된 검색어
 * @param order - 정렬 기준 (ASC / DESC)
 */
function useGetInfiniteLpList(limit: number, search: string, order: PAGINATION_ORDER) {
  
  const trimmed = search.trim();

  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lps, trimmed, order],

    queryFn: ({ pageParam }) =>
      getLpList({
        cursor: pageParam,
        limit,
        search: trimmed,
        order,
      }),

    initialPageParam: 0,

    getNextPageParam: (lastPage) =>
      lastPage?.data?.hasNext ? lastPage.data.nextCursor : undefined,


    enabled: trimmed === "" || trimmed.length > 0,

    staleTime: 60 * 1000,   
    gcTime: 5 * 60 * 1000,   
  });
}

export default useGetInfiniteLpList;
