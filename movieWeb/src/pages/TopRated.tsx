import { useEffect, useState } from "react";
import type { Movie } from "../types/movie";
import { fetchMovies } from "../services/FetchMovies";

const TopRated = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const results = await fetchMovies("top_rated");
        setMovies(results);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96 text-red-500 font-bold">
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

export default TopRated;
