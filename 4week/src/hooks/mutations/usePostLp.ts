// src/hooks/mutations/usePostLp.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLp } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key"; // QUERY_KEY.LP_LIST 등이 있다고 가정

export const usePostLp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => postLp(formData),
    onSuccess: () => {
      // LP 목록 갱신
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.LP_LIST] });
    },
    onError: (error) => {
      console.error("LP 생성 실패:", error);
      // 에러 처리 로직 (예: 토스트 메시지)
    },
  });
};