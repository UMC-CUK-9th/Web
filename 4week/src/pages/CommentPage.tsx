import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate, useParams } from "react-router-dom";
import CommentCard from "../components/Comment/CommentCard";
import CommentSkeletonList from "../components/Comment/CommentSkeletonList";
import useGetInfiniteComment from "../hooks/queries/useGetInfiniteComment";
import usePostComment from "../hooks/mutations/usePostComment";
import type { PaginationDto } from "../types/common";

const CommentPage = () => {
  const navigate = useNavigate();
  const { lpid } = useParams();
  const [order, setOrder] = useState<PaginationDto["order"]>("desc");

  const numericLpId = lpid ? Number(lpid) : undefined;

  const [commentInput, setCommentInput] = useState("");
  const { mutate: postCommentMutate, isPending } = usePostComment(Number(lpid));

  const {
    data: comments,
    isLoading: commentsLoading,
    isFetching: commentsFetching,
    hasNextPage: commentsHasNextPage,
    fetchNextPage: commentsFetchNextPage,
  } = useGetInfiniteComment(numericLpId, 10, order);

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView) {
      !commentsFetching && commentsHasNextPage && commentsFetchNextPage();
    }
  }, [inView, commentsFetching, commentsHasNextPage, commentsFetchNextPage]);

  return (
    <div className="relative bg-fuchsia-100 min-h-screen flex flex-col items-center py-12 px-4 text-black">

      {/* 전체 컨테이너 더 넓게 */}
      <div className="w-full max-w-2xl">

        {/* 뒤로가기 */}
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition-all mb-6"
        >
          ←
        </button>

        {/* 제목 + 정렬 */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">댓글</h2>

          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded-lg font-medium ${
                order === "asc"
                  ? "bg-[#cfa9ff]"
                  : "bg-white border hover:bg-gray-200"
              }`}
              onClick={() => setOrder("asc")}
            >
              오래된 순
            </button>

            <button
              className={`px-4 py-2 rounded-lg font-medium ${
                order === "desc"
                  ? "bg-[#cfa9ff]"
                  : "bg-white border hover:bg-gray-200"
              }`}
              onClick={() => setOrder("desc")}
            >
              최신 순
            </button>
          </div>
        </div>

        {/* 댓글 입력 */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="댓글을 작성해주세요..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            className="flex-1 px-4 py-3 bg-white text-gray-800 rounded-lg border shadow-sm"
          />
          <button
            onClick={() => {
              if (!commentInput.trim()) return alert("댓글을 입력해주세요!");

              postCommentMutate(
                { content: commentInput },
                {
                  onSuccess: () => setCommentInput(""),
                }
              );
            }}
            disabled={isPending}
            className="px-6 py-3 bg-[#cfa9ff] rounded-lg shadow-sm hover:opacity-90"
          >
            {isPending ? "작성중..." : "작성"}
          </button>
        </div>

        {/* 댓글 목록 */}
        <div className="bg-white rounded-2xl p-5 shadow-md max-h-[70vh] overflow-y-auto">
          {commentsLoading && <CommentSkeletonList count={10} />}

          {comments && (
            <div className="flex flex-col gap-4">
              {comments.pages
                .map((page) => page.data.data)
                .flat()
                .map((comment) => (
                  <CommentCard
                    key={comment.id}
                    id={comment.id}
                    content={comment.content}
                    author={comment.author}
                  />
                ))}

              {commentsFetching && <CommentSkeletonList count={3} />}

              <div ref={ref} className="h-5" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentPage;