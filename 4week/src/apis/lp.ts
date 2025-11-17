// src/apis/lp.ts

import type { PaginationDto } from "../types/common";
import type { ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";

// LP 목록 조회
export const getLpList = async (
  PaginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: PaginationDto,
  });
  return data;
};

// LP 상세 조회
export const getLpDetail = async (lpId: number | string) => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data;
};

// [복구] LP 생성하기 (FormData 사용)
export const postLp = async (formData: FormData) => {
  // axios가 FormData를 감지하면 자동으로 Content-Type을 multipart/form-data로 설정합니다.
  const { data } = await axiosInstance.post("/v1/lps", formData);
  return data;
};

// LP 삭제하기
export const deleteLp = async (lpId: number | string) => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}`);
  return data;
};

// 댓글 목록 불러오기
export const getLpComments = async (lpId: number) => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`);
  return data;
};

// 댓글 작성하기
export const postLpComment = async (lpId: number, content: string) => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, {
    content,
  });
  return data;
};

// [복구] 댓글 수정하기
export const updateLpComment = async (
  lpId: number,
  commentId: number,
  content: string
) => {
  const { data } = await axiosInstance.put(
    `/v1/lps/${lpId}/comments/${commentId}`,
    { content }
  );
  return data;
};

// [복구] 댓글 삭제하기
export const deleteLpComment = async (lpId: number, commentId: number) => {
  const { data } = await axiosInstance.delete(
    `/v1/lps/${lpId}/comments/${commentId}`
  );
  return data;
};

// 좋아요 토글
export const toggleLikeLp = async (lpId: number | string): Promise<void> => {
  await axiosInstance.post(`/v1/lps/${lpId}/like`);
};