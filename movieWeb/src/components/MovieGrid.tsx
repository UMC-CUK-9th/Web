import React from "react";
import type { Movie } from "../types/movie";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const MovieGrid = ({ movies, onSelect }: MovieGridProps) => {
  return (
    <ul className="grid grid-cols-5 gap-4 mx-20 my-12">
      {movies.map((movie) => (
        <li
          key={movie.id}
          className="relative group cursor-pointer"
          onClick={() => onSelect(movie)}
        >
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
            <h3 className="text-white text-sm font-bold">{movie.title}</h3>
            <p className="text-gray-200 text-xs line-clamp-5">
              {movie.overview}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default React.memo(MovieGrid);
