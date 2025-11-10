import { useQuery } from "@tanstack/react-query";
import type { RequestLpListDto } from "../../types/lps";
import { getLpList } from "../../apis/lps";

function useGetLpList({ cursor, limit, search, order }: RequestLpListDto) {
  return useQuery({
    queryKey: ["lps", order],
    queryFn: () =>
      getLpList({
        cursor,
        limit,
        search,
        order,
      }),
    staleTime: 1000 * 60 * 5, //5분
    gcTime: 1000 * 60 * 10, //10분

    select: (data) => data.data.data,
  });
}

export default useGetLpList;
