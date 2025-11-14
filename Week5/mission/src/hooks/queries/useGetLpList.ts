import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { ResponseLpListDto } from "../../types/lp";


type LpItem = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: { id: number; name: string }[];
  likes: { id: number; userId: number; lpId: number }[];
};

function useGetLplist({
  cursor,
  search,
  order,
  limit,
}: PaginationDto): UseQueryResult<LpItem[], Error> {
  return useQuery({
    queryKey: [QUERY_KEY.lps, cursor ?? null, limit ?? null, search, order],
    queryFn: () =>
      getLpList({
        cursor,
        search,
        order,
        limit,
      }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    

    select: (data: ResponseLpListDto) => data.data.data, 
  });
}

export default useGetLplist;