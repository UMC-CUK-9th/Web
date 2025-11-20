import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { type Likes, type ResponseLpDto } from "../../types/lp";
import { type ResponseMyInfoDto } from "../../types/auth";

function usePostLike() {
    return useMutation({
        mutationFn: postLike,

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
                    throw new Error('사용자 정보를 찾을 수 없습니다');
                    }

        
                    const userId = Number(me?.data.id);
        
                    const likedIndex = 
                    newLpPost?.data.likes.findIndex(
                        (like) => like.userId === userId,
                    );
        
                    if(likedIndex === -1){
                        const newLike = {userId, lpId: lp.lpId};
                        newLpPost?.data.likes.push(newLike as Likes);
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

export default usePostLike;