import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

import Loading from "../../components/common/Loading";
import ErrorFallback from "../../components/common/ErrorFallBack";

import { fetchMe } from "../../services/fetchMe";
import { fetchLpComments } from "../../services/fetchLpComments";
import { useCommentMutations } from "../../hooks/useCommentMutations";

const LpComments = () => {
  const { lpid } = useParams();
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [commentInput, setCommentInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");


  const loadMoreRef = useRef<HTMLDivElement | null>(null);


  // ================================
  const { data: me } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    staleTime: 1000 * 60 * 10, // 10분 캐싱
  });

  // ================================
  // ② 댓글 목록 (InfiniteQuery 그대로)
  // ================================
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
      fetchLpComments({ lpId: lpid as string, pageParam, order }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    initialPageParam: 0,
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    enabled: !!lpid,
  });

  // ================================
  // ③ 댓글 생성 mutation
  // ================================
  const { createComment, updateComment, deleteComment } = useCommentMutations(lpid!);

  const handleCreate = () => {
    if (!commentInput.trim()) return;

    createComment.mutate(commentInput, {
      onSuccess: () => setCommentInput(""),
    });
  };

  // ================================
  // ④ 무한스크롤 Intersection Observer
  // ================================
  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    const el = loadMoreRef.current;
    observer.observe(el);

    return () => observer.unobserve(el);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // ================================
  // ⑤ 로딩 / 에러 처리
  // ================================
  if (isLoading) return <Loading />;
  if (isError)
    return (
      <ErrorFallback
        message="댓글을 불러오는 중 오류가 발생했습니다."
        error={error}
        onRetry={refetch}
      />
    );

  const comments = data?.pages.flatMap((p) => p.data) ?? [];

  // ================================
  // ⑥ UI 렌더링
  // ================================
  return (
    <div className="mt-12 border-t pt-8 bg-white text-black">
      <h2 className="text-xl font-semibold mb-4">댓글</h2>

      {/* 댓글 입력 */}
      <div className="mb-6">
        <textarea
          placeholder="댓글을 입력하세요..."
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          className="w-full border rounded-md p-3 text-sm resize-none focus:ring-green-500"
          rows={3}
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={handleCreate}
            disabled={!commentInput.trim() || createComment.isPending}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md disabled:bg-gray-300"
          >
            {createComment.isPending ? "작성 중..." : "작성"}
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
        {comments.map((c) => {
          const isMine = me?.id === c.author.id;

          return (
            <li
              key={c.id}
              className="flex gap-3 items-start bg-gray-50 p-3 rounded-lg shadow-sm"
            >
              <img
                src={c.author.avatar}
                alt={c.author.name}
                className="w-10 h-10 rounded-full object-cover"
              />

              <div className="flex-1">
                {/* 상단 영역 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-gray-800">
                      {c.author.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(c.createdAt).toLocaleDateString("ko-KR")}
                    </p>
                  </div>

                  {/* 내 댓글일 때만 수정/삭제 버튼 */}
                  {isMine && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(c.id);
                          setEditText(c.content);
                        }}
                        className="text-blue-500 hover:underline text-sm"
                      >
                        수정
                      </button>

                      <button
                        onClick={() => deleteComment.mutate(c.id)}
                        disabled={deleteComment.isPending}
                        className="text-red-500 hover:underline text-sm"
                      >
                        {deleteComment.isPending ? "삭제 중..." : "삭제"}
                      </button>

                    </div>
                  )}
                </div>

                {/* 본문 or 수정 UI */}
                {editingId === c.id ? (
                  <div className="mt-2">
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full border rounded p-2 text-sm"
                    />

                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateComment.mutate(
                            { commentId: c.id, content: editText },
                            {
                              onSuccess: () => setEditingId(null),
                            }
                          )
                        }
                        disabled={!editText.trim() || updateComment.isPending}
                        className="bg-green-500 text-white px-3 py-1 rounded text-sm disabled:bg-gray-300"
                      >
                        {updateComment.isPending ? "저장 중..." : "저장"}
                      </button>

                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-300 px-3 py-1 rounded text-sm"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-left text-gray-700 mt-1">{c.content}</p>
                )}
              </div>
            </li>
          );
        })}
      </ul>


      {/* 무한 스크롤 Trigger */}
      <div ref={loadMoreRef} className="mt-6 flex justify-center">
        {isFetchingNextPage && (
          <div className="w-full grid gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LpComments;
