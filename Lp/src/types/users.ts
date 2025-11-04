import type { CommonResponse } from "./common";

export type Profile = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createAt: Date;
  updateAt: Date;
};
export type ResponseMeDto = CommonResponse<Profile>;
