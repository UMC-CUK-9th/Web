import type {
  RequestSigninDto,
  RequestSignupDto,
  ResponseSigninDto,
  ResponseSignupDto,
} from "../types/auth";
import type { ResponseMeDto } from "../types/users";
import { axiosInstance } from "./axios";

export const postSignup = async (
  body: RequestSignupDto
): Promise<ResponseSignupDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signup", body);
  return data;
};

export const postSignin = async (
  body: RequestSigninDto
): Promise<ResponseSigninDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signin", body);
  return data;
};

export const getMe = async (): Promise<ResponseMeDto> => {
  const { data } = await axiosInstance.get("/v1/users/me");
  return data;
};

export const postLogout = async () => {
  const { data } = await axiosInstance.post("/v1/auth/signout");
  return data;
};
