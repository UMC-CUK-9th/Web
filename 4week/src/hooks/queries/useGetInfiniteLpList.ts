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
      // console.log 제거
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },

    // ⬇️ --- 체크리스트 항목 반영 --- ⬇️

    // [체크리스트] staleTime / cacheTime 조정
    // 5분간 데이터를 'fresh' 상태로 간주 (불필요한 API 요청 감소)
    staleTime: 1000 * 60 * 5,
    // 10분간 컴포넌트가 언마운트 되어도 캐시 유지
    cacheTime: 1000 * 60 * 10,

    // ℹ️ 'enabled' 옵션 관련
    // 체크리스트의 '빈 검색어일 때 쿼리 실행 안 함' (enabled: search.trim() !== "")
    // 항목은 *추가하지 않았습니다.*
    //
    // [이유]
    // 이 옵션을 추가하면, 검색어가 없는 'HomePage'의
    // '전체 목록' 조회가 불가능해집니다.
    //
    // 현재 로직(빈 search 문자열을 API로 넘기는)이
    // "빈 문자열 = 전체 목록 조회"를 의도한 올바른 방식입니다.
    // (API 함수 'getLpList' 내부에서 빈 문자열을 처리)
  });
}

export default useGetInfiniteLpList;