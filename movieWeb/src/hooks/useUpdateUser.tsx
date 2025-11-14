import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

interface UpdateUserDto {
  name?: string;
  bio?: string;
  avatar?: string;
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateUserDto) => {
      const res = await axiosInstance.patch("/users", data);
      return res.data;
    },
    onSuccess: () => {
      // me 정보 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
