

import { useState, type PropsWithChildren, useCallback, useMemo } from "react";

import { AuthContext } from "./AuthContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY, QUERY_KEY } from "../constants/key";

import { queryClient } from "../App";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage()
  );

  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage()
  );





  const { data: myInfoResponse } = useGetMyInfo(accessToken);
  const user = myInfoResponse?.data ?? null;



const clearAuthData = useCallback(() => {
    removeAccessTokenFromStorage();
    removeRefreshTokenFromStorage();

    setAccessToken(null);
    setRefreshToken(null);
    queryClient.removeQueries({ queryKey: [QUERY_KEY.myInfo] });
  }, [
    removeAccessTokenFromStorage,
    removeRefreshTokenFromStorage,
  ]);


const setAuthData = useCallback(
    async (newAccessToken: string, newRefreshToken: string) => {
      try {
        setAccessTokenStorage(newAccessToken);
        setRefreshTokenStorage(newRefreshToken);

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);

        await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });

        alert("로그인 성공");
      } catch (error) {
        console.error("인증 상태 설정 오류", error);
        alert("로그인 처리에 실패했습니다.");
      }
    },
    [setAccessTokenStorage, setRefreshTokenStorage]
  );

const value = useMemo(
    () => ({
      accessToken,
      refreshToken,
      user,
      setAuthData, 
      clearAuthData,
    }),
    [accessToken, refreshToken, user, setAuthData, clearAuthData]
  );


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};