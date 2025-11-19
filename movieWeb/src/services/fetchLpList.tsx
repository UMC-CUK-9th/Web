import axios from "axios";
import type { LpItem } from "../types/lp";

const BASE_URL = import.meta.env.VITE_SERVER_API_URL || "http://localhost:8000";

export interface LpListResponse {
  data: LpItem[];
  nextCursor: number | null;
  hasNext: boolean;
}

export const fetchLpList = async ({
  pageParam = 0,
  sort,
  search,
}: {
  pageParam?: number;
  sort: "asc" | "desc";
  search?: string;
}): Promise<LpListResponse> => {
  const { data } = await axios.get<{ data: LpListResponse }>(
    `${BASE_URL}/v1/lps`,
    {
      params: { cursor: pageParam, limit: 10, order: sort, search: search ?? "" },
      headers: { accept: "application/json" },
    }
  );
  return data.data;
};
