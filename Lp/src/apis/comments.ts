import type {
  RequestCommentsDto,
  RequestDeleteCommentDto,
  RequestPatchCommentDto,
  RequestPostCommentDto,
  ResponseCommentDto,
  ResponseDeleteCommentDto,
  ResponsePatchCommentDto,
  ResponsePostCommentDto,
} from "../types/comments";
import { axiosInstance } from "./axios";

export const getComments = async (
  RequestCommentsDto: RequestCommentsDto
): Promise<ResponseCommentDto> => {
  const { data } = await axiosInstance.get(
    `/v1/lps/${RequestCommentsDto.lpId}/comments`,
    {
      params: {
        cursor: RequestCommentsDto.cursor,
        limit: RequestCommentsDto.limit,
        order: RequestCommentsDto.order,
      },
    }
  );
  return data;
};

export const postComment = async (
  RequestPostCommentDto: RequestPostCommentDto
): Promise<ResponsePostCommentDto> => {
  const { data } = await axiosInstance.post(
    `/v1/lps/${RequestPostCommentDto.lpId}/comments`,
    { content: RequestPostCommentDto.content }
  );
  return data;
};

export const patchComment = async (
  RequestPatchCommentDto: RequestPatchCommentDto
): Promise<ResponsePatchCommentDto> => {
  const { data } = await axiosInstance.patch(
    `/v1/lps/${RequestPatchCommentDto.lpId}/comments/${RequestPatchCommentDto.commentId}`,
    { content: RequestPatchCommentDto.content }
  );
  return data;
};

export const deleteComment = async (
  RequestDeleteCommentDto: RequestDeleteCommentDto
): Promise<ResponseDeleteCommentDto> => {
  const { data } = await axiosInstance.delete(
    `/v1/lps/${RequestDeleteCommentDto.lpId}/comments/${RequestDeleteCommentDto.commentId}`
  );
  return data;
};
