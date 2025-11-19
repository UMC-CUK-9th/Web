// src/api/lpApi.ts

import type { PaginationDto } from "../types/common";
import type {
  CreateLpsDto,
  RequestLpDto,
  ResponseLikeLpDto,
  ResponseLpCreateDto,
  ResponseLpDetailDto,
  ResponseLpListDto,
  UploadResponse,
} from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (paginationDto: PaginationDto): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });

  return data;
};

export const getLpDetail = async ({ lpid }: RequestLpDto): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpid}`);
  return data;
};

export const postLike = async ({ lpid }: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpid}/likes`);
  return data;
};

export const deleteLike = async ({ lpid }: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpid}/likes`);
  return data;
};

export const postLp = async (payload: CreateLpsDto): Promise<ResponseLpCreateDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/`, payload);
  return data;
};

export const patchLp = async (payload: CreateLpsDto, { lpid }: RequestLpDto) => {
  const { data } = await axiosInstance.patch(`/v1/lps/${lpid}`, payload);
  return data;
};

export const deleteLp = async ({ lpid }: RequestLpDto) => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpid}`);
  return data;
};

export const uploadImage = async (formData: FormData): Promise<UploadResponse> => {
  try {
    const { data } = await axiosInstance.post(`/v1/uploads`, formData);
    return data;
  } catch (error) {
    console.error("이미지 업로드 API 실패:", error);
    throw new Error("이미지 업로드에 실패했습니다.");
  }
};

// 🔥🔥🔥 LP 검색 API 추가
export const searchLps = async ({
  query,
  cursor,
  size = 12,
}: {
  query: string;
  cursor?: number | null;
  size?: number;
}) => {
  const { data } = await axiosInstance.get("/v1/lps/search", {
    params: {
      query,
      cursor,
      size,
    },
  });
  return data; // { items: [...], nextCursor: number | null }
};
// 검색 API 추가
export const searchLp = async (query: string) => {
  const { data } = await axiosInstance.get("/v1/lps/search", {
    params: { keyword: query },
  });

  return data;
};

