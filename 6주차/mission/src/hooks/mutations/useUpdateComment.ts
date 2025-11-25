import { useMutation } from "@tanstack/react-query";
import { updateComment } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useUpdateComment(){
    return useMutation({
        mutationFn: updateComment,
        onSuccess: (_, variables) =>{
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.comments, variables.lpid],
            });
        }
    });
}

export default useUpdateComment;