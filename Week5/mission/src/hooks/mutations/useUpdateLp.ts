import { useMutation } from "@tanstack/react-query";
import { patchLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import type { RequestCreateLpDto, ResponseLpDto } from "../../types/lp";

interface UseUpdateLpParams {
  lpId: number;
}

export const useUpdateLp = ({ lpId }: UseUpdateLpParams) => {
  return useMutation<
    ResponseLpDto, 
    Error,
    RequestCreateLpDto
  >({
    mutationFn: (body) => patchLp({ lpId, body }),

    onSuccess: (updatedLp) => {
     
      queryClient.setQueryData([QUERY_KEY.lps, lpId], updatedLp.data);


      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });

      alert("LP가 성공적으로 수정되었습니다.");
    },
    onError: (error) => {
      console.error("LP 수정 오류:", error);
      alert("LP 수정에 실패했습니다.");
    },
  });
};