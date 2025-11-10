import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LoadingSpinner } from "../components/LoadingSpinner";

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
  }, []);
  return <LoadingSpinner />;
};

export default RedirectPage;
