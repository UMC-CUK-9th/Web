import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { deleteComment } from "../../apis/comments";

function useDeleteComment() {
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      console.log("useDeleteComment 실행됨");
      queryClient.invalidateQueries({
        queryKey: ["comment"],
        exact: true,
      });
      window.location.reload();
    },
  });
}

export default useDeleteComment;
