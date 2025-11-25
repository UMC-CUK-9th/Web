import type { CommonResponse, PaginationDto } from "../types/common";
import type { ResponseLpListDto, RequestLpDto, ResponseLpDto, ResponseLikeLpDto, ResponseCreateLpDto, RequestCreateLpDto, } from "../types/lp";
import type { ResponseLpCommentsDto, RequestCreateCommentDto, ResponseCommentDto } from "../types/comment";
import { axiosInstance } from "./axios";



export const getLpList = async (
    PaginationDto: PaginationDto
) : Promise<ResponseLpListDto> => {
    const { data } = await axiosInstance.get( "/v1/lps", {
        params: PaginationDto,
    });
    return data;
};


export const getLpDetail = async ({lpId,}:RequestLpDto):Promise<ResponseLpDto> => {
    const {data} = await axiosInstance.get(`/v1/lps/${lpId}`);
    return data;
};

export const postLike = async ({lpId}:RequestLpDto):Promise<ResponseLikeLpDto> => {
    const {data} = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
    return data;
};


export const deleteLike = async ({lpId}:RequestLpDto):Promise<ResponseLikeLpDto> => {
    const {data} = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
    return data;
};

export const getLpComments = async ({
  lpId,
  ...pagination
}: { lpId: number } & PaginationDto): Promise<ResponseLpCommentsDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: pagination,
  });
  return data;
};


export const postLpComment = async ({ 
  lpId, 
  content 
}: RequestCreateCommentDto): Promise<ResponseCommentDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, { content });
  return data;
};

export const patchLpComment = async ({
  lpId,
  commentId,
  content,
}: { commentId: number } & RequestCreateCommentDto): Promise<ResponseCommentDto> => {
  const { data } = await axiosInstance.patch(
    `/v1/lps/${lpId}/comments/${commentId}`, 
    { content }
  );
  return data;
};

export const deleteLpComment = async ({
  lpId,
  commentId,
}: { lpId: number, commentId: number }): Promise<CommonResponse<null>> => {
  const { data } = await axiosInstance.delete(
    `/v1/lps/${lpId}/comments/${commentId}`
  );
  return data;
};



export const postLp = async (body: RequestCreateLpDto) => {
  const { data } = await axiosInstance.post<ResponseCreateLpDto>(
    "/v1/lps",
    body 
  );
  return data;
};


export const deleteLp = async ({
  lpId,
}: {
  lpId: number;
}): Promise<CommonResponse<null>> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}`);
  return data;
};

export const patchLp = async ({
  lpId,
  body,
}: {
  lpId: number;
  body: RequestCreateLpDto;
}): Promise<ResponseLpDto> => {
  const { data } = await axiosInstance.patch<ResponseLpDto>(
    `/v1/lps/${lpId}`,
    body
  );
  return data;
};