import { useQuery } from "@tanstack/react-query";
import type { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({cursor,search,order,limit,sort}:PaginationDto){
    return useQuery({
        queryKey: [QUERY_KEY.lps, search, order, sort, cursor, limit],
        queryFn: () => getLpList({
            cursor,
            search,
            order,
            limit,
            sort,
        }),

        
        staleTime : 5 * 60 * 1000, 

        
        gcTime : 10 * 60 * 1000, 

        

        select: (data) => data.data.data,
        
    });
}


export default useGetLpList;