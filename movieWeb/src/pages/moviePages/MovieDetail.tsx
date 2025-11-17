import { useMemo } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/common/Loading";
import { fetchMovieData } from "../../services/fetchMovieDetail";
import type { MovieDetailType, PersonType, Genre } from "../../types/movieDetail";
import { useCustomFetch } from "../../hooks/useCustomFetch";

const MovieDetail = () => {
  const { movieId } = useParams();

  const { data, isLoading, error } = useCustomFetch(
    () => {
      if (!movieId) throw new Error("영화 ID가 없습니다.");
      return fetchMovieData(movieId);
    },
    [movieId]
  );

  const movie: MovieDetailType | null = data?.detail || null;
  const people: PersonType[] = useMemo(() => {
    if (!data?.credits) return [];
    
    const combined = [...data.credits.crew, ...data.credits.cast];
    const uniquePeople = Array.from(
      new Map(combined.map((p) => [p.id, p])).values()
    );
    
    return uniquePeople;
  }, [data]);

  if (isLoading) return <Loading />;
  if (error)
    return <div className="flex justify-center items-center mt-20 text-red-500">{error}</div>;
  if (!movie) return null;

  return (
    <div className="max-w-5xl mx-auto my-12 px-4">
      {/* 영화정보 */}
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg shadow-lg max-w-[300px]"
        />
        <div>
          <h1 className="text-3xl font-bold mb-3">{movie.title}</h1>
          <p className="text-gray-700 mb-4">{movie.overview}</p>
          <p className="text-sm text-gray-500">
            개봉일: {movie.release_date} | 상영시간: {movie.runtime}분
          </p>
          <div className="mt-2">
            {movie.genres?.map((g: Genre) => (
              <span key={g.id} className="mr-2 text-purple-500">
                #{g.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 감독/출연 */}
      {people.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-6">감독/출연</h2>

          <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
            {people
              .filter((p) => p.profile_path)
              .map((p) => (
                <li key={`${p.id}-${p.name}`} className="flex flex-col items-center">
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${p.profile_path}`}
                    alt={p.name}
                    className="rounded-full shadow-md mb-2 w-24 h-24 object-cover"
                  />
                  <p className="font-medium text-sm text-center line-clamp-1">
                    {p.name}
                  </p>
                  {p.character && (
                    <p className="text-xs text-gray-400 line-clamp-1">{p.character}</p>
                  )}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;