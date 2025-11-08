import { Outlet, useNavigate, useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useState } from "react";

const LpDetailPage = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const navigate = useNavigate();
  const [commentOpen, setCommentOpen] = useState(false);

  // lpid 없을 때 요청 막고 안전하게 처리
  const { data, isPending, isError } = useGetLpDetail(lpid || "");

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center h-screen">
        상세 데이터를 불러올 수 없습니다.
      </div>
    );
  }

  const handleComments = () => {
    setCommentOpen(true);
    navigate(`/lp/${data.id}/comments`);
  };

  return (
    <div className="mt-20 mx-auto border-gray-500 border-2 p-4 rounded-2xl shadow-lg bg-lime-200 w-[70%] max-h-[100vh] overflow-y-auto">
      <div className="flex flex-col gap-4">
        {/* 작성자 / 날짜 */}
        <div className="flex justify-between">
          <h1>
            {typeof data.author === "string"
              ? data.author
              : (data.author as any)?.name ?? "익명"}
          </h1>
          <p>{new Date(data.updatedAt).toLocaleDateString()}</p>
        </div>

        {/* 제목 / 버튼 */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">{data.title}</h1>
          <div className="flex gap-4 mr-5">
            <button className="cursor-pointer">✏️</button>
            <button className="cursor-pointer">🗑️</button>
            <button className="cursor-pointer" onClick={handleComments}>
              💬
            </button>
          </div>
        </div>

        {/* 썸네일 */}
        {data.thumbnail && (
          <img
            src={data.thumbnail}
            alt={data.title}
            className="aspect-square w-1/2 mx-auto object-cover rounded-2xl"
          />
        )}

        {/* 내용 */}
        <h2 className="flex justify-center items-center text-lg whitespace-pre-wrap">
          {data.content}
        </h2>

        {/* 태그 */}
        <div className="flex justify-center items-center gap-2 flex-wrap">
          {data.tags?.map((tag) => (
            <span
              key={tag.id}
              className="p-2 bg-gray-400 text-black rounded-md"
            >
              #{tag.name}
            </span>
          ))}
        </div>

        {/* 좋아요 */}
        <p className="flex justify-center items-center">
          ♡ {data.likes?.length ?? 0}
        </p>
      </div>

      {/* 댓글 */}
      {commentOpen && (
        <div className="absolute inset-0 z-50 bg-white/60 backdrop-blur-sm">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default LpDetailPage;
