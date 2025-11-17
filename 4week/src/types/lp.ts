import type { CursorBasedResponse } from "./common";

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

export type Lp = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorld: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  likes: Likes[];
};

export type Comment = {
  id: number;
  lpId: number;
  authorId: number;
  authorName: string; 
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ResquestLpDto = {

  lpid: number;
}

export type ResponseCommentListDto = CursorBasedResponse<Comment[]>;

export type ResponseLpDto = {
  data: Lp; 
};

export type ResponseLpListDto = CursorBasedResponse<Lp[]>;