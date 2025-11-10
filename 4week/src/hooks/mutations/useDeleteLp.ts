// src/hooks/mutations/useDeleteLp.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios";
import { QUERY_KEY } from "../../constants/key";

const deleteLp = async (lpid: string) => {
  const response = await axiosInstance.delete(`/lp/${lpid}`);
  return response.data;
};

const useDeleteLp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLp,
    onSuccess: () => {
      // LP 삭제 후 목록 페이지 새로고침을 위해 캐시 무효화
      queryClient.invalidateQueries([QUERY_KEY.lps]);
    },
    onError: (error) => {
      console.error("❌ LP 삭제 중 오류 발생:", error);
      alert("LP를 삭제하는 중 문제가 발생했습니다.");
    },
  });
};

export default useDeleteLp;
