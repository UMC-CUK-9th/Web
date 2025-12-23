import type{ Movie } from "../types/movie";
import type{ ReactElement } from "react";

interface MovieCardProps {
  movie: Movie;
  // 💡 클릭 이벤트 핸들러 추가
  onMovieClick: (movie: Movie) => void;
}

// 💡 Props에 onMovieClick을 받도록 변경
const MovieCard = ({ movie, onMovieClick }: MovieCardProps): ReactElement => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  // NOTE: 플레이스홀더 이미지 URL을 사용합니다.
  const fallbackImageImage = "https://placehold.co/640x480/cccccc/333333?text=Poster+Not+Found"; 

  // 💡 카드 클릭 시 onMovieClick 호출
  const handleClick = () => {
    onMovieClick(movie);
  };

  return (
    // 💡 onClick 이벤트 핸들러 추가
    <div 
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
      onClick={handleClick}
    >
      <div className="relative h-80 overflow-hidden">
        <img
          src={
            movie.poster_path
              ? `${imageBaseUrl}${movie.poster_path}`
              : fallbackImageImage
          }
          alt={`${movie.title} 포스터`}
          className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
        {/* 💡 평점 표시 (Top Right) */}
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
          {movie.vote_average.toFixed(1)}
        </div>
      </div>
      
      {/* 💡 Movie Info Block (이전 단계에서 포함된 내용) */}
      <div className="p-4">
        <h3 className="mb-2 text-lg font-bold text-gray-800">{movie.title}</h3>
        <p className="text-sm text-gray-600">
          {movie.release_date} | {movie.original_language.toUpperCase()}
        </p>
        <p className="mt-2 text-sm text-gray-700 h-16 overflow-hidden"> {/* 높이 제한 추가 */}
          {movie.overview.length > 100
            ? `${movie.overview.slice(0, 100)}...`
            : movie.overview}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;