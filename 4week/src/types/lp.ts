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

/* ✅ 댓글(Comment) 타입 추가 */
export type Comment = {
  id: number;
  lpId: number;
  authorId: number;
  authorName: string; // 닉네임 또는 이름
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

/* ✅ 댓글 응답 타입 추가 (페이지네이션 고려 가능) */
export type ResponseCommentListDto = CursorBasedResponse<Comment[]>;

/* ✅ 기존 LP 응답 타입 */
export type ResponseLpDto = {
  data: Lp; // 단일 LP 상세 데이터일 때
};

/* ✅ LP 리스트 응답 타입 */
export type ResponseLpListDto = CursorBasedResponse<Lp[]>;
