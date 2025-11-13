import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { patchComment } from "../../apis/comments";

function usePatchComment() {
  return useMutation({
    mutationFn: patchComment,
    onSuccess: (data) => {
      console.log("usePatchComment 실행됨");
      queryClient.invalidateQueries({
        queryKey: ["comment", data.data.id],
        exact: true,
      });
      window.location.reload();
    },
  });
}

export default usePatchComment;
