import { useEffect } from "react";
import type { Movie } from "../types/movie";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const fallbackImage = "http://via.placeholder.com/640x480";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleImdbSearch = () => {
    window.open(`https://www.imdb.com/find?q=${movie.title}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl animate-fadeIn">
        

        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">

          <div className="h-80 w-full md:h-auto md:w-1/2">
            <img
              src={
                movie.poster_path
                  ? `${imageBaseUrl}${movie.poster_path}`
                  : fallbackImage
              }
              alt={movie.title}
              className="h-full w-full object-cover"
            />
          </div>


          <div className="flex w-full flex-col justify-between p-6 md:w-1/2">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-gray-800">
                {movie.title}
              </h2>
              <div className="mb-4 flex flex-wrap gap-2 text-sm text-gray-600">
                <span className="rounded bg-gray-100 px-2 py-1">
                  {movie.release_date}
                </span>
                <span className="rounded bg-gray-100 px-2 py-1">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="rounded bg-gray-100 px-2 py-1 uppercase">
                  {movie.original_language}
                </span>
              </div>
              <p className="text-gray-700 line-clamp-6">
                {movie.overview}
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleImdbSearch}
                className="flex-1 rounded-lg bg-yellow-400 px-4 py-2 font-bold text-black hover:bg-yellow-500 transition-colors"
              >
                IMDB 검색
              </button>
              <button
                onClick={onClose}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;