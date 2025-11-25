import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { queryClient } from "../../App";
import { postLogout } from "../../apis/auth";

export function useLogout() {
  const { logout} = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postLogout, 

    onSuccess: () => {
      logout();
      queryClient.clear();
      navigate("/login", { replace: true });
    },
  });
}