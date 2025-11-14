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
      return res.data.data;
    },

    // 낙관적 업데이트 
    onMutate: async (newUser) => {
      await queryClient.cancelQueries({ queryKey: ["me"] });

      const prevUser = queryClient.getQueryData(["me"]);

      // me 캐시 즉시 업데이트
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(["me"], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          ...newUser, // name, bio, avatar 즉시 적용
        };
      });

      // Navbar userName
      if (newUser.name) {
        localStorage.setItem("userName", newUser.name);
        window.dispatchEvent(new Event("authChange"));
      }

      return { prevUser };
    },

    // 실패 시 원래 데이터로 롤백
    onError: (_err, _newUser, ctx) => {
      if (ctx?.prevUser) {
        queryClient.setQueryData(["me"], ctx.prevUser);
      }
    },

    // 성공 여부와 관계 없이 서버 최신 데이터로 맞추기
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
