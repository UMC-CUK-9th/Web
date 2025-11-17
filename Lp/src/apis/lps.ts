import type {
  RequestAddLpDto,
  RequestLpListDto,
  ResponseAddLpDto,
  ResponseLpDetailDto,
  ResponseLpListDto,
  ResponsePostImageDto,
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

export const postLps = async (
  RequestAddLpDto: RequestAddLpDto
): Promise<ResponseAddLpDto> => {
  const { data } = await axiosInstance.post("/v1/lps", RequestAddLpDto);
  return data;
};

export const postImage = async (file: File): Promise<ResponsePostImageDto> => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axiosInstance.post(`/v1/uploads`, formData);
  return data;
};
