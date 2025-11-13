import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import type { Likes, ResponseLpDetailDto } from "../../types/lp";
import type { ResponseMyInfoDto } from "../../types/auth";

function usePostLike() {
    return useMutation({

       
        mutationFn:postLike,

        
        onMutate: async(lp) => {
            
            await queryClient.cancelQueries({queryKey:[QUERY_KEY.lps, lp.lpid]});
        
          
            const previousLpPost = queryClient.getQueryData<ResponseLpDetailDto>([QUERY_KEY.lps,lp.lpid]);
                    
         
            const newLpPost = {...previousLpPost};
        
            
            //const me = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);
            const userId = Number(me?.data.id);
        
            // userId 기준으로 좋아요 위치 찾기
            const likedIndex = previousLpPost?.data.likes.findIndex((like) => like.userId === userId) ?? -1;
        
            if(likedIndex >= 0) { // 좋아요 있음 => 좋아요 삭제
                previousLpPost?.data.likes.splice(likedIndex, 1);
            } else {
                const newLike = {userId,lpId:lp.lpid} as Likes;
                previousLpPost?.data.likes.push(newLike);
            }
        
            // 업데이트된 게시글 데이터를 캐시에 저장
            // UI 바로 업데이트
            queryClient.setQueryData([QUERY_KEY.lps,lp.lpid],newLpPost);
        
            return {previousLpPost, newLpPost}
        },
        
        onError: (err,newLp,context) => {
            console.log(err,newLp);
            queryClient.setQueryData([QUERY_KEY.lps,newLp.lpid], context?.previousLpPost?.data.id)
        },
        
        // 서버 상태 동기화
        // onSetteled는 API 요청이 끝난 후 성공하든 실패하든 실행
        onSettled : async(data, error, variables, context) => {
            await queryClient.invalidateQueries({
            queryKey:[QUERY_KEY.lps,variables.lpid],
            })
        },
    })
}

export default usePostLike;