import type { CommonResponse, CursorBasedResponse } from "./common";

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

export type Authors = {
  id: number;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Lp = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  author: Authors;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  likes: Likes[];
};

export type Comment = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author: Authors;
};

export type NewLp ={
  title: string;
  content: string;
  thumbnail: string;
  tags: Tag[];
  published: boolean;
}

export type UpdateMyInfoDto = {
  name: string;
  bio?: string;   
  avatar?: string;
}

export type UpdateLp = {
  title: string;
  content?: string;
  thumbnail?: string;
  tags: [];
  published: boolean
}

export type ResponseLikeDto = CommonResponse<{
  id: number;
  userId: number;
  lpId: number;
}>

export type ResponseLpDto = CommonResponse<Lp>;
export type ResponseLpListDto = CursorBasedResponse<Lp[]>;
export type ResponseCommentListDto = CursorBasedResponse<Comment[]>;
export type ResponseCommentDto = CommonResponse<Comment>;