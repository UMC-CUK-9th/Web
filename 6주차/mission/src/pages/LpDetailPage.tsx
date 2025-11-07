import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/useGetLpDetail";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorDisplay from "../components/ErrorDisplay";

const LpDetailPage = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const { data, isLoading, isError } = useGetLpDetail(lpid);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorDisplay />;

  const lp = data?.data;

  if (!lp || !lp.author) {
    return (
      <div className="text-center text-red-500 py-10">
        데이터를 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto text-gray-300">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <img
            src={lp.author.avatar}
            alt="작성자 아바타"
            className="w-8 h-8 rounded-full"
          />
          <span className="font-semibold text-white">{lp.author.name}</span>
        </div>
        <div className="flex items-center gap-4 text-gray-400">
          <button className="hover:text-white text-black cursor-pointer">
            수정
          </button>
          <button className="hover:text-white text-black cursor-pointer">
            삭제
          </button>
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-6 text-white">{lp.title}</h1>

      <img
        src={lp.thumbnail}
        alt="lp 썸네일"
        className="w-full rounded-lg mb-6 bg-gray-900 p-4 size-100 object-cover"
      />

      <div className="flex justify-center items-center gap-2">
        <button className="text-pink-500 text-3xl transition-transform hover:scale-125">
          ❤️
        </button>
        <span className="text-xl font-semibold text-white">
          {lp.likes.length}
        </span>
      </div>

      {/* 댓글 작성란 */}
      <div className="mt-8">
        <h3 className="font-semibold mb-2">댓글 작성</h3>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="댓글을 입력하세요"
            className="border rounded px-2 py-1 flex-1"
          />
          <button className="px-3 py-1 bg-blue-500 text-white rounded">
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default LpDetailPage;