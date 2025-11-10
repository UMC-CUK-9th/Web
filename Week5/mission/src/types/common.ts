import { PAGINATION_ORDER } from "../enums/common";

export type CommonResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export type CursorBasedResponse<T> = CommonResponse <{
  data: T;
  nextCursor: number | null;
  hasNext: boolean;
}>;


type PaginationOrder = typeof PAGINATION_ORDER[keyof typeof PAGINATION_ORDER];

export type PaginationDto = {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: PaginationOrder;
};