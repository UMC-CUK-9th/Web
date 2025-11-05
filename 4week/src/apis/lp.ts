// import { de } from "zod/v4/locales"; // (불필요한 import 제거)
import type { PaginationDto } from "../types/common";
import type { ResponseLpListDto, Lp } from "../types/lp"; // Lp 타입을 ResponseLpDto로 가정
import { axiosInstance } from "./axios";

// (기존 코드)
export const getLpList = async (
  paginationDto: PaginationDto,
): Promise<ResponseLpListDto> => {
  const {data} = await axiosInstance.get("/v1/lps",{
    params: paginationDto,
  });
  return data;
};

// [신규 추가] 상세 페이지를 위한 API 함수
// (API 명세에 따라 반환 타입이 ResponseLpDto일 수도, Lp일 수도 있습니다. Lp로 가정합니다.)
export const getLpDetailById = async (lpId: string): Promise<Lp> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data;
};