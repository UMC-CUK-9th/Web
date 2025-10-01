import { useState } from "react";
import type { Movie } from "../types/movie";

interface MoviePosterProps{
    movie:Movie;
}
const MoviePoster = ({movie}:MoviePosterProps) => {
    const [isHover, setIsHover] = useState<boolean>(false);

    console.log(movie);
    return (
        <div className="relative w-full h-full"
            onMouseEnter={()=>setIsHover(true)}
            onMouseLeave={()=>setIsHover(false)}>
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                className="w-full h-full object-cover rounded-xl"
            />
            {isHover && (
                <div className="absolute inset-0 w-full h-full p-3 rounded-xl bg-black/50 flex flex-col text-center items-center justify-center text-white backdrop-blur">
                <p className="font-bold">{movie.title}</p>
                <p className="line-clamp-4 text-xs">{movie.overview}</p>
            </div>)}
            
        </div>
    );

};

export default MoviePoster;