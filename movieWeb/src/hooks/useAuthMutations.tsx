// src/hooks/useAuthMutations.ts
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { signin } from "../api/authAPI";
import { LOCAL_STORAGE_KEY } from "../constants/key";

interface SigninForm {
  email: string;
  password: string;
}

export const useAuthMutations = () => {
  // 로그인
  const signinMutation = useMutation({
    mutationFn: async (form: SigninForm) => {
      return await signin(form);
    },
  });

  // 로그아웃
  const logoutMutation = useMutation({
    mutationFn: async () => {
      try {
        await axiosInstance.post("/auth/logout");
      } finally {
        localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
        localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
        localStorage.removeItem("userName");

        // Navbar / Sidebar 등이 듣고 있는 이벤트
        window.dispatchEvent(new Event("authChange"));
        window.location.href = "/";
      }
      return true;
    },
  });

  // 회원탈퇴
  const deleteAccountMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.delete("/users");
      return res.data;
    },
  });

  return {
    signinMutation,
    logoutMutation,
    deleteAccountMutation,
  };
};
