

import { useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.ts';
import { LOCAL_STORAGE_KEY } from '../constants/key.ts'; 

const GoogleLoginRedirectPage = () => {
  const { setItem: setAccessToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken,
  );
  const { setItem: setRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken,
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
    const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);

    if (accessToken && refreshToken) {

      setAccessToken(accessToken); 
      setRefreshToken(refreshToken); 
      const redirectPath = sessionStorage.getItem("loginRedirectPath") || "/my";
      sessionStorage.removeItem("loginRedirectPath");


      window.location.href = redirectPath;
    }
  }, [setAccessToken, setRefreshToken]); 
  
  return <div> 리다이렉</div>; 
};

export default GoogleLoginRedirectPage;