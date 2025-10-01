import { useEffect, useState } from "react";
import type { Movie, MovieResponse } from "../types/movie";
import axios from "axios";
import MoviePoster from "../components/moviePoster";

const MoviesPage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(()=>{
        const fetchMovies = async () => {
        const { data } = await axios.get<MovieResponse>(
            'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1',
            {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_KEY}`,
            },
            }
        );
        setMovies(data.results);
        };

        fetchMovies();
    }, []);

    console.log(movies);

    return (
        <div className="w-screen flex justify-center items-center">
            <div className="p-10 grid grid-cols-2 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-2 w-full">
                {movies.map((movie) => (
                    <MoviePoster movie={movie} /> 
                ))}
            </div>
        </div>
    );

};

export default MoviesPage;