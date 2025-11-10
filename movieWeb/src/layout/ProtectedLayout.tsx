import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const ProtectedLayout = () => {
  const { storedValue: accessToken } = useLocalStorage<string | null>(
    LOCAL_STORAGE_KEY.accessToken,
    null
  );
  const location = useLocation();
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  const alertedRef = useRef(false); //alert 중복방지

  useEffect(() => {
    if (!accessToken && !alertedRef.current) {
      alertedRef.current = true; // alert 중복방지
      alert("로그인이 필요한 서비스입니다.");
      setRedirectPath(`/login?redirect=${encodeURIComponent(location.pathname)}`);
    }
  }, [accessToken, location.pathname]);

  if (!accessToken && redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
