import type { Movie } from "../types/movie";

type Props = {
  movie: Movie | null;
  onClose: () => void;
};

const MovieModal = ({ movie, onClose }: Props) => {
  if (!movie) return null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
    : "";

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
    : "";

  const imdbUrl = `https://www.imdb.com/find?q=${encodeURIComponent(
    movie.title
  )}`;

  const maxPopularity = 2000;

  const popularityPercent = Math.min(
    Math.round((movie.popularity / maxPopularity) * 100),
    100
  );


  return (
    <div
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-[800px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 배경포스터, 제목 */}
        <div className="relative w-full h-72 overflow-hidden rounded-t-2xl bg-black">
          {backdropUrl ? (
            <img
              src={backdropUrl}
              alt={movie.title}
              className="w-full h-full object-cover opacity-90"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              No Image
            </div>
          )}

          {/* 제목들*/}
          <div className="absolute bottom-4 left-6 text-white drop-shadow-xl">
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <p className="text-sm opacity-80">{movie.original_title}</p>
          </div>
        </div>

        {/* 닫기 버튼 */}
        <button
          className="absolute top-4 right-4 text-white text-2xl font-bold"
          onClick={onClose}
        >
          ✕
        </button>

        {/* 본문 */}
        <div className="p-6 flex gap-6">

          {/* 포스터 */}
          <div className="w-2/5 flex justify-center">
            {posterUrl ? (
              <img
                src={posterUrl}
                className="w-60 h-auto object-contain object-top"
                alt={movie.title}
              />
            ) : (
              <div className="w-60 h-auto bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
                No Poster
              </div>
            )}
          </div>

          {/* 본문 */}
          <div className="w-3/5 flex flex-col items-center text-center">

            {/* 점수*/}
            <div className="w-full text-left mb-4">
              <p className="text-blue-600 font-bold text-xl">
                {movie.vote_average.toFixed(1)}
                <span className="text-gray-500 text-sm ml-2">
                  ({movie.vote_count} 평가)
                </span>
              </p>
            </div>

            {/* 개봉일 */}
            <span className="mt-6 font-semibold text-gray-900">개봉일</span> 
            <p className="text-gray-700 text-sm leading-6 mt-1 px-3">{movie.release_date}</p>


            {/* 인기도 바 */}
            <div className="w-full text-center mt-4">
              <p className="text-gray-700 font-semibold mb-1">인기도</p>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-500 h-4 rounded-full transition-all"
                  style={{ width: `${popularityPercent}%` }}
                ></div>
              </div>
              <p className="text-gray-500 text-sm mt-1">{popularityPercent}%</p>
            </div>

            {/* 줄거리 */}
            <h3 className="mt-6 font-semibold text-gray-900">줄거리</h3>
            <p className="text-gray-700 text-sm leading-6 mt-1 px-3">
              {movie.overview || "줄거리가 제공되지 않았습니다."}
            </p>

            {/* 버튼들 */}
            <div className="flex gap-4 mt-6 w-full justify-start">

              <a
                href={imdbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                IMDb에서 검색
              </a>

              <button
                onClick={onClose}
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white  "
              >
                닫기
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
