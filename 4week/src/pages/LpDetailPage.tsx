import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { useAuth } from "../context/AuthContext";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import useDeleteLp from "../hooks/mutations/useDeleteLp";
import useToggleLikeLp from "../hooks/mutations/useToggleLikeLp";
import { useLpComments } from "../hooks/queries/useLpComments";
import { usePostLpComment } from "../hooks/mutations/usePostLpComment";
import { MessageCircle } from "lucide-react";

// --- 아이콘들 ---
const EditIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LikeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UploaderAvatar = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    className="rounded-full bg-gray-600"
  >
    <path
      d="M20 21.6667C24.6024 21.6667 28.3333 25.3976 28.3333 30M20 18.3333C17.2386 18.3333 15 16.0947 15 13.3333C15 10.572 17.2386 8.33334 20 8.33334C22.7614 8.33334 25 10.572 25 13.3333C25 16.0947 22.7614 18.3333 20 18.3333Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// --- 메인 컴포넌트 ---
const LpDetailPage = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  // LP 상세
  const {
    data: lp,
    isPending,
    isError,
    error,
    refetch,
  } = useGetLpDetail(lpid);

  // 좋아요, 삭제
  const deleteLp = useDeleteLp();
  const toggleLike = useToggleLikeLp();

  // 댓글
  const { data: comments, refetch: refetchComments } = useLpComments(Number(lpid));
  const postComment = usePostLpComment(Number(lpid));

  // 삭제 핸들러
  const handleDelete = async () => {
    if (!lpid) return;
    await deleteLp.mutateAsync(lpid);
    navigate("/lp");
  };

  // 좋아요 핸들러
  const handleLike = async () => {
    if (!lpid) return;
    await toggleLike.mutateAsync(lpid);
    refetch();
  };

  // 댓글 작성 핸들러
  const handleCommentSubmit = async () => {
    if (!commentContent.trim() || !lpid) return;
    await postComment.mutateAsync(commentContent);
    setCommentContent("");
    refetchComments();
  };

  // 시간 변환 함수
  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "년 전";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "달 전";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "일 전";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "시간 전";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "분 전";
    return Math.floor(seconds) + "초 전";
  };

  if (isPending) return <LoadingSpinner size="lg" />;
  if (isError)
    return (
      <div className="container mx-auto max-w-2xl">
        <ErrorMessage message={error.message} onRetry={() => refetch()} />
      </div>
    );
  if (!lp) return null;

  const isOwner = user?.id === lp.authorId;

  return (
    <div className="container mx-auto max-w-3xl bg-white dark:bg-gray-800 p-4 sm:p-8 rounded-lg shadow-md">
      {/* 헤더 */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <UploaderAvatar />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {lp.authorName || "오타니안"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {timeAgo(lp.createdAt)}
            </p>
          </div>
        </div>

        {/* 수정 / 삭제 버튼 */}
        {isOwner && (
          <div className="flex space-x-2">
            <button
              onClick={() => navigate(`/lp/edit/${lpid}`)}
              className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600"
            >
              <EditIcon />
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700"
            >
              <DeleteIcon />
            </button>
          </div>
        )}
      </div>

      {/* 본문 */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {lp.title}
      </h1>

      {/* CD 이미지 */}
      <div className="flex justify-center items-center my-8">
        <div className="w-64 h-64 sm:w-80 sm:h-80 relative">
          <img
            src={lp.thumbnail}
            alt={lp.title}
            className="w-full h-full rounded-full object-cover animate-spin-slow"
          />
          <div className="absolute top-1/2 left-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-gray-800 dark:bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 border-4 border-gray-500"></div>
        </div>
      </div>

      {/* 설명 */}
      <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 mb-6">
        <p>{lp.content}</p>
      </div>

      {/* 태그 */}
      <div className="mb-6">
        {lp.tags.map((tag) => (
          <span
            key={tag.id}
            className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300 mr-2 mb-2"
          >
            #{tag.name}
          </span>
        ))}
      </div>

      {/* 좋아요 */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={handleLike}
          className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-full hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
        >
          <LikeIcon />
          <span className="font-bold">{lp.likes.length}</span>
        </button>
      </div>

      {/* 댓글 섹션 */}
      <div className="mt-10 border-t pt-6">
        <div className="flex items-center gap-2 mb-3">
          <MessageCircle className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            댓글
          </h2>
        </div>

        {/* 댓글 목록 */}
        <div className="space-y-3 mb-4">
          {comments?.length ? (
            comments.map((comment: any) => (
              <div key={comment.id} className="border-b pb-2">
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {comment.userName || "익명"}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {comment.content}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              아직 댓글이 없습니다.
            </p>
          )}
        </div>

        {/* 댓글 작성 */}
        <div className="flex gap-2">
          <input
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="댓글을 입력하세요"
            className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={handleCommentSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            등록
          </button>
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              정말 삭제하시겠습니까?
            </h2>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LpDetailPage;
