import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";


export const useDeleteLp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteLp,

    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
      alert("LP가 삭제되었습니다.");
      navigate("/"); 
    },

    onError: (error) => {
      console.error("LP 삭제 API 오류:", error);
      alert("LP 삭제 중 오류가 발생했습니다.");
    },
  });
};