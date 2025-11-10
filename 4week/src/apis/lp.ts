import { de } from "zod/v4/locales";
import type { PaginationDto } from "../types/common";
import type { ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (
  PaginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: PaginationDto,
  });
  return data;
};
export const getLpDetail = async (lpId: number) => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data;
};

// 댓글 목록 불러오기
export const getLpComments = async (lpId: number) => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`);
  return data;
};

// 댓글 작성하기
export const postLpComment = async (lpId: number, content: string) => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, { content });
  return data;
};

export const toggleLikeLp = async (lpId: number | string): Promise<void> => {
  await axiosInstance.post(`/v1/lps/${lpId}/like`);
};
