import type { CommonResponse, CursorBasedResponse } from "./common";


export type CommentAuthor = {
  id: number;
  name: string;
  avatar: string | null;
};


export type CommentItem = {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: CommentAuthor;
  lpId: number;
};

export type ResponseLpCommentsDto = CursorBasedResponse<CommentItem[]>;

export type RequestCreateCommentDto = {
  lpId: number;
  content: string;
};

export type RequestUpdateCommentDto = {
  content: string;
};

export type ResponseCommentDto = CommonResponse<CommentItem>;
