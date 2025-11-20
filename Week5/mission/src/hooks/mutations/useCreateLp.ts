
import { useMutation } from "@tanstack/react-query";
import { postLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import type { RequestCreateLpDto } from "../../types/lp";
import { isAxiosError } from "axios";


function useCreateLp() {
  return useMutation({
    mutationFn: (body: RequestCreateLpDto) => postLp(body),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
      alert("LP가 성공적으로 등록되었습니다.");
    },
    onError: (error: unknown) => {
      console.error("LP 등록 오류:", error);
      
      let message = "LP 등록에 실패했습니다."; 


      if (isAxiosError(error)) {
  




        if (
          error.response && 
          typeof error.response.data === 'object' && 
          error.response.data !== null && 
          'message' in error.response.data
        ) {

          message = String((error.response.data as { message: unknown }).message);
        }
      }
      alert(message);
    },
  });
}

export default useCreateLp;