import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLikeLp } from "../../apis/lp"; // 좋아요 API 함수
import { QUERY_KEY } from "../../constants/key";

/**
 * LP 좋아요/좋아요 취소를 토글하는 훅
 * @returns mutate 함수와 로딩/에러 상태를 반환
 */
function useToggleLikeLp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lpId: number) => toggleLikeLp(lpId), // API 호출

    // ✅ 성공 시 LP 상세 및 목록 캐시 갱신
    onSuccess: (_, lpId) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lpDetail, lpId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
    },

    // (선택) 에러 핸들링
    onError: (error) => {
      console.error("좋아요 토글 실패:", error);
      alert("좋아요 처리 중 오류가 발생했습니다.");
    },
  });
}

export default useToggleLikeLp;
