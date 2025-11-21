import { useMutation } from "@tanstack/react-query";
import {  updateLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useUpdateLp(){
    return useMutation({
        mutationFn: updateLp,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lps, variables.lpid]
            })
        }
    })
}

export default useUpdateLp;