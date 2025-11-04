import { useEffect, type ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  const { getItem } = useLocalStorage("accessToken");
  const accessToken = getItem();
  const navigate = useNavigate();

  console.log(accessToken);
  useEffect(() => {
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [accessToken, navigate]);

  return (
    <>
      {!accessToken && <div>로딩중...</div>}
      {accessToken && <div>{children}</div>}
    </>
  );
};

export default ProtectedLayout;
