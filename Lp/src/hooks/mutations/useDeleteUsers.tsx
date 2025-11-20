import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { deleteUsers } from "../../apis/users";

function useDeleteUsers() {
  return useMutation({
    mutationFn: deleteUsers,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["user", data.data.id],
      });
    },
  });
}

export default useDeleteUsers;
