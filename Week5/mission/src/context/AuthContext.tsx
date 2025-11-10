import { createContext } from "react";
import type { RequestSigninDto } from "../types/auth";
import type { User } from "../types/auth";

export interface AuthContextType {
 accessToken: string | null;
 refreshToken: string | null;
 user: User | null;
 login: (signinData: RequestSigninDto) => Promise<void>;
 logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
accessToken: null,
 refreshToken: null,
 user: null,
 login: async () => {},
 logout: async () => {},
});

