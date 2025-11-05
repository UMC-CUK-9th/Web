import { useEffect, type ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/loadingSpinner";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  const { getItem } = useLocalStorage("accessToken");
  const accessToken = getItem();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [accessToken, navigate]);

  return (
    <>
      {!accessToken && <LoadingSpinner />}
      {accessToken && <div>{children}</div>}
    </>
  );
};

export default ProtectedLayout;
