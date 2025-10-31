import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userName");
    window.dispatchEvent(new Event("authChange"));

    navigate("/", { replace: true });
  }, [navigate]);

  return null; // UI 없음 (자동 로그아웃)
};

export default Logout;
