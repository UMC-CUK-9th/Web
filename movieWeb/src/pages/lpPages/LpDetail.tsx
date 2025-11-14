import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchLpDetail } from "../../services/fetchLpDetail";
import { fetchMe } from "../../services/fetchMe";
import type { LpItem } from "../../types/lp";
import Loading from "../../components/common/Loading";
import ErrorFallback from "../../components/common/ErrorFallBack";
import { Heart, Edit, Trash2 } from "lucide-react";
import LpComments from "./LpComments";
import { useLpMutations } from "../../hooks/useLpMutations";

const LpDetail = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const navigate = useNavigate();

  const { data: lp, isLoading, isError, error, refetch } = useQuery<LpItem>({
    queryKey: ["lp", lpid],
    queryFn: () => fetchLpDetail(lpid!),
    enabled: !!lpid,
  });

  const { data: me } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    staleTime: 1000 * 60 * 5,
  });

  const { updateLp, deleteLp } = useLpMutations(lpid!);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorFallback error={error} onRetry={refetch} />;
  if (!lp) return null;

  const isMine = me?.id === lp.authorId;

  // 수정 기능
  const handleEdit = () => {
    const title = prompt("제목을 수정하세요", lp.title);
    if (title === null) return;

    const content = prompt("내용을 수정하세요", lp.content);
    if (content === null) return;

    const thumbnail = prompt("썸네일 URL 입력", lp.thumbnail) || lp.thumbnail;

    // 안전한 tags 변환
    const tags = Array.isArray(lp.tags)
      ? lp.tags.map((t) => (typeof t === "string" ? t : t.name))
      : [];

    updateLp.mutate({
      title,
      content,
      thumbnail,
      tags,
    });
  };

  // 삭제 기능
  const handleDelete = () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    deleteLp.mutate();
  };

  return (
    <div className="max-w-4xl mx-auto my-12 px-4">
      <h1 className="text-3xl font-bold mb-2">{lp.title}</h1>
      <p className="text-gray-500 text-sm">
        업로드일: {new Date(lp.createdAt).toLocaleDateString("ko-KR")}
      </p>

      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="w-full rounded-lg shadow-md my-8"
      />

      <h2 className="text-xl font-semibold mb-3">본문</h2>
      <p className="text-gray-700 whitespace-pre-line">{lp.content}</p>

      {isMine && (
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
          >
            <Edit size={18} />
            수정
          </button>

          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-500 rounded hover:bg-red-50"
          >
            <Trash2 size={18} />
            삭제
          </button>
        </div>
      )}

      {/* 좋아요 */}
      <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mt-3">
        <Heart size={18} /> 좋아요 {lp.likes?.length ?? 0}
      </button>

      {/* 뒤로가기 */}
      <button
        onClick={() => navigate(-1)}
        className="mt-10 text-sm text-gray-500 underline hover:text-green-500"
      >
        목록으로 돌아가기
      </button>

      <LpComments />
    </div>
  );
};

export default LpDetail;
