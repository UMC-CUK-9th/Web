import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import type { PAGINATION_ORDER } from "../../enums/common";
import { QUERY_KEY } from "../../constants/key";

function useGetInfiniteLpList( 
        limit: number,
        search: string,
        order: PAGINATION_ORDER,
   
){
    return useInfiniteQuery({
        queryFn:({pageParam})=>getLpList({cursor:pageParam, limit, search, order}),
        queryKey:[QUERY_KEY.lps,search, order],
        // [1] (수정) 첫 페이지의 cursor를 0으로 명확하게 지정합니다. (undefined 대신)
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
          // [2] (수정) API 응답 구조에 맞게 lastPage.data.hasNext로 접근합니다.
          return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
        }
            
})
}

export default useGetInfiniteLpList;