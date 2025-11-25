import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import type { PAGINATION_ORDER } from "../../enums/common";
import { QUERY_KEY } from "../../constants/key";

function useGetInfiniteLpList(
  limit: number,
  search: string,
  order: PAGINATION_ORDER
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      getLpList({ cursor: pageParam, limit, search, order }),
      
    // [체크리스트] queryKey에 지연된 값(search) 포함
    queryKey: [QUERY_KEY.lps, search, order],
    
    initialPageParam: 0,
    
    // [체크리스트] getNextPageParam 구현
    getNextPageParam: (lastPage) => {
      // (기존 코드에서 console.log 제거)
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },

    // [체크리스트] staleTime / cacheTime 조정
    // 5분간 데이터를 'fresh' 상태로 간주 (불필요한 API 요청 감소)
    staleTime: 1000 * 60 * 5,
    // 10분간 컴포넌트가 언마운트 되어도 캐시 유지
    cacheTime: 1000 * 60 * 10,
  });
}

export default useGetInfiniteLpList;