import { useEffect, useState } from "react";
import type { Movie, MovieResponse } from "../types/movie";
import axios from "axios";
import MoviePoster from "../components/moviePoster";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";

const MoviesPage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const params = useParams();
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        setPage(1);
    },[params.movie])

    useEffect(()=>{
        const fetchMovies = async () => {
            setIsLoading(true);
            try{
                const { data } = await axios.get<MovieResponse>(
                `https://api.themoviedb.org/3/movie/${params.movie}?language=ko-KR&page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_KEY}`,
                    },
                }
                );

                setMovies(data.results);
            }catch{
                <p className="text-red-500">에러가 발생했습니다.</p>
            }finally{
                setIsLoading(false);
            }
        }

        fetchMovies();
    }, [params.movie,page]);

    console.log(movies);

    return (
        <div className="w-screen flex items-center justify-center flex-col">
            <div className="flex items-center justify-center gap-3">
                <button className="w-15 h-12 rounded-xl bg-green-300 text-white disabled:bg-gray-300"
                    onClick={()=>setPage((prev)=>prev-1)}
                    disabled={page===1}>{'<'}</button>
                <p>{page} 페이지</p>
                <button className="w-15 h-12 rounded-xl bg-pink-300 text-white"
                    onClick={()=>setPage((prev)=>prev+1)}>{'>'}</button>
            </div>
            {isLoading && <LoadingSpinner/>}
            {!isLoading && (
                <div className="p-10 grid grid-cols-2 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-2 w-full">
                    {movies.map((movie) => (
                        <MoviePoster movie={movie} /> 
                    ))}
                </div>
            )
            }   
        </div>
    );

};

export default MoviesPage;