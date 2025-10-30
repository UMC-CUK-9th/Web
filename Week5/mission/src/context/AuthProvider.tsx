import { useState, type PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import type { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogout, postSignin } from "../apis/auth";

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

 const navigate = useNavigate();

 const login = async (signinData: RequestSigninDto) => {
 try {
const { data } = await postSignin(signinData);

 if (data) {
 const newAccessToken = data.accessToken;
const newRefreshToken = data.refreshToken;

setAccessTokenStorage(newAccessToken);
 setRefreshTokenStorage(newRefreshToken);

 setAccessToken(newAccessToken);
 setRefreshToken(newRefreshToken);
 alert("로그인 성공");

navigate("/my");
 }
 } catch (error) {
 console.error("로그인 오류", error);
 alert("로그인 실패");
 }
 };

 const logout = async () => {
 try {
 await postLogout();
 } catch (error) {
console.error("Error", error);
} finally {
 removeAccessTokenFromStorage();
 removeRefreshTokenFromStorage();

setAccessToken(null);
setRefreshToken(null);

 alert("로그아웃 되었습니다.");
navigate("/");
 }
};

 return (
 <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
 {children}
 </AuthContext.Provider>
 );
};

