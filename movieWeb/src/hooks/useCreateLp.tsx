// src/hooks/useCreateLp.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

export const useCreateLp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: unknown) => {
      const res = await axiosInstance.post("/lps", data, {
        headers: { "Content-Type": "application/json" }
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lps"] }); // LP 목록 새로고침
    },
  });
};
