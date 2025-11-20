
import { useMutation } from "@tanstack/react-query";
import { deleteLpComment } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";


function useDeleteLpComment(lpId: number) {
  return useMutation({
    mutationFn: ({ commentId }: { commentId: number }) =>
      deleteLpComment({ lpId, commentId }),
    
    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpComments, lpId],
      });
    },
    onError: (error) => {
      console.error("댓글 삭제 오류:", error);
      alert("댓글 삭제에 실패했습니다.");
    },
  });
}

export default useDeleteLpComment;