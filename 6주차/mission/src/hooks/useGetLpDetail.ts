import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../apis/lp";
import { QUERY_KEY } from "../constants/key";

function useGetLpDetail(lpid: string | undefined) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, lpid],

    queryFn: () => getLpDetail(lpid),

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export default useGetLpDetail;