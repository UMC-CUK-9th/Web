import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import ErrorFallback from "../../components/ErrorFallBack";
import { fetchLpList } from "../../services/fetchLpList";
import type { LpItem } from "../../types/lp";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FloatingButton from "../../components/FloatingButton";
// import LpCardSkeleton from "../../components/LpCardSkeleton";

const LpList = () => {
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const navigate = useNavigate();
  const loadMoreRef = useRef<HTMLDivElement | null>(null); // ✅ 관찰 대상 ref

  // ✅ useInfiniteQuery
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
    queryKey: ["lps", sort],
    queryFn: ({ pageParam = 0 }) => fetchLpList({ pageParam, sort }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    initialPageParam: 0,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });

  // ✅ Intersection Observer (자동 로드)
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          fetchNextPage(); // 화면에 보이면 다음 페이지 자동 요청
        }
      },
      { rootMargin: "200px" } // 조금 일찍 로드 (스크롤 여유)
    );

    const target = loadMoreRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <ErrorFallback
        message="LP 목록을 불러오는 중 오류가 발생했습니다."
        error={error}
        onRetry={refetch}
      />
    );

  // ✅ 모든 페이지 데이터 합치기
  const lpList: LpItem[] = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="max-w-7xl mx-auto my-12 px-4">
      {/* 정렬 옵션 */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">LP 목록</h1>

        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="text-sm text-gray-600">
            정렬:
          </label>
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
          <div
            key={item.id}
            onClick={() => navigate(`/lp/${item.id}`)}
            className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition cursor-pointer aspect-square group"
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
          </div>
        ))}
      </div>

      {/* ✅ 감시용 div (IntersectionObserver target) */}
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


      {/* 플로팅 버튼 */}
      <FloatingButton />
    </div>
  );
};

export default LpList;
