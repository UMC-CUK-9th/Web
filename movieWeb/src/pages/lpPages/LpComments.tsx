import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import Loading from "../../components/Loading";
import ErrorFallback from "../../components/ErrorFallBack";
import { fetchLpComments } from "../../services/fetchLpComments";

const LpComments = () => {
  const { lpid } = useParams();
  const [order, setOrder] = useState<"asc" | "desc">("desc");
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
    queryKey: ["lpComments", lpid, order],
    queryFn: ({ pageParam = 0 }) =>
      fetchLpComments({ lpId: lpid!, pageParam, order }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    initialPageParam: 0,
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
  });

  // ✅ IntersectionObserver: 무한스크롤 트리거
  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = loadMoreRef.current;
    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <ErrorFallback
        message="댓글을 불러오는 중 오류가 발생했습니다."
        error={error}
        onRetry={refetch}
      />
    );

  const comments = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="mt-12 border-t pt-8 bg-white text-black">
      <h2 className="text-xl font-semibold mb-4">댓글</h2>

      {/* 댓글 입력 (UI만) */}
      <div className="mb-6">
        <textarea
          placeholder="댓글을 입력하세요..."
          className="w-full border border-gray-300 rounded-md p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          rows={3}
        />
        <div className="flex justify-end mt-3">
          <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md text-sm transition">
            작성
          </button>
        </div>
      </div>

      {/* 정렬 버튼 */}
      <div className="flex justify-end mb-6">
        <div className="inline-flex border rounded-md overflow-hidden">
          <button
            onClick={() => setOrder("desc")}
            className={`px-4 py-2 text-sm ${
              order === "desc"
                ? "bg-green-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            최신순
          </button>
          <button
            onClick={() => setOrder("asc")}
            className={`px-4 py-2 text-sm border-l ${
              order === "asc"
                ? "bg-green-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            오래된순
          </button>
        </div>
      </div>

      {/* 댓글 목록 */}
      <ul className="space-y-4">
        {comments.map((c) => (
          <li
            key={c.id}
            className="flex gap-3 items-start bg-gray-50 p-3 rounded-lg shadow-sm"
          >
            <img
              src={c.author.avatar}
              alt={c.author.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm text-gray-800">
                  {c.author.name}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(c.createdAt).toLocaleDateString("ko-KR")}
                </p>
              </div>
              <p className="text-sm text-gray-600 mt-1">{c.content}</p>
            </div>
          </li>
        ))}
      </ul>

      <div ref={loadMoreRef} className="mt-6 flex justify-center">
        {isFetchingNextPage && (
          <div className="w-full grid gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={`next-${i}`}
                className="h-20 bg-gray-200 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LpComments;
