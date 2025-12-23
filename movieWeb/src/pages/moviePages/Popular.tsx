import { useCallback, useMemo, useState } from "react";
import type { Movie } from "../../types/movie";
import { fetchMovies, searchMovies } from "../../services/fetchMovies";
import { useCustomFetch } from "../../hooks/useCustomFetch";
import Loading from "../../components/common/Loading";
import ErrorFallback from "../../components/common/ErrorFallBack";
import MovieModal from "../../components/MovieModal";
import MovieSearchForm from "../../components/MovieSearchForm";
import Pagination from "../../components/Pagination";
import MovieGrid from "../../components/MovieGrid";

const Popular = () => {
  const [page, setPage] = useState(1);

  // 폼 값
  const [searchTerm, setSearchTerm] = useState("");
  const [formIncludeAdult, setFormIncludeAdult] = useState(false);
  const [formLanguage, setFormLanguage] = useState("ko-KR");

  // 실제 적용 값
  const [query, setQuery] = useState("");
  const [includeAdult, setIncludeAdult] = useState(false);
  const [language, setLanguage] = useState("ko-KR");
  const [isSearching, setIsSearching] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // API 호출 함수: useCallback으로 고정
  const getMovies = useCallback(() => {
    return isSearching
      ? searchMovies(query, page, language, includeAdult)
      : fetchMovies("popular", page, language);
  }, [isSearching, query, page, language, includeAdult]);

  const { data: movies, isLoading, error } = useCustomFetch<Movie[]>(
    getMovies,
    [getMovies]
  );

  
  const moviesToRender = useMemo(() => movies ?? [], [movies]); //렌더 시마다 새 배열만들기 방지



  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = searchTerm.trim();

      if (!trimmed) {
        setIsSearching(false);
        setQuery("");
      } else {
        setIsSearching(true);
        setQuery(trimmed);
      }

      setIncludeAdult(formIncludeAdult);
      setLanguage(formLanguage);
      setPage(1);
    },
    [searchTerm, formIncludeAdult, formLanguage]
  );

  const handleReset = useCallback(() => {
    setSearchTerm("");
    setFormIncludeAdult(false);
    setFormLanguage("ko-KR");

    setQuery("");
    setIncludeAdult(false);
    setLanguage("ko-KR");
    setIsSearching(false);
    setPage(1);
  }, []);

  const handlePrevPage = useCallback(() => {
    setPage((p) => Math.max(p - 1, 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setPage((p) => p + 1);
  }, []);

  const handleSelectMovie = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedMovie(null);
  }, []);

  return (
    <div className="px-10 py-6">
      {/* 검색 폼 */}
      <MovieSearchForm
        searchTerm={searchTerm}
        formIncludeAdult={formIncludeAdult}
        formLanguage={formLanguage}
        isSearching={isSearching}
        onChangeSearchTerm={setSearchTerm}
        onChangeIncludeAdult={setFormIncludeAdult}
        onChangeLanguage={setFormLanguage}
        onSubmit={handleSearch}
        onReset={handleReset}
      />

      {/* 로딩 / 에러 */}
      {isLoading && <Loading />}
      {error && <ErrorFallback error={error} />}

      {/* 페이지네이션 */}
      <Pagination page={page} onPrev={handlePrevPage} onNext={handleNextPage} />

      {/* 영화 리스트 */}
      {moviesToRender.length > 0 && (
        <MovieGrid movies={moviesToRender} onSelect={handleSelectMovie} />
      )}

      {/* 모달 */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Popular;
