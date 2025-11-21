import type { CommonResponse, PaginationDto } from "../types/common";
import { axiosInstance } from "./axios";
import type { Authors, ResponseCommentDto, ResponseCommentListDto, ResponseLikeDto, ResponseLpDto, ResponseLpListDto, UpdateLp, UpdateMyInfoDto } from "../types/lp";

export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });

  return data;
};

export const getLpDetail = async (lpid: string | undefined):Promise<ResponseLpDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpid}`);
  return data;
};

export const getLpComments = async ({
  lpid,
  order,
  cursor,
}: {
  lpid: string;
  order: "asc" | "desc";
  cursor?: number;
}): Promise<ResponseCommentListDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpid}/comments`, {
    params: {
      order,
      cursor,
      limit: 3,
    },
  });

  return data;
};

export const postLike = async(lpid : string | undefined) : Promise<ResponseLikeDto> => {
  const {data} = await axiosInstance.post(`/v1/lps/${lpid}/likes`);
  return data;
}

export const deleteLike = async(lpid : string | undefined): Promise<ResponseLikeDto> => {
  const {data} = await axiosInstance.delete(`/v1/lps/${lpid}/likes`);
  return data;
}

export const addLp = async(): Promise<ResponseLpDto> => {
  const {data} = await axiosInstance.post(`/v1/lps`);
  return data;
}

export const postComment = async({lpid, content}: 
  {lpid: string; content: string;}): Promise<ResponseCommentDto> => {
    const {data} = await axiosInstance.post(`/v1/lps/${lpid}/comments`, {
      content,
    });
    return data;
  }

export const updateComment = async ({
  lpid,
  commentId,
  content,
}: {
  lpid: string,
  commentId: number; 
  content: string;
}): Promise<ResponseCommentDto> => {
  const { data } = await axiosInstance.patch(
    `/v1/lps/${lpid}/comments/${commentId}`,
    {
      content
    }
  );
  return data;
};

export const deleteComment = async ({
  commentId,
  lpid,
}: {
  commentId: number;
  lpid: string,
}): Promise<CommonResponse<{}>> => {
  const { data } = await axiosInstance.delete(
    `/v1/lps/${lpid}/comments/${commentId}`
  );
  return data;
};

export const updateMyInfo = async (
  payload: UpdateMyInfoDto
): Promise<CommonResponse<Authors>> => {
  const { data } = await axiosInstance.patch("/v1/users", payload);
  return data;
};

export const deleteUser = async() => {
  const {data} = await axiosInstance.delete(`/v1/users`);
  return data;
}

export const updateLp = async ({
  lpid,
  payload,
}: {
  lpid: string;
  payload: Partial<UpdateLp>; 
}): Promise<ResponseLpDto> => {
  const { data } = await axiosInstance.patch(
    `/v1/lps/${lpid}`, payload
  );
  return data;
};

export const deleteLp = async(lpid: string,) =>{
  const {data} = await axiosInstance.delete(`/v1/lps/${lpid}`);
  return data;
}