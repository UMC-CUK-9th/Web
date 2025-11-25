import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../apis/auth";
import { useAuth } from "../../hooks/useAuth";


export const useDeleteAccountMutation = () => {
  const { clearAuthData } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteAccount,

    onSuccess: () => {
      alert("회원 탈퇴가 완료되었습니다.");
      clearAuthData();
      navigate("/login"); 
    },

    onError: (error) => {
      console.error("회원 탈퇴 API 오류:", error);
      alert("회원 탈퇴 중 오류가 발생했습니다.");
      clearAuthData();
      navigate("/login");
    },
  });
};