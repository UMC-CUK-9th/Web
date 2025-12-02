import { useState, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import type{ MovieResponse, MovieFilters, Movie } from "../types/movie";
import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList";
import MovieDetailModal from "../components/MovieDetailModal"; // 💡 새로 임포트

export default function HomePage(): Element {
  const [filters, setFilters] = useState<MovieFilters>({
    query: "어벤져스",
    include_adult: false,
    language: "ko-KR",
  });
  
  // 💡 선택된 영화의 상세 정보를 저장할 상태를 추가합니다.
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const options = useMemo(() => ({
    params: filters,
  }), [filters]);

  const { data, error, isLoading } = useFetch<MovieResponse>("/search/movie", options);

  if (error) {
    return <div>{error}</div>;
  }
  
  // 💡 모달을 닫는 핸들러
  const handleCloseModal = () => {
    setSelectedMovie(null);
  }

  return (
    <div className="container p-4 mx-auto max-w-7xl">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">영화 검색기</h1>
      
      {/* 💡 MovieFilter는 그대로 사용 */}
      <MovieFilter onChange={setFilters} />
      
      {isLoading ? (
        <div className="flex justify-center items-center h-60 text-xl text-gray-500">
          ...로딩 중입니다...
        </div>
      ) : (
        // 💡 MovieList에 영화 클릭 핸들러를 전달합니다.
        <MovieList movies={data?.results || []} onMovieClick={setSelectedMovie} />
      )}
      
      {/* 💡 selectedMovie 상태에 따라 모달을 렌더링합니다. */}
      {selectedMovie && (
        <MovieDetailModal 
          movie={selectedMovie} 
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}