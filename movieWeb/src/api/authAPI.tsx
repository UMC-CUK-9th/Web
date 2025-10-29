import axiosInstance from "./axiosInstance";

// ✅ 회원가입 요청 타입
export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: string;
}

// ✅ 회원가입 응답 타입
export interface SignupResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    bio?: string;
    avatar?: string;
    createdAt?: string;
  };
}

// ✅ 로그인 요청/응답 타입 (optional)
export interface SigninRequest {
  email: string;
  password: string;
}

export interface SigninResponse {
  status: boolean;
  message: string;
  statusCode: number;
  data: {
    id: number;
    name: string;
    accessToken: string;
    refreshToken: string;
  };
}

// ✅ 회원가입 API
export const signup = async (body: SignupRequest): Promise<SignupResponse> => {
  const { data } = await axiosInstance.post<SignupResponse>("/auth/signup", body);
  return data;
};

// ✅ 로그인 API (추후 재사용 가능)
export const signin = async (body: SigninRequest): Promise<SigninResponse> => {
  const { data } = await axiosInstance.post<SigninResponse>("/auth/signin", body);
  return data;
};
