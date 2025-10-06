import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LoadingSpinner } from "../component/LoadingSpinner";
import type { MovieDetail, CreditsResponse, Cast, Crew } from "../types/movie";

export default function MovieDetailPage(): JSX.Element {
    const { movieId } = useParams<{ movieId: string }>();

    // 영화 상세 정보와 출연진 정보를 함께 관리
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [credits, setCredits] = useState<CreditsResponse | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (!movieId) return;

        const fetchMovieData = async () => {
            try {
        setIsPending(true);
        setIsError(false);
        
        const apiKey = import.meta.env.VITE_TMDB_KEY;
        const baseUrl = "https://api.themoviedb.org/3/movie/";
        const options = {
          headers: {
            Authorization: `Bearer ${apiKey}`
          }
        };

        const [detailResponse, creditsResponse] = await Promise.all([
          axios.get(`${baseUrl}${movieId}?language=ko-KR`, options),
          axios.get(`${baseUrl}${movieId}/credits?language=ko-KR`, options)
        ]);

        setMovie(detailResponse.data);
        setCredits(creditsResponse.data);

      } catch (error) {
        console.error("Failed to fetch movie data:", error);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
        };

        fetchMovieData();
    }, [movieId]);

    if (isPending) {
        return (
            <div className="flex items-center justify-center h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="text-red-500 text-2xl">
                    정보를 불러오는 데 실패했습니다. ㅠㅠ
                </span>
            </div>
        );
    }
    
    if (!movie || !credits) {
        return <></>;
    }
    
    const director = credits.crew.find((person: Crew) => person.job === "Director");

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            {/* 배경 이미지 */}
            <div 
                className="w-full h-[50vh] bg-cover bg-center"
                style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`}}
            >
                <div className="w-full h-full bg-black/60 backdrop-blur-sm" />
            </div>

            <div className="container mx-auto px-4 py-8 md:px-8 -mt-32">
                {/* 영화 정보 */}
                <div className="relative flex flex-col md:flex-row gap-8">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={`${movie.title} 포스터`}
                        className="w-64 rounded-lg shadow-2xl self-center md:self-start"
                    />
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold">{movie.title}</h1>
                        <p className="text-lg italic text-gray-400 mt-1">{movie.tagline}</p>
                        <div className="flex items-center gap-4 mt-4 text-gray-300">
                            <span>★ {movie.vote_average.toFixed(1)}</span>
                            <span>|</span>
                            <span>{movie.release_date}</span>
                            <span>|</span>
                            <span>{movie.runtime}분</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {movie.genres.map(genre => (
                                <span key={genre.id} className="px-3 py-1 bg-gray-700 rounded-full text-sm">{genre.name}</span>
                            ))}
                        </div>
                        <h2 className="text-2xl font-semibold mt-6 mb-2">줄거리</h2>
                        <p className="leading-relaxed text-gray-300">{movie.overview}</p>
                        {director && (
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold">감독</h3>
                                <p className="text-lg text-gray-300">{director.name}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* 출연진 정보 */}
                <div className="mt-12">
                    <h2 className="text-3xl font-bold mb-6 border-l-4 border-[#b2dab1] pl-4">
                        주요 출연진
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {credits.cast.slice(0, 12).map((actor: Cast) => (
                            <div key={actor.id} className="text-center">
                                <img
                                    src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : 'https://via.placeholder.com/185x278.png?text=No+Image'}
                                    alt={actor.name}
                                    className="rounded-lg shadow-lg mb-2 mx-auto w-full h-auto object-cover"
                                />
                                <p className="font-semibold">{actor.name}</p>
                                <p className="text-sm text-gray-400">{actor.character}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}