import type { RequestSignupDto, ResponseSignupDto, RequestSigninDto, ResponseSigninDto, ResponseMyInfoDto } from "../types/auth";
import { axiosInstance } from "./axios";

export const postSignup = async (body: RequestSignupDto): Promise<ResponseSignupDto> => {
    const { data } = await axiosInstance.post("/v1/auth/signup", body);
    return data;
};

export const postSignin = async (body: RequestSigninDto): Promise<ResponseSigninDto> => {
    const { data } = await axiosInstance.post("/v1/auth/signin", body);
    return data;
};

// 수정된 getMyInfo 함수
export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
    // Interceptor가 토큰을 자동으로 처리하므로 헤더를 직접 설정할 필요가 없습니다.
    const { data } = await axiosInstance.get("/v1/users/me");
    return data;
};

export const postLogout = async () => {
    const {data} = await axiosInstance.post("/v1/auth/signout");
    return data;
}