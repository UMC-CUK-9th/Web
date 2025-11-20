import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { type ResponseLpDto } from "../../types/lp";
import { type ResponseMyInfoDto } from "../../types/auth";


function useDeleteLike() {
    return useMutation({
        mutationFn: deleteLike,

        onMutate: async (lp) => {
            await queryClient.cancelQueries({
                queryKey:[QUERY_KEY.lps, lp.lpId],
            });

            const previousLpPost = queryClient.getQueryData<ResponseLpDto>(
                [
                    QUERY_KEY.lps,
                    lp.lpId,
                ]);

            if (!previousLpPost) {
                return;
            }
    

            const newLpPost = structuredClone(previousLpPost);

            const me = queryClient.getQueryData<ResponseMyInfoDto>([
                QUERY_KEY.myInfo,
            ]);

            if (!me?.data?.id) {
                console.error("오류");
                return { previousLpPost };
            }

            const userId = Number(me?.data.id);

            const likedIndex = 
            newLpPost.data.likes.findIndex(
                (like) => like.userId === userId,
            );

            if(likedIndex>=0){
                newLpPost.data.likes.splice(likedIndex, 1);
            }

            queryClient.setQueryData([QUERY_KEY.lps, lp.lpId],newLpPost);


            return { previousLpPost, newLpPost};
            },

            onError:(_err, newLp, context) => {
                queryClient.setQueryData(
                    [QUERY_KEY.lps, newLp.lpId],
                    context?.previousLpPost,
                );
            },

            onSettled: async(_data, _error, variables) => {
                await queryClient.invalidateQueries({
                    queryKey:[QUERY_KEY.lps, variables.lpId],
                });
            },            
});

}

export default useDeleteLike;