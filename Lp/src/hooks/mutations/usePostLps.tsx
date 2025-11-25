import { useMutation } from "@tanstack/react-query";
import { postLps } from "../../apis/lps";
import { queryClient } from "../../App";

function usePostLp() {
  return useMutation({
    mutationFn: postLps,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["lps", data.data.id],
      });
    },
  });
}

export default usePostLp;
