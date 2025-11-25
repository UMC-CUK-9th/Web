
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query"; // [수정] InfiniteData 추가
import { getLpComments } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { PaginationDto } from "../../types/common";
import type { ResponseLpCommentsDto } from "../../types/comment";

function useGetInfiniteLpComments(
    lpId: number,
    limit: number,
    order: PaginationDto['order']
) {
    return useInfiniteQuery<
        ResponseLpCommentsDto,
        Error,
        InfiniteData<ResponseLpCommentsDto>, 
        (string | number | undefined)[],
        number | undefined 
    >({
        queryKey: [QUERY_KEY.lpComments, lpId, order],
        
        queryFn: ({ pageParam }) => 
            getLpComments({ lpId, cursor: pageParam, limit, order }),
        
        initialPageParam: undefined, 
        
        getNextPageParam: (lastPage) => {
            return lastPage.data.hasNext ? (lastPage.data.nextCursor ?? undefined) : undefined;
        },
    });
}

export default useGetInfiniteLpComments;