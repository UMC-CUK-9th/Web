import type {
  RequestLpListDto,
  ResponseLpDetailDto,
  ResponseLpListDto,
} from "../types/lps";
import { axiosInstance } from "./axios";

export const getLpList = async (
  RequestLpListDto: RequestLpListDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: RequestLpListDto,
  });
  return data;
};

export const getLpDetail = async (
  lpId: number
): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data;
};