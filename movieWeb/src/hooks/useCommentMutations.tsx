// src/hooks/useCommentMutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

export const useCommentMutations = (lpid: string) => {
  const queryClient = useQueryClient();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["lpComments"] });

  const createComment = useMutation({
    mutationFn: async (content: string) => {
      const res = await axiosInstance.post(`/lps/${lpid}/comments`, {
        content,
      });
      return res.data;
    },
    onSuccess: invalidate,
  });

  const updateComment = useMutation({
    mutationFn: async ({
      commentId,
      content,
    }: { commentId: number; content: string }) => {
      const res = await axiosInstance.patch(
        `/lps/${lpid}/comments/${commentId}`,
        { content }
      );
      return res.data;
    },
    onSuccess: invalidate,
  });

  const deleteComment = useMutation({
    mutationFn: async (commentId: number) => {
      const res = await axiosInstance.delete(
        `/lps/${lpid}/comments/${commentId}`
      );
      return res.data;
    },
    onSuccess: invalidate,
  });


  return {
    createComment,
    updateComment,
    deleteComment
  };
};
