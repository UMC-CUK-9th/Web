import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import type { MovieDetailResponse } from "../types/movieDetail";
import type { Cast, Credits } from "../types/credit";
import People from "../components/people";

const MovieDetailPage = () => {
    const [movie, setMovie] = useState<MovieDetailResponse>();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [people,setPeople]=useState<Cast[]>([])

    useEffect(()=>{
        const fetchMovies = async () => {
            setIsLoading(true);
            try{
                const { data } = await axios.get<MovieDetailResponse>(
                `https://api.themoviedb.org/3/movie/${params.movieId}?language=ko-KR`,
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_KEY}`,
                    },
                }
                );
                setMovie(data);

                const { data:creditData } = await axios.get<Credits>(
                    `https://api.themoviedb.org/3/movie/${params.movieId}/credits?language=en-US`,
                    {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_KEY}`,
                    },
                    }
                );
                setPeople(creditData.cast);

            }catch{
                <p className="text-red-500">에러가 발생했습니다.</p>
            }finally{
                setIsLoading(false);
            }
        }

        fetchMovies();
    }, [params.movieId]);

    console.log(movie);

    return (
        <div className="bg-black text-white w-full min-h-screen p-5">
            {isLoading && <LoadingSpinner />}
            {!isLoading && (
                <>
                    <div className="relative">
                        <img src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                            className="object-cover w-full h-100 rounded-xl "/>
                        <div className="absolute top-0 left-0 p-3 h-100 bg-gradient-to-r from-black to-transparent [--tw-gradient-from-position:40%]">
                            <h1 className="text-4xl mb-3">{movie?.title}</h1>
                            <p>평균 {movie?.vote_average}</p>
                            <p>{movie?.release_date.slice(0,4)}</p>
                            <p>{movie?.runtime}분</p>
                            <p className="text-xl mt-2 mb-3 italic">{movie?.tagline}</p>
                            <p className="text-xs w-120">{movie?.overview}</p>
                        </div>
                    </div>
                    <h1 className="text-2xl mt-2 mb-4 font-bold">감독/출연</h1>
                    <div className=' grid gap-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10'>
                        {people.map((people) => (
                                <People people={people} /> 
                        ))}
                    </div>
                </>
            )}
        </div>
    );

};

export default MovieDetailPage;