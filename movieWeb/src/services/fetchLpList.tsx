import axios from "axios";
import type { LpItem } from "../types/lp";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const fetchLpList = async (sort: "asc" | "desc"): Promise<LpItem[]> => {
  // await new Promise((r) => setTimeout(r, 1500)); //로딩확인용 
  const { data } = await axios.get(`${BASE_URL}/v1/lp4s`, {
    params: {
      cursor: 0,
      limit: 10,
      order: sort,
    },
    headers: {
      accept: "application/json",
    },
  });

  // API 구조: data.data.data → 실제 LP 배열
  return data.data?.data ?? [];
};
