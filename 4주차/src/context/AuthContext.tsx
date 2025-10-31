import React, { createContext, useState } from "react";
import type { PropsWithChildren } from "react";
import type { RequestSigninDto } from "../types/auth";
import { postSignin, postLogout } from "../types/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    login: (signinData: RequestSigninDto) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext: React.Context<AuthContextType> = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async () => {},
    logout: async () => {},
});

export const AuthProvider = ({children}: PropsWithChildren) => {
    const {
        getItem: getAccessTokenFromStorage,
        setItem: setAccessTokenInStorage,
        removeItem: removeAccessTokenFromStorage,
    } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

    const {
        getItem: getRefreshTokenFromStorage,
        setItem: setRefreshTokenInStorage,
        removeItem: removeRefreshTokenFromStorage,
    } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

    const [accessToken, setAccessToken] = useState<string | null>(
        getAccessTokenFromStorage()
    );

    const [refreshToken, setRefreshToken] = useState<string | null>(
        getRefreshTokenFromStorage()
    );

    const login = async (signinData: RequestSigninDto) => {
        try {
            const response = await postSignin(signinData);
            const data = response.data;

            if (data) {
                const newAccessToken = data.accessToken;
                const newRefreshToken = data.refreshToken;

                setAccessToken(newAccessToken);
                setRefreshToken(newRefreshToken);
                setAccessTokenInStorage(newAccessToken);
                setRefreshTokenInStorage(newRefreshToken);
                alert("Logged in successfully.");
                window.location.href = "/my";
            }
        } catch (error) {
            console.error("Login failed", error);
            alert("Login failed. Please try again.");
        }
    };

    const logout = async () => {
        try {
            await postLogout();
            removeAccessTokenFromStorage();
            removeRefreshTokenFromStorage();
            setAccessToken(null);
            setRefreshToken(null);

            alert("Logged out successfully.");
        } catch (error) {
            console.error("Logout failed", error);
            alert("Logout failed. Please try again.");
        }
    };

    return (
        <AuthContext.Provider value={{accessToken, refreshToken, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context: AuthContextType = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
