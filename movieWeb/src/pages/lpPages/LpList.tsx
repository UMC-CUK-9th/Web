import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import Loading from "../../components/common/Loading";
import ErrorFallback from "../../components/common/ErrorFallBack";
import FloatingButton from "../../components/FloatingButton";

import { fetchLpList } from "../../services/fetchLpList";
import type { LpItem } from "../../types/lp";

import useDebounce from "../../hooks/useDebounce";
import useThrottle from "../../hooks/useThrottle";

import LpToolbar from "../../components/LpToolbar";
import LpGrid from "../../components/LpGrid";

const LpList = () => {
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState("");
  const [loadTrigger, setLoadTrigger] = useState(0);

  const debouncedSearch = useDebounce(search, 300);
  const throttledLoadTrigger = useThrottle(loadTrigger, 3000);

  const navigate = useNavigate();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["lps", sort, debouncedSearch],
    enabled: true,
    queryFn: ({ pageParam = 0 }) =>
      fetchLpList({
        pageParam,
        sort,
        search:
          debouncedSearch.trim() === "" ? undefined : debouncedSearch.trim(),
      }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    initialPageParam: 0,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });


  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (
          entry.isIntersecting &&
          hasNextPage && // 더 가져올 게 있을 때만
          !isFetchingNextPage // 이미 가져오는 중이 아닐 때만
        ) {
          setLoadTrigger((prev) => prev + 1);
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage]);

  // throttledLoadTrigger가 변할 때만 다음 페이지 요청
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [throttledLoadTrigger, hasNextPage, isFetchingNextPage, fetchNextPage]);


  const handleChangeSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const handleChangeSort = useCallback((value: "asc" | "desc") => {
    setSort(value);
  }, []);

  const handleClickItem = useCallback(
    (id: string | number) => {
      navigate(`/lp/${id}`);
    },
    [navigate]
  );

  // 전체 데이터 merge (계산은 useMemo로 한 번만)
  const lpList: LpItem[] = useMemo(
    () => data?.pages.flatMap((page) => page.data) || [],
    [data]
  );

  // Loading & Error
  if (isLoading) return <Loading />;
  if (isError)
    return (
      <ErrorFallback
        message="LP 목록을 불러오는 중 오류가 발생했습니다."
        error={error}
        onRetry={refetch}
      />
    );

  return (
    <div className="max-w-7xl mx-auto my-12 px-4">
      {/* 상단 - 검색 + 정렬 */}
      <LpToolbar
        search={search}
        sort={sort}
        onChangeSearch={handleChangeSearch}
        onChangeSort={handleChangeSort}
      />

      {/* 카드 목록 */}
      <LpGrid items={lpList} onClickItem={handleClickItem} />

      {/* InfiniteScroll Target */}
      <div ref={loadMoreRef} className="mt-8 flex justify-center">
        {isFetchingNextPage && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={`next-${i}`}
                className="rounded-lg aspect-square bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        )}
      </div>

      <FloatingButton />
    </div>
  );
};

export default LpList;
