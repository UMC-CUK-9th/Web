
import { useMutation } from "@tanstack/react-query";
import { patchMyInfo } from "../../apis/auth";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import type { RequestUpdateMyInfoDto, ResponseMyInfoDto } from "../../types/auth";


function useUpdateMyInfo() {
  return useMutation({
    mutationFn: (body: RequestUpdateMyInfoDto) => patchMyInfo(body),
    

    onMutate: async (newProfileData) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.myInfo] });


      const previousMyInfo = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myInfo,
      ]);


      if (!previousMyInfo) {
        return;
      }

      const newCacheData = {
        ...previousMyInfo,
        data: {
          ...previousMyInfo.data,
          ...newProfileData,
        },
      };

      queryClient.setQueryData([QUERY_KEY.myInfo], newCacheData);

      return { previousMyInfo };
    },

    onError: (error, _variables, context) => {
      console.error("프로필 수정 오류:", error);
      alert("프로필 수정에 실패했습니다. 다시 시도해주세요.");
      
      if (context?.previousMyInfo) {
        queryClient.setQueryData([QUERY_KEY.myInfo], context.previousMyInfo);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
    },
    
  
  });
}

export default useUpdateMyInfo;