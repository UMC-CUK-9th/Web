import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const RedirectPage = () => {
  const { setItem: setAccessToken } = useLocalStorage("accessToken");
  const { setItem: setRefreshToken } = useLocalStorage("refreshToken");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");

    if (accessToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      window.location.href = "/my";
    }
  }, [setAccessToken, setRefreshToken]);
  return <div>구글 로그인 리다이렉 화면</div>;
};

export default RedirectPage;
