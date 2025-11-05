import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { useAuth } from "../context/AuthContext";
import useGetLpDetail from "../hooks/queries/useGetLpDetail"; // ✅ 추가



// (신규) 아이콘
const EditIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const DeleteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const LikeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
// (신규) 업로더 아바타 아이콘 (Placeholder)
const UploaderAvatar = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded-full bg-gray-600">
    <path d="M20 21.6667C24.6024 21.6667 28.3333 25.3976 28.3333 30M20 18.3333C17.2386 18.3333 15 16.0947 15 13.3333C15 10.572 17.2386 8.33334 20 8.33334C22.7614 8.33334 25 10.572 25 13.3333C25 16.0947 22.7614 18.3333 20 18.3333Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);


const LpDetailPage = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const { user } = useAuth(); // (신규) 현재 로그인한 사용자 정보
  const {
    data: lp,
    isPending,
    isError,
    error,
    refetch,
  } = useGetLpDetail(lpid);

  // 1. (체크리스트) 로딩 상태 (동일 컴포넌트 사용)
  if (isPending) {
    return <LoadingSpinner size="lg" />;
  }

  // 2. (체크리스트) 에러 상태 (동일 컴포넌트 사용)
  if (isError) {
    return (
      <div className="container mx-auto max-w-2xl">
        <ErrorMessage message={error.message} onRetry={() => refetch()} />
      </div>
    );
  }

  // 3. (체크리스트) 데이터 렌더링
  if (lp) {
    // (신규) 이 LP의 소유자 여부 확인
    const isOwner = user?.id === lp.authorld; // (user.id는 실제 user 객체 구조에 맞춰야 함)

    // (신규) 업로드 시간 계산 (예: "1일 전")
    // (실제 구현에서는 'date-fns' 라이브러리 사용을 권장합니다)
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

    return (
      <div className="container mx-auto max-w-3xl bg-white dark:bg-gray-800 p-4 sm:p-8 rounded-lg shadow-md">
        {/* --- (수정) 헤더 --- */}
        <div className="flex justify-between items-start mb-4">
          {/* (신규) 업로더 정보 (사진 참고) */}
          <div className="flex items-center gap-3">
            <UploaderAvatar />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {/* TODO: lp.authorName 또는 lp.uploader.name 등
                  실제 API에서 오는 업로더 이름으로 변경해야 합니다.
                  지금은 "오타니안"으로 임시 대체합니다.
                */}
                오타니안
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {timeAgo(lp.createdAt)} {/* (수정) Uploade -> 시간 */}
              </p>
            </div>
          </div>

          {/* (체크리스트) 수정/삭제 버튼 */}
          {isOwner && (
            <div className="flex space-x-2">
              <button className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600">
                <EditIcon /> 
              </button>
              <button className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700">
                <DeleteIcon /> 
              </button>
            </div>
          )}
        </div>

        {/* --- (수정) 본문 --- */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          {lp.title}
        </h1>

        {/* (신규) 돌아가는 CD 이미지 (사진 참고) */}
        <div className="flex justify-center items-center my-8">
          <div className="w-64 h-64 sm:w-80 sm:h-80 relative">
            {/* CD 이미지 (느리게 회전) */}
            <img
              src={lp.thumbnail}
              alt={lp.title}
              // (신규) animate-spin-slow 클래스 추가 (index.css에 정의 필요)
              className="w-full h-full rounded-full object-cover animate-spin-slow"
            />
            {/* CD 가운데 구멍 */}
            <div className="absolute top-1/2 left-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-gray-800 dark:bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 border-4 border-gray-500"></div>
          </div>
        </div>


        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 mb-6">
          {/* (수정) 사진의 예시 텍스트로 임시 대체 */}
          <p>
            "{lp.content}" is a German word that translates to "overman" or "superman".
            It can refer to a philosophical concept or to an album by the South Korean
            singer G-Dragon.
          </p>
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

        {/* 6. (체크리스트) 좋아요 버튼 */}
        <div className="flex items-center justify-center gap-2"> {/* (수정) 중앙 정렬 */}
          <button className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-full hover:bg-red-200 dark:hover:bg-red-800 transition-colors">
            <LikeIcon />
            <span className="font-bold">{lp.likes.length}</span>
          </button>
        </div>
      </div>
    );
  }

  return null; // 데이터가 없는 경우
};

export default LpDetailPage;

