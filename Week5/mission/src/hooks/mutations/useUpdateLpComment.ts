
import { useMutation } from "@tanstack/react-query";
import { patchLpComment } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";


function useUpdateLpComment(lpId: number) {
  return useMutation({
    mutationFn: ({ commentId, content }: { commentId: number, content: string }) =>
      patchLpComment({ lpId, commentId, content }),
    
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpComments, lpId],
      });
    },
    onError: (error) => {
      console.error("댓글 수정 오류:", error);
      alert("댓글 수정에 실패했습니다.");
    },
  });
}

export default useUpdateLpComment;