import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";


export function useLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [authError, setAuthError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (success) => {
      if (success) {
        setAuthError(null);
        navigate("/", { replace: true });
      } else {
        setAuthError("이메일 또는 비밀번호가 올바르지 않습니다.");
      }
    },
    onError: () => {
      setAuthError("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });
  return { ...mutation, authError };
}