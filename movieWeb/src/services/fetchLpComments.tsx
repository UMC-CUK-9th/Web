import { getCleanToken } from "../api/authAPI";
export interface FetchLpCommentsParams {
  lpId: string;
  pageParam?: number;
  order: "asc" | "desc";
}

export const fetchLpComments = async ({
  lpId,
  pageParam = 0,
  order,
}: FetchLpCommentsParams) => {

  const token = getCleanToken();

  const headers: Record<string, string> = {
    accept: "application/json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const BASE_URL = import.meta.env.VITE_SERVER_API_URL;
  const res = await fetch(
    `${BASE_URL}/v1/lps/${lpId}/comments?cursor=${pageParam}&limit=10&order=${order}`,
    {
      headers,
    }
  );

  if (!res.ok) {
    throw new Error("댓글을 불러오지 못했습니다.");
  }

  const json = await res.json();
  return json.data;
};
