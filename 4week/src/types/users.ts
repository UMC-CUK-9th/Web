import type { CommonResponse } from "./common";
export type Profile = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
};
export type ResponseMeDto = CommonResponse<Profile>;