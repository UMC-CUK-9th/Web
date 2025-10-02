import { useEffect, useState } from "react";
import type { Movie } from "../types/movie";
import { fetchMovies } from "../services/FetchMovies";

const NowPlaying = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const results = await fetchMovies("now_playing");
        setMovies(results);
      } catch (err: unknown) {
        setError("에러가 발생했습니다.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-60">
        <div className="w-15 h-15 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center mt-20 text-red-500">
        {error}
      </div>
    );
  }


  return (
    <ul className="grid grid-cols-5 gap-4 mx-20 my-12">
      {movies?.map((movie) => (
        <li key={movie.id} className="relative group">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            className="rounded-md transition duration-300 group-hover:blur-sm"
            alt={movie.title}
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center 
                          opacity-0 group-hover:opacity-100 transition duration-300 
                          bg-black/60 rounded-md p-2">
            <h3 className="text-white text-sm font-bold mb-2">{movie.title}</h3>
            <p className="text-gray-200 text-xs line-clamp-5">{movie.overview}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NowPlaying;
