import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useDeleteLike(){
    return useMutation({
        mutationFn: deleteLike,
        onSuccess: (_, variables) =>{
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lps, variables],
                exact: true,
            });
        },
    });
}

export default useDeleteLike;