import { createContext } from "react";
import type { User } from "../types/auth";

export interface AuthContextType {
 accessToken: string | null;
 refreshToken: string | null;
 user: User | null;

setAuthData: (accessToken: string, refreshToken: string) => Promise<void>;
 clearAuthData: () => void;
}

export const AuthContext = createContext<AuthContextType>({
accessToken: null,
 refreshToken: null,
 user: null,

 setAuthData: async () => {},
 clearAuthData: () => {}
});

