import { useCallback, useMemo, useState } from "react";
import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList";
import MovieModal from "../components/MovieModal";
import useFetch from "../hooks/useFetch";
import type { MovieFilters, MovieResponse, Movie } from "../types/movie";

export default function HomePage() {
  const [filters, setFilters] = useState<MovieFilters>({
    query: "어벤져스",
    include_adult: false,
    language: "ko-KR",
  });


  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const axiosRequestConfig = useMemo(
    () => ({
      params: filters,
    }),
    [filters]
  );

  const { data, error, isLoading } = useFetch<MovieResponse>(
    "/search/movie",
    axiosRequestConfig
  );

  const handleMovieFilters = useCallback((newFilters: MovieFilters) => {
    setFilters(newFilters);
  }, []);


  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };


  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">영화 검색</h1>
      
      <MovieFilter onChange={handleMovieFilters} />
      
      <div className="mt-8">
        {isLoading ? (
          <div className="text-center py-20 text-gray-500">로딩 중...</div>
        ) : (
          <MovieList 
            movies={data?.results || []} 
            onMovieClick={handleMovieClick} 
          />
        )}
      </div>


      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}