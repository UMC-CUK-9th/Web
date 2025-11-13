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

export type RequestPostCommentDto = {
  lpId: number;
  content: string;
};
export type ResponsePostCommentDto = CommonResponse<Comment>;

export type RequestPatchCommentDto = {
  lpId: number;
  commentId: number;
  content: string;
};
export type ResponsePatchCommentDto = CommonResponse<Comment>;

export type RequestDeleteCommentDto = {
  lpId: number;
  commentId: number;
};

export type ResponseDeleteCommentDto = CommonResponse<{ messege: string }>;
