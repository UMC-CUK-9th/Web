import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { patchUsers } from "../../apis/users";

function usePatchUsers() {
  return useMutation({
    mutationFn: patchUsers,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["user", data.data.id],
      });
    },
  });
}

export default usePatchUsers;
