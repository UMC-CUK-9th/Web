import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import LpCommentForm from "./LpCommentForm.tsx";
import CommentSkeleton from "./LpCommentSkeleton.tsx";
import useGetLpComments from "../../hooks/useGetLpComments.ts";
import ErrorDisplay from "../ErrorDisplay.tsx";
import LpCommentButton from "./LpCommentButton.tsx";

interface Props {
  lpid: string;
}

const LpCommentSection = ({ lpid }: Props) => {
  const [order, setOrder] = useState<"desc" | "asc">("desc");

  const {
    data: comments,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
  } = useGetLpComments(lpid, order);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isError) {
    return <ErrorDisplay />;
  }

  const allComments =
    comments?.pages?.map((page) => page.data.data).flat() ?? [];

  return (
    <div className="text-gray-300 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-white">댓글</h2>
      <LpCommentForm lpid={lpid} />

      <div className="flex justify-end items-center gap-2 mb-4">
        <button
          onClick={() => setOrder("asc")}
          className={`px-3 py-1 rounded-md text-sm font-semibold cursor-pointer transition-colors duration-200 ${
            order === "asc"
              ? `bg-gray-700 text-white`
              : `bg-gray-600 text-gray-400 hover:bg-gray-500`
          }`}
        >
          오래된순
        </button>
        <button
          onClick={() => setOrder("desc")}
          className={`px-3 py-1 rounded-md text-sm font-semibold cursor-pointer transition-colors duration-200 ${
            order === "desc"
              ? `bg-gray-700 text-white`
              : `bg-gray-600 text-gray-400 hover:bg-gray-500`
          }`}
        >
          최신순
        </button>
      </div>

      <ul className="space-y-4">
        {allComments.map((comment) => (
          <LpCommentButton
            key={comment.id}
            comment={comment}
            lpid={lpid}
          />
        ))}
      </ul>

      <div ref={ref} className="h-10 mt-4">
        {isFetchingNextPage && <CommentSkeleton />}
      </div>
    </div>
  );
};

export default LpCommentSection;