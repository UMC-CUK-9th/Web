import axios from "axios";
import type { LpItem } from "../types/lp";

const BASE_URL = import.meta.env.VITE_SERVER_API_URL;

export const fetchLpDetail = async (lpid: string): Promise<LpItem> => {
  const { data } = await axios.get(`${BASE_URL}/v1/lps/${lpid}`, {
    headers: { accept: "application/json" },
  });
  return data.data; 
};
