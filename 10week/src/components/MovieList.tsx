import type{ Movie } from "../types/movie";
import MovieCard from "./MovieCard"; // MovieCard 임포트 확인
import type{ ReactElement } from "react";

interface MovieListProps {
  movies: Movie[];
  // 💡 클릭 핸들러 Props 추가
  onMovieClick: (movie: Movie) => void; 
}

// 💡 Props에 onMovieClick을 받도록 변경
const MovieList = ({ movies, onMovieClick }: MovieListProps): ReactElement => {
  if (movies.length === 0) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="font-bold text-gray-500">검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
      {movies.map((movie) => (
        // 💡 MovieCard에 onMovieClick 핸들러 전달
        <MovieCard key={movie.id} movie={movie} onMovieClick={onMovieClick} />
      ))}
    </div>
  );
};

export default MovieList;