import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import type { MovieDetailResponse } from "../types/movieDetail";
import type { Credits } from "../types/credit";
import People from "../components/people";
import useCustomFetch from "../hooks/useCustomFetch";

const MovieDetailPage = () => {
    const params = useParams();

    const movieUrl=`https://api.themoviedb.org/3/movie/${params.movieId}`;
    const {data: movieData, isLoading: movieIsLoading, isError: movieIsError}=useCustomFetch<MovieDetailResponse>(movieUrl);
    
    const peopleUrl=`https://api.themoviedb.org/3/movie/${params.movieId}/credits`;
    const {data: peopleData, isLoading: peopleIsLoading, isError: peopleIsError}=useCustomFetch<Credits>(peopleUrl);

    if (movieIsError || peopleIsError) return <p>에러가 발생했습니다.</p>
    return (
        <div className="bg-black text-white w-full min-h-screen p-5">
            {movieIsLoading && <LoadingSpinner />}
            {!movieIsLoading && (
                <div className="relative">
                    <img src={`https://image.tmdb.org/t/p/original${movieData?.backdrop_path}`}
                        className="object-cover w-full h-100 rounded-xl "/>
                    <div className="absolute top-0 left-0 p-3 h-100 bg-gradient-to-r from-black to-transparent [--tw-gradient-from-position:40%]">
                        <h1 className="text-4xl mb-3">{movieData?.title}</h1>
                        <p>평균 {movieData?.vote_average}</p>
                        <p>{movieData?.release_date.slice(0,4)}</p>
                        <p>{movieData?.runtime}분</p>
                        <p className="text-xl mt-2 mb-3 italic">{movieData?.tagline}</p>
                        <p className="text-xs w-120">{movieData?.overview}</p>
                    </div>
                </div>
            )}
            <h1 className="text-2xl mt-2 mb-4 font-bold">감독/출연</h1>
            {peopleIsLoading && <LoadingSpinner/>}
            {!peopleIsLoading && (
                <div className=' grid gap-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10'>
                    {peopleData?.cast.map((people) => (<People people={people} />))}
                </div>
            )}
        </div>
    );

};

export default MovieDetailPage;