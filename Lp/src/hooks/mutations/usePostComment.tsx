import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { postComment } from "../../apis/comments";

function usePostComment() {
  return useMutation({
    mutationFn: postComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["comment", data.data.id],
      });
    },
  });
}

export default usePostComment;
