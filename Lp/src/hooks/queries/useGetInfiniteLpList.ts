import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lps";

function useGetInfiniteLpList(
  limit: number,
  search: string,
  order: "asc" | "desc"
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      getLpList({ cursor: pageParam, limit, search, order }),
    queryKey: ["lps", order],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}

export default useGetInfiniteLpList;
