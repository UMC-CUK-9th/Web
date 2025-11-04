import type React from "react";
import type { RequestSigninDto } from "../types/auth";
import { createContext, useContext, type PropsWithChildren } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useState } from "react";
import { postSignin } from "../apis/auth";
import { postLogout } from "../apis/auth";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    login: (signinData: RequestSigninDto) => Promise<void>;
    logout: () => Promise<void>;
}
export const AuthContext :React.Context<AuthContextType> = createContext<AuthContextType>({
accessToken: null,
refreshToken: null,
login: async () => {},
logout: async () => {},
});

export const AuthProvider = ({children}:PropsWithChildren) => {
    const{getItem:getAcessTokenFromStorage,setItem:setAccessTokenStorage,removeItem:removeAccessTokenStorage}=useLocalStorage
    (LOCAL_STORAGE_KEY.accessToken);
    const {getItem:getRefreshTokenFromStorage,setItem:setRefreshTokenlnStorage,removeItem:removeRefreshTokenStorage}=useLocalStorage
    (LOCAL_STORAGE_KEY.refreshToken);

const [accessToken,setAccessToken]= useState<string | null>(getAcessTokenFromStorage(),);
const[refreshToken,setRefreshToken]=useState<string | null>(getRefreshTokenFromStorage(),);
const login = async (signinData: RequestSigninDto) => {
    try {
        const { data } = await postSignin(signinData);

        if (data) {
            const newAccessToken = data.accessToken;
            const newRefreshToken = data.refreshToken;

            setAccessToken(newAccessToken);
            setRefreshToken(newRefreshToken);

            // persist tokens to local storage
            setAccessTokenStorage(newAccessToken);
            setRefreshTokenlnStorage(newRefreshToken);

            alert("로그인에 성공했습니다.");
            window.location.href = "/my"; 
        }
    } catch (error) {
        console.log("로그인 오류", error);
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
};

const logout = async() => {
    try{
        await postLogout();
        removeAccessTokenStorage();
        removeRefreshTokenStorage();
        
        setAccessToken(null);
        setRefreshToken(null);
        alert("로그아웃 되었습니다.");
    }catch(error){
        console.log("로그아웃 오류",error);
        alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
 }
 return(
    <AuthContext.Provider value={{accessToken,refreshToken,login,logout}}>
        {children}
    </AuthContext.Provider>
 )
}

export const useAuth = () =>{
    const context : AuthContextType = useContext(AuthContext);
    if(!context){
        throw new Error("AuthContext를 찾을 수 없어요!!!!!!!!!");
    }
    return context;
}


