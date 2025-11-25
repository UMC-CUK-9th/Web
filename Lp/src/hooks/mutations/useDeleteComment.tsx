import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { deleteComment } from "../../apis/comments";

function useDeleteComment() {
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comment"],
        exact: true,
      });
    },
  });
}

export default useDeleteComment;
