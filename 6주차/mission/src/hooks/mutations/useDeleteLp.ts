import { useMutation } from "@tanstack/react-query";
import { deleteLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useDeleteLp(){
    return useMutation({
        mutationFn: deleteLp,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lps]
            });
            alert("삭제 되었습니다.");
        }
    })
}

export default useDeleteLp;