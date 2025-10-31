import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const GoogleLoginRedirectPage = () => {
  const { setValue: setAccessToken } = useLocalStorage<string | null>(
    LOCAL_STORAGE_KEY.accessToken,
    null
  );
  const { setValue: setRefreshToken } = useLocalStorage<string | null>(
    LOCAL_STORAGE_KEY.refreshToken,
    null
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
    const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);
    const userName = urlParams.get("name");
    // console.log(accessToken);
    // console.log(refreshToken);
    // console.log(userName);

    if (accessToken) {
      setAccessToken(accessToken);
      if (refreshToken) setRefreshToken(refreshToken);
      if (userName) localStorage.setItem("userName", userName);
      window.location.href = "/";
    }
  }, [setAccessToken, setRefreshToken]);

  return <div>구글 로그인 리다이렉트 중...</div>;
};

export default GoogleLoginRedirectPage;
