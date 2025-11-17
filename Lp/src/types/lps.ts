import type { CommonResponse } from "./common";

export type RequestLpListDto = {
  cursor?: number;
  limit?: number;
  search?: string;
  order: "asc" | "desc";
};

export type Lp = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: tag[];
  likes: like[];
};

export type tag = {
  id: number;
  name: string;
};
export type like = {
  id: number;
  userId: number;
  lpId: number;
};

export type cursor = {
  data: Lp[];
  nextCursor: number;
  hasNext: boolean;
};
export type ResponseLpListDto = CommonResponse<cursor>;

export type author = {
  id: number;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
};
export type lpDetail = Lp & { author: author };

export type ResponseLpDetailDto = CommonResponse<lpDetail>;

export type RequestAddLpDto = {
  title: string;
  content: string;
  thumbnail?: string;
  tags: string[];
  published: boolean;
};

export type ResponseAddLpDto = CommonResponse<{
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}>;

export type ResponsePostImageDto = CommonResponse<{ imageUrl: string }>;
