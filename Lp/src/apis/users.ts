import type { RequestPatchUsersDto, ResponseMeDto } from "../types/users";
import { axiosInstance } from "./axios";

export const getMe = async (): Promise<ResponseMeDto> => {
  const { data } = await axiosInstance.get("/v1/users/me");
  return data;
};

export const patchUsers = async (
  RequestPatchUsersDto: RequestPatchUsersDto
): Promise<ResponseMeDto> => {
  const { data } = await axiosInstance.patch("/v1/users", RequestPatchUsersDto);
  return data;
};

export const deleteUsers = async () => {
  const { data } = await axiosInstance.delete("/v1/users");
  return data;
};
