import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchLpDetail } from "../../services/fetchLpDetail";
import type { LpItem } from "../../types/lp";
import Loading from "../../components/Loading";
import ErrorFallback from "../../components/ErrorFallBack";
import { Heart, Edit, Trash2 } from "lucide-react";
import LpComments from "./LpComments";

const LpDetail = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const navigate = useNavigate();

  const {
    data: lp,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<LpItem>({
    queryKey: ["lp", lpid],
    queryFn: () => {
      if (!lpid) throw new Error("LP ID가 없습니다.");
      return fetchLpDetail(lpid);
    },
    enabled: !!lpid, // lpid가 있을 때만 실행
    staleTime: 1000 * 60,
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorFallback error={error} onRetry={refetch} />;

  if (!lp) return null;

  return (
    <div className="max-w-4xl mx-auto my-12 px-4">
      {/* 제목 + 날짜 */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{lp.title}</h1>
        <p className="text-gray-500 text-sm">
          업로드일: {new Date(lp.createdAt).toLocaleDateString("ko-KR")}
        </p>
      </div>

      {/* 썸네일 */}
      <div className="mb-8">
        <img
          src={lp.thumbnail}
          alt={lp.title}
          className="w-full rounded-lg shadow-md"
        />
      </div>

      {/* 본문 */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">본문</h2>
        <p className="whitespace-pre-line leading-relaxed text-gray-700">
          {lp.content}
        </p>
      </div>

      {/* 버튼 */}
      <div className="flex justify-end gap-3">
        <button className="flex items-center gap-2 px-4 py-2 border rounded text-gray-700 hover:bg-gray-100 transition">
          <Edit size={18} />
          수정
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-500 rounded hover:bg-red-50 transition">
          <Trash2 size={18} />
          삭제
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
          <Heart size={18} className="text-white" />
          좋아요 {lp.likes?.length ?? 0}
        </button>
      </div>

      {/* 뒤로가기 */}
      <div className="mt-10 text-center">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-green-500 text-sm underline"
        >
          목록으로 돌아가기
        </button>

        <LpComments />
      </div>
    </div>
  );
};

export default LpDetail;
