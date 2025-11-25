import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { PaginationDto } from "../../types/common";

function useGetInfiniteLpList(
    limit: number,
    search: string,
    order: PaginationDto['order']
) {
    return useInfiniteQuery ( {
        queryFn: ({pageParam}) =>
            getLpList({cursor: pageParam, limit, search, order}),
        queryKey:[QUERY_KEY.lps, search, order],
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            return lastPage.data.hasNext?lastPage.data.nextCursor : undefined;

        },
        staleTime: 1000 * 60 * 1,
    });
}

export default useGetInfiniteLpList;