import type { CommonResponse } from "./common";
import type { author } from "./lps";

export type Comment = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: author;
};

export type RequestCommentsDto = {
  lpId: number;
  cursor?: number;
  limit?: number;
  order: "asc" | "desc";
};

export type ResponseCommentDto = CommonResponse<cursor>;

export type cursor = {
  data: Comment[];
  nextCursor: number;
  hasNext: boolean;
};
