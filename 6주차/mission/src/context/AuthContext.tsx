import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { RequestSigninDto, ResponseMyInfoDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { getMyInfo, postLogout, postSignin } from "../apis/auth";

type User = ResponseMyInfoDto["data"];

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  login: (signInData: RequestSigninDto) => Promise<boolean>;
  logout: () => Promise<void>;
  setAuthTokens: (accessToken: string, refreshToken: string | null) => void;
  setUser?: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  user: null,
  login: async () => false,
  logout: async () => {},
  setAuthTokens: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenFromStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenFromStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage()
  );

  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage()
  );

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (accessToken) {
      const UserInfo = async () => {
        try {
          const response = await getMyInfo();
          if (response.data) {
            setUser(response.data);
          }
        } catch (error) {
          alert("사용자를 불러오지 못했습니다.");
        }
      };
      UserInfo();
    } else {
      setUser(null);
    }
  }, [accessToken]);

  const login = async (signInData: RequestSigninDto) => {
    try {
      const { data } = await postSignin(signInData);

      if (data) {
        const newAccessToken = data.accessToken;
        const newrefreshToken = data.refreshToken;

        setAccessTokenFromStorage(newAccessToken);
        setRefreshTokenFromStorage(newrefreshToken);

        setAccessToken(newAccessToken);
        setRefreshToken(newrefreshToken);
        alert("로그인 성공");
        return true;
      }
    } catch (error) {
      console.log(error);
      alert("로그인 실패");
      return false;
    }

    return true;
  };

  const logout = async () => {
    try {
      await postLogout();
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();

      setAccessToken(null);
      setRefreshToken(null);

      alert("로그아웃됨");
    } catch (error) {
      console.log(error);
      alert("로그아웃 실패");
    }
  };

  const setAuthTokens = (
    newAccessToken: string,
    newRefreshToken: string | null
  ) => {
    setAccessTokenFromStorage(newAccessToken);
    setAccessToken(newAccessToken);

    if (newRefreshToken) {
      setRefreshTokenFromStorage(newRefreshToken);
      setRefreshToken(newRefreshToken);
    }
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, login, logout, setAuthTokens, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext를 찾을 수 없습니다.");
  }

  return context;
};