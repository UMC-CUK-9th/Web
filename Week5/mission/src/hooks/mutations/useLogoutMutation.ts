import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { postLogout } from "../../apis/auth";
import { useAuth } from "../../hooks/useAuth";

export const useLogoutMutation = () => {
  const { clearAuthData } = useAuth(); 
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postLogout, 

    onSuccess: () => {
      clearAuthData(); 
      alert("로그아웃 되었습니다.");
      navigate("/"); 
    },

    onError: (error) => {
      console.error("로그아웃 API 오류:", error);
      alert("로그아웃 중 오류가 발생했습니다. 강제로 로그아웃합니다.");

      clearAuthData();
      navigate("/");
    },
  });
};