import { PAGINATION_ORDER } from "../enums/common";

export type PaginationDto = {
  cursor?: number;
  search?: string;
  limit?: number;
  order?: PAGINATION_ORDER; 
};

export type CommonResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export type CursorBasedResponse<T> = CommonResponse<{ 
data: T;
nextCursor: number | null;
hasNext: boolean;
  }>;


