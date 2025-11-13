import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { postComment } from "../../apis/comments";

function usePostComment() {
  return useMutation({
    mutationFn: postComment,
    onSuccess: (data) => {
      console.log("usePostComment 실행됨");
      queryClient.invalidateQueries({
        queryKey: ["comment", data.data.id],
        exact: true,
      });
      window.location.reload();
    },
  });
}

export default usePostComment;
