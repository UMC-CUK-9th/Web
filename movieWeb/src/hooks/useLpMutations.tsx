import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export const useLpMutations = (lpId: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // LP 수정
  const updateLp = useMutation({
    mutationFn: async (body: {
      title: string;
      content: string;
      thumbnail: string;
      tags: Array<string | { id: number; name: string }>;
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
      navigate("/lplist");
    },
  });

  //좋아요
    const likeLp = useMutation({
    mutationFn: async () => {
      await axiosInstance.post(`/lps/${lpId}/likes`);
    },

    // 낙관적 업데이트
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["lp", lpId] });

      const prevData = queryClient.getQueryData(["lp", lpId]);

      // optimistic 업데이트
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(["lp", lpId], (old: any) => {
        if (!old) return old;

        const likes = old.likes ?? [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const alreadyLiked = likes.some((l: any) => l.userId === old.meId);

        return {
          ...old,
          likes: alreadyLiked
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ? likes.filter((l: any) => l.userId !== old.meId)
            : [...likes, { userId: old.meId }],
        };
      });

      return { prevData };
    },

    // 실패 시 rollback
    onError: (_err, _new, ctx) => {
      if (ctx?.prevData) {
        queryClient.setQueryData(["lp", lpId], ctx.prevData);
      }
    },

    // 성공 시 다시 fetch해서 최신값 유지
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["lp", lpId] });
    },
  });

  return { updateLp, deleteLp, likeLp };
};
