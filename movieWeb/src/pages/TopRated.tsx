import { useEffect, useState } from "react";
import type { Movie } from "../types/movie";
import { fetchMovies } from "../services/FetchMovies";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const TopRated = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const results = await fetchMovies("top_rated", page);
        setMovies(results);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err: unknown) {
        setError("에러가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, [page]); 


  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center mt-20 text-red-500">
        {error}
      </div>
    );
  }


  return (
    <div>
      <div className="flex justify-center gap-4 my-8">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-purple-300 text-white hover:bg-purple-400"
          }`}
        >
          &lt;
        </button>

        <span className="px-4 py-2">{page} 페이지</span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 rounded bg-purple-300 text-white hover:bg-purple-400"
        >
          &gt;
        </button>
      </div>

      <ul className="grid grid-cols-5 gap-4 mx-20 my-12">
        {movies?.map((movie) => (
          <li key={movie.id} className="relative group">
            <Link to={`/movies/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="rounded-md transition duration-300 group-hover:blur-sm"
                alt={movie.title}
              />
              <div
                className="absolute inset-0 flex flex-col justify-center items-center text-center 
                            opacity-0 group-hover:opacity-100 transition duration-300 
                            bg-black/60 rounded-md p-2"
              >
                <h3 className="text-white text-sm font-bold mb-2">{movie.title}</h3>
                <p className="text-gray-200 text-xs line-clamp-5">{movie.overview}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopRated;
