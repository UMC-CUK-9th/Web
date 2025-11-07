import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useGetLpComments from "../hooks/useGetLpComments";
import LpCommentForm from "./LpCommentForm.tsx";
import CommentSkeleton from "./LpCommentSkeleton.tsx";
import ErrorDisplay from "./ErrorDisplay.tsx";

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

  return (
    <div className="text-gray-300 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-white">댓글</h2>
      <LpCommentForm />

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
        {comments?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((user) => (
            <li key={user.id} className="flex gap-3">
              <img
                src={user.author.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full bg-gray-700"
              />
              <div>
                <span className="font-semibold text-white">
                  {user.author.name || "익명"}
                </span>
                <p>{user.content}</p>
              </div>
            </li>
          ))}
      </ul>
      <div ref={ref} className="h-10 mt-4">
        {isFetchingNextPage && <CommentSkeleton />}
      </div>
    </div>
  );
};

export default LpCommentSection;