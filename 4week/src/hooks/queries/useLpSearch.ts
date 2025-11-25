// src/hooks/queries/useLpSearch.ts

import { useInfiniteQuery } from "@tanstack/react-query";
import { searchLps } from "../../apis/lpapi";

export const useLpSearch = (debouncedKeyword: string) => {
  return useInfiniteQuery({
    queryKey: ["lpSearch", debouncedKeyword],

    queryFn: ({ pageParam = null }) =>
      searchLps({
        query: debouncedKeyword,
        cursor: pageParam,
      }),

    getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,

    enabled: debouncedKeyword.trim().length > 0,

    staleTime: 0,
    cacheTime: 1000 * 60 * 5,
  });
};

export const useLpSearchQuery = (keyword: string) => {
  return useQuery({
    queryKey: ["lpSearch", keyword],
    queryFn: () => searchLp(keyword),
    enabled: keyword.trim().length > 0,  // 빈 문자열일 때 요청 X
    staleTime: 1000 * 30,                // 30초 동안 fresh
    gcTime: 1000 * 60 * 5,               // 캐시 5분 유지
  });
};
