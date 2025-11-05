import { useQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import type { PaginationDto } from "../../types/common";
import { QUERY_KEY } from "../../constants/key";
import type { Lp } from "../../types/lp";

// 'order' 대신 'sort'를 받도록 구조 분해 할당 수정
function useGetLpList({ cursor, search, order, limit }: PaginationDto) {
  return useQuery({
    // queryKey에도 'sort'를 포함시킵니다.
    queryKey: [QUERY_KEY.lps],

    // queryFn에도 'sort'를 전달합니다.
    queryFn: () => getLpList({ cursor, search, order, limit }),

    // data.data.data를 반환하는 'select' 옵션은 그대로 유지 (좋은 방식입니다!)
    // (체크리스트) staleTime/gcTime 설정 예시
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  });
}

export default useGetLpList;