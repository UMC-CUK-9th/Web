// src/services/fetchLpComments.ts
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
  const token = localStorage.getItem("accessToken");
if (token?.startsWith('"') && token.endsWith('"')) {
  const fixed = token.slice(1, -1); // 따옴표 제거
  localStorage.setItem("accessToken", fixed);
}


  const headers: Record<string, string> = {
    accept: "application/json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(
    `http://localhost:8000/v1/lps/${lpId}/comments?cursor=${pageParam}&limit=10&order=${order}`,
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
