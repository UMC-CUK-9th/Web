

import { useState, type PropsWithChildren, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import type { RequestSigninDto, User } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogout, postSignin, getMyInfo } from "../apis/auth";

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

  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();


  const logout = useCallback(async () => {
    try {
      await postLogout();
    } catch (error) {
      console.error("에러", error);
    } finally {
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();

      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);

      alert("로그아웃");
      navigate("/");
    }
  }, [
    navigate,
    removeAccessTokenFromStorage,
    removeRefreshTokenFromStorage,
  ]);


  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getMyInfo();
        setUser(response.data);
      } catch (error) {
        console.error("에러", error);
        logout(); 
      }
    };

    if (accessToken) {
      fetchUserInfo();
    } else {
      setUser(null);
    }
  }, [accessToken, logout]); 

  const login = async (signinData: RequestSigninDto) => {
    try {
      const response = await postSignin(signinData);
      const { data: responseData } = response; 

      if (responseData) {
        const newAccessToken = responseData.accessToken;
        const newRefreshToken = responseData.refreshToken;

        setAccessTokenStorage(newAccessToken);
        setRefreshTokenStorage(newRefreshToken);

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);

        alert("로그인 성공");
      } else {
        throw new Error("에러");
      }
    } catch (error) {
      console.error("로그인 오류", error);
      alert("로그인 실패");
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};