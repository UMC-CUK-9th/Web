import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

export const useLpMutations = (lpId: string) => {
  const queryClient = useQueryClient();

  // LP 수정
  const updateLp = useMutation({
    mutationFn: async (body: {
      title: string;
      content: string;
      thumbnail: string;
      tags: string[];
    }) => {
      const res = await axiosInstance.patch(`/lps/${lpId}`, body);
      return res.data.data;
    },
    onSuccess: () => {
      // LP 상세 새로고침
      queryClient.invalidateQueries({ queryKey: ["lp", lpId] });
      alert("수정이 완료되었습니다!");
    },
  });

  // LP 삭제
  const deleteLp = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.delete(`/lps/${lpId}`);
      return res.data;
    },
    onSuccess: () => {
      alert("삭제가 완료되었습니다.");
      window.location.href = "/lplist"; // 목록으로 이동
    },
  });

  return { updateLp, deleteLp };
};
