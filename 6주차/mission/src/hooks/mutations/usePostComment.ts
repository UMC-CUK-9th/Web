import { useMutation } from "@tanstack/react-query";
import { postComment } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePostComment(){
    return useMutation({
        mutationFn: postComment,
        onSuccess: (_, variables) =>{
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.comments, variables.lpid],
            });
        }
    });
}

export default usePostComment;