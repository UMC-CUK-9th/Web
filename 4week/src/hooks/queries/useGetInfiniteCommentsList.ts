import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../../apis/comments";

function useGetInfiniteCommentsList(
  lpId: number,
  limit: number,
  order: "asc" | "desc"
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      getComments({ cursor: pageParam, lpId, limit, order }),
    queryKey: ["lpComments", lpId, order],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}

export default useGetInfiniteCommentsList;