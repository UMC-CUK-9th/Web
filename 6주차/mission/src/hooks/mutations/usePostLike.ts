import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";


import { useAuth } from "../../context/AuthContext";
import type { Likes, Lp } from "../../types/lp";

function usePostLike() {
  const { user } = useAuth();
  return useMutation({
    mutationFn: postLike,
    onMutate: async (lpid) => {
      // 상세조회 쿼리 캐시 낙관적 업데이트
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.lps, lpid] });
      const prev = queryClient.getQueryData<{ data: Lp }>([QUERY_KEY.lps, lpid]);
      if (prev && user) {
        const alreadyLiked = prev.data.likes.some(like => like.userId === user.id);
        if (!alreadyLiked) {
          const fakeLike: Likes = {
            id: Date.now(),
            userId: user.id,
            lpId: prev.data.id,
          };
          queryClient.setQueryData([QUERY_KEY.lps, lpid], {
            ...prev,
            data: {
              ...prev.data,
              likes: [...prev.data.likes, fakeLike],
            },
          });
        }
      }
      return { prev };
    },
    onError: (_err, lpid, context) => {
      // 실패 시 롤백
      if (context?.prev) {
        queryClient.setQueryData([QUERY_KEY.lps, lpid], context.prev);
      }
    },
    onSettled: (_data, _err, lpid) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps, lpid] });
    },
  });
}

export default usePostLike;