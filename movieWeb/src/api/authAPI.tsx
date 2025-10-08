import axiosInstance from "./axiosInstance";

interface SignInResponse {
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


export const signIn = async (email: string, password: string): Promise<SignInResponse> => {
  const { data } = await axiosInstance.post<SignInResponse>("/auth/signin", {
    email,
    password,
  });
  return data;
};