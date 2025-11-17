import { useQuery } from "@tanstack/react-query";
import type { RequestLpDto } from "../../types/lp";
import { QUERY_KEY } from "../../constants/key";
import { getLpDetail } from "../../apis/lp";

function useGetLpDetail({lpId}:RequestLpDto) {
    return useQuery ( {
        queryKey: [QUERY_KEY.lps, lpId],
        queryFn: () => getLpDetail({lpId}),
    });
}

export default useGetLpDetail;