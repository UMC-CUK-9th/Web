import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useCustomFetch } from "../hooks/useCustomFetch";
import type { MovieDetail, Credits } from "../types/movie";

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();

  // 두 가지 데이터 fetch
  const {
    data: movie,
    isPending: isMoviePending,
    isError: isMovieError,
  } = useCustomFetch<MovieDetail>(
    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
    [movieId]
  );

  const {
    data: credits,
    isPending: isCreditPending,
    isError: isCreditError,
  } = useCustomFetch<Credits>(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
    [movieId]
  );

  // 에러 처리
  if (isMovieError || isCreditError) {
    return (
      <div className="flex items-center justify-center h-dvh text-red-500 text-2xl">
        에러가 발생했습니다
      </div>
    );
  }

  // 로딩 처리
  if (isMoviePending || isCreditPending || !movie || !credits) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }

  // 실제 페이지 렌더링
  return (
    <div className="bg-black text-white min-h-screen">
      {/* 백드롭 영역 */}
      <div className="relative w-full h-[400px]">
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

        <div className="absolute top-8 left-8 text-white max-w-xl text-left">
          <h1 className="text-3xl sm:text-4xl font-bold">{movie.title}</h1>
          <div className="mt-3 text-gray-300">
            <p>평점 {movie.vote_average}</p>
            <p>개봉일 {movie.release_date}</p>
          </div>
          {movie.tagline && (
            <p className="mt-4 text-xl sm:text-2xl font-semibold italic text-gray-200">
              {movie.tagline}
            </p>
          )}
          <p className="mt-4 leading-relaxed text-sm sm:text-base">
            {movie.overview}
          </p>
        </div>
      </div>

      {/* 출연진 */}
      <div className="px-8 py-6">
        <h2 className="text-2xl font-semibold mb-4">감독 / 출연</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
          {credits.cast.slice(0, 12).map((actor) => (
            <div key={actor.cast_id} className="flex flex-col items-center">
              <img
                className="rounded-full w-24 h-24 object-cover border border-gray-700"
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : "https://via.placeholder.com/100x100?text=No+Image"
                }
                alt={actor.name}
              />
              <p className="mt-2 text-sm font-medium">{actor.name}</p>
              <p className="text-xs text-gray-400">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
