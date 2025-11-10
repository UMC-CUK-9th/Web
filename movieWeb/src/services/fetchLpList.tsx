import axios from "axios";
import type { LpItem } from "../types/lp";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export interface LpListResponse {
  data: LpItem[];
  nextCursor: number | null;
  hasNext: boolean;
}

export const fetchLpList = async ({
  pageParam = 0,
  sort,
}: {
  pageParam?: number;
  sort: "asc" | "desc";
}): Promise<LpListResponse> => {
  const { data } = await axios.get<{ data: LpListResponse }>(
    `${BASE_URL}/v1/lps`,
    {
      params: { cursor: pageParam, limit: 10, order: sort },
      headers: { accept: "application/json" },
    }
  );
  return data.data;
};
