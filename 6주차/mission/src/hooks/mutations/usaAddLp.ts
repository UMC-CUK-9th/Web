import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { addLp } from "../../apis/lp";

function useAddLp(onClose: () =>void){
    return useMutation({
        mutationFn: addLp,
        onSuccess: () =>{
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lps],
            });
            onClose();
        },
    });
}

export default useAddLp;