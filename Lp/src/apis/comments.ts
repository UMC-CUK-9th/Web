import type { RequestCommentsDto, ResponseCommentDto } from "../types/comments";
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
