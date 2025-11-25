
import { useMutation } from "@tanstack/react-query";
import { postLpComment } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import type { RequestCreateCommentDto } from "../../types/comment";


function useCreateLpComment(lpId: number) {
  return useMutation({
    mutationFn: (body: Omit<RequestCreateCommentDto, 'lpId'>) => 
      postLpComment({ lpId, ...body }),
    
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpComments, lpId],
      });
    },
    onError: (error) => {
      console.error("댓글 생성 오류", error);
      alert("댓글 작성 오류");
    },
  });
}

export default useCreateLpComment;