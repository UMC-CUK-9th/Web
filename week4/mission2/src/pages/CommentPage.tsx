import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate, useParams } from "react-router-dom";
import CommentCard from "../components/LpCard/CommentCard";
import CommentSkeletonList from "../components/LpCard/CommentSkeletonList";
import useGetInfiniteComment from "../hooks/queries/useGetInfiniteComment";
import type { PaginationDto } from "../types/common";

const CommentPage = () => {
  const navigate = useNavigate();
  const { lpid } = useParams();
  const [order, setOrder] = useState<PaginationDto["order"]>("desc");

  const numericLpId = lpid ? Number(lpid) : undefined;

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
    <div className="relative bg-fuchsia-100 min-h-screen w-full flex flex-col items-center pt-12 pb-12 text-black">
      
      <div className="w-[60%] flex justify-start mb-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition-all"
        >
          ←
        </button>
      </div>

      
      <div className="flex justify-between items-center w-[60%] mb-6">
        <h2 className="text-xl font-bold text-gray-800">댓글</h2>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-lg font-medium text-black transition-all duration-200 ${
              order === "asc"
                ? "bg-[#cfa9ff] scale-95"
                : "bg-white border border-gray-300 hover:bg-gray-200"
            }`}
            onClick={() => setOrder("asc")}
          >
            오래된 순
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium text-black transition-all duration-200 ${
              order === "desc"
                ? "bg-[#cfa9ff] scale-95"
                : "bg-white border border-gray-300 hover:bg-gray-200"
            }`}
            onClick={() => setOrder("desc")}
          >
            최신 순
          </button>
        </div>
      </div>

      
      <div className="w-[60%] mb-8 flex gap-3">
        <input
          type="text"
          placeholder="댓글을 작성해주세요..."
          className="flex-1 px-4 py-3 bg-white text-gray-800 rounded-lg border border-gray-300 focus:border-[#cfa9ff] focus:outline-none shadow-sm"
        />
        <button className="px-6 py-3 bg-[#cfa9ff] text-black font-medium rounded-lg hover:opacity-90 transition-colors duration-200 shadow-sm">
          작성
        </button>
      </div>

      
      <div className="w-[60%] h-96 overflow-y-auto bg-white rounded-2xl p-5 shadow-md">
        
        {commentsLoading && (
          <div className="flex flex-col gap-3">
            <CommentSkeletonList count={10} />
          </div>
        )}

       
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

            
            {commentsFetching && !commentsLoading && (
              <div className="mt-4">
                <CommentSkeletonList count={3} />
              </div>
            )}

            
            <div ref={ref} className="h-2"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentPage;
