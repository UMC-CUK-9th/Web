import type{ Movie } from "../types/movie";
// import { X } from "lucide-react"; // 아이콘 라이브러리 (루시드 아이콘 사용) - 💡 삭제됨

interface MovieDetailModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieDetailModal = ({ movie, onClose }: MovieDetailModalProps): Element => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const backdropBaseUrl = "https://image.tmdb.org/t/p/w1280";
  const fallbackImageImage = "https://placehold.co/640x480/cccccc/333333?text=Poster+Not+Found"; 

  // 영화 상세 페이지 링크 (TMDB)
  const tmdbLink = `https://www.themoviedb.org/movie/${movie.id}`;
  
  return (
    // 1. 배경 (전체 화면 오버레이)
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
      onClick={onClose} // 배경 클릭 시 모달 닫기
    >
      
      {/* 2. 모달 컨텐츠 (배경 클릭이 전파되는 것을 막음) */}
      <div 
        className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full text-gray-600 hover:text-gray-900 transition shadow-md text-2xl leading-none" // 💡 텍스트 크기 조정
          aria-label="닫기"
        >
          {/* 💡 Lucide-React 아이콘 대신 유니코드 'MULTIPICATION SIGN' (×) 사용 */}
          &times; 
        </button>

        {/* 배경 이미지 (backdrop) */}
        <div className="h-64 sm:h-80 overflow-hidden rounded-t-xl relative">
          <img
            src={movie.backdrop_path ? `${backdropBaseUrl}${movie.backdrop_path}` : fallbackImageImage}
            alt={`${movie.title} 배경 이미지`}
            className="w-full h-full object-cover"
          />
          {/* 제목 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 flex flex-col justify-end">
             <h2 className="text-3xl font-extrabold text-white">
                {movie.title}
             </h2>
             <p className="text-sm text-white/80">{movie.original_title}</p>
          </div>
        </div>

        {/* 상세 정보 섹션 */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 포스터 및 평점 (1/3 너비) */}
          <div className="md:col-span-1 -mt-40 sm:-mt-52 md:-mt-40 z-[1]">
            <img
              src={movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : fallbackImageImage}
              alt={`${movie.title} 포스터`}
              className="w-full max-w-xs md:max-w-full rounded-xl shadow-2xl border-4 border-white"
            />
            <div className="mt-4 flex items-center justify-start">
                <span className="text-3xl font-bold text-blue-600 mr-2">
                    {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-500">({movie.vote_count}명 평가)</span>
            </div>
          </div>
          
          {/* 텍스트 정보 (2/3 너비) */}
          <div className="md:col-span-2 pt-0 md:pt-4">
            
            {/* 기본 정보 */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm font-semibold text-gray-700">개봉일</p>
                <p className="text-lg text-gray-900">{movie.release_date || '정보 없음'}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">원어/언어</p>
                <p className="text-lg text-gray-900">{movie.original_language.toUpperCase()}</p>
              </div>
            </div>

            {/* 줄거리 */}
            <h3 className="text-xl font-bold text-gray-800 mb-3">줄거리</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {movie.overview || '줄거리 정보가 없습니다.'}
            </p>

            {/* 버튼 */}
            <a 
              href={tmdbLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition duration-150 mr-4"
            >
              TMDB에서 자세히 보기
            </a>
            <button 
              onClick={onClose}
              className="px-6 py-3 font-semibold text-gray-800 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition duration-150"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailModal;