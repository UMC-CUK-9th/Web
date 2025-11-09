import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { lpDetail } from "../types/lps";
import { getLpDetail } from "../apis/lps";
import { FaHeart } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import useGetInfiniteCommentsList from "../hooks/queries/useGetInfiniteComments";
import { useInView } from "react-intersection-observer";
import CommentCard from "../components/Comment";
import CommentCardSkeleton from "../components/CommentSkeleton";

export default function LpDetailPage() {
  const params = useParams();
  const lpId = Number(params.id);
  const [detail, setDetail] = useState<lpDetail>();
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const { ref, inView } = useInView({ threshold: 0 });

  const handleClick = () => {
    setSort((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const {
    data: comments,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteCommentsList(lpId, 5, sort);

  useEffect(() => {
    const getData = async () => {
      const { data } = await getLpDetail(lpId);
      console.log("이거출력해줘..", data);
      setDetail(data);
    };
    getData();
  }, [lpId]);

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <div className="w-full bg-black flex justify-center text-white">
      <div className="bg-[#252525ff] rounded-lg w-[80%] flex flex-col items-center my-10 p-5 gap-5">
        {/*작성자이름*/}
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <img
              src={detail?.author.avatar}
              className="w-10 h-10 rounded-full"
              alt={"구글로고"}
            />
            <p className="text-lg">{detail?.author.name}</p>
          </div>
          <p>{detail?.createdAt.slice(0, 10)}</p>
        </div>

        {/*Lp이름*/}
        <div className="w-full flex justify-between">
          <p>{detail?.title}</p>
          <div className="flex gap-3 items-center">
            <GoPencil />
            <FaRegTrashAlt />
          </div>
        </div>

        {/*Lp 사진*/}
        <div className="flex items-center justify-center shadow-lg shadow-black m-3 p-8 relative">
          <img
            src={detail?.thumbnail}
            className="w-72 h-72 rounded-full animate-spin"
          />
          <div className="absolute w-8 h-8 rounded-full bg-gray-300" />
        </div>

        <p>{detail?.content}</p>

        <div className="flex bg-gray-900 p-2 rounded-lg">
          <p># 태그</p>
        </div>

        <div className="flex items-center gap-3">
          <FaHeart />
          <p>{detail?.likes.length}</p>
        </div>

        {/*댓글*/}
        <div className="flex justify-between items-center w-full">
          <h2 className="text-lg">댓글</h2>
          <div className="flex items-center">
            <button
              className={`border border-white rounded-l-lg p-2 w-23 ${
                sort == "asc"
                  ? "bg-white text-black"
                  : "bg-black text-white cursor-pointer"
              }`}
              onClick={handleClick}
            >
              오래된순
            </button>
            <button
              className={`border border-white rounded-r-lg p-2 w-23 ${
                sort == "desc"
                  ? "bg-white text-black"
                  : "bg-black text-white cursor-pointer"
              }`}
              onClick={handleClick}
            >
              최신순
            </button>
          </div>
        </div>
        <div className="flex w-full">
          <input
            type="text"
            placeholder="댓글을 입력해주세요"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <button className="w-25 mx-3 bg-gray-500 rounded-md">작성</button>
        </div>

        <div className="w-full">
          {isError && <>오류가 발생했습니다.</>}
          {isPending && (
            <>
              <CommentCardSkeleton />
              <CommentCardSkeleton />
              <CommentCardSkeleton />
            </>
          )}
          {comments?.pages
            ?.map((page) => page.data.data)
            .flat()
            .map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          {isFetching && (
            <>
              <CommentCardSkeleton />
              <CommentCardSkeleton />
              <CommentCardSkeleton />
            </>
          )}
          <div ref={ref} className="h-2"></div>
        </div>
      </div>
    </div>
  );
}
