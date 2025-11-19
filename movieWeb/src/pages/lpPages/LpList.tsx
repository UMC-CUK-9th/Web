import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loading from "../../components/common/Loading";
import ErrorFallback from "../../components/common/ErrorFallBack";
import { fetchLpList } from "../../services/fetchLpList";
import type { LpItem } from "../../types/lp";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FloatingButton from "../../components/FloatingButton";
import useDebounce from "../../hooks/useDebounce";
import useThrottle from "../../hooks/useThrottle";

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
    enabled: debouncedSearch.trim().length >= 0,


    queryFn: ({ pageParam = 0 }) =>
      fetchLpList({
        pageParam,
        sort,
        search: debouncedSearch.trim() ==="" ? undefined: debouncedSearch.trim(),
      }),


    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,


    initialPageParam: 0,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });

  // --- IntersectionObserver ---
  // useEffect(() => {
  //   if (!hasNextPage || isFetchingNextPage) return;

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       const [entry] = entries;
  //       if (entry.isIntersecting) fetchNextPage();
  //     },
  //     { rootMargin: "200px" }
  //   );

  //   const target = loadMoreRef.current;
  //   if (!target) return;

  //   observer.observe(target);

  //   return () => {
  //     observer.unobserve(target);
  //   };
  // }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setLoadTrigger((prev) => prev + 1);
        }
      },
      { rootMargin: "200px" }
    );

    const target = loadMoreRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [throttledLoadTrigger]);


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

  // 전체 데이터 merge
  const lpList: LpItem[] = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="max-w-7xl mx-auto my-12 px-4">
      {/* 상단 - 검색 + 정렬 */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">LP 목록</h1>

        <div className="flex items-center gap-3">
          {/* 검색 입력 */}
          <input
            type="text"
            placeholder="검색어 입력..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md text-sm px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />

          {/* 정렬 필터 */}
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as "asc" | "desc")}
            className="border border-gray-300 rounded-md text-sm px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          >
            <option value="desc">최신순</option>
            <option value="asc">오래된순</option>
          </select>
        </div>
      </div>

      {/* 카드 목록 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {lpList.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => navigate(`/lp/${item.id}`)}
            className="relative w-full overflow-hidden rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition cursor-pointer aspect-square group text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-500"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out flex flex-col justify-end p-3">
              <h2 className="text-white font-semibold text-sm line-clamp-1 mb-1 drop-shadow-md">
                {item.title}
              </h2>
              <div className="flex justify-between items-center text-xs text-gray-200 drop-shadow-sm">
                <p>{new Date(item.createdAt).toLocaleDateString("ko-KR")}</p>
                <div className="flex items-center gap-1">
                  <Heart size={14} className="text-red-400" />
                  <span>{item.likes?.length ?? 0}</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

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
