import { useMutation } from "@tanstack/react-query";
import { postLps } from "../../apis/lps";
import { queryClient } from "../../App";

function usePostLp() {
  return useMutation({
    mutationFn: postLps,
    onSuccess: (data) => {
      console.log("usePostLp 실행됨");
      queryClient.invalidateQueries({
        queryKey: ["lps", data.data.id],
        exact: true,
      });
      window.location.reload();
    },
  });
}

export default usePostLp;
