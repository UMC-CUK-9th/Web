import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import type { MovieDetail, CreditsResponse, Crew } from '../types/movie';
import { LoadingSpinner } from '../components/LoadingSpinner';

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<CreditsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [movieResponse, creditsResponse] = await Promise.all([
          axios.get<MovieDetail>(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`, {
            headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
          }),
          axios.get<CreditsResponse>(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`, {
            headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
          }),
        ]);

        setMovie(movieResponse.data);
        setCredits(creditsResponse.data);
      } catch (err) {
        setError('영화 정보를 불러오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieData();
  }, [movieId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !movie) {
    return <div className="text-center text-red-500 text-xl mt-10">{error || "영화 정보를 찾을 수 없습니다."}</div>;
  }

  const directors = credits?.crew.filter((person: Crew) => person.job === 'Director') || [];
  const allActors = credits?.cast || [];

  const combinedCredits = [
    ...directors.map(person => ({
      id: person.id,
      name: person.name,
      profile_path: person.profile_path,
      role: '감독' 
    })),
    ...allActors.map(person => ({
      id: person.id,
      name: person.name,
      profile_path: person.profile_path,
      role: person.character 
    }))
  ];



  return (
    <div className="bg-black text-white min-h-screen">
      <div
        className="relative h-[70vh] md:h-[80vh] bg-cover bg-center flex items-end p-8 md:p-16"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">{movie.title}</h1>
          <div className="flex items-center gap-4 text-lg md:text-xl text-gray-300 mt-4">
            <span className="flex items-center gap-1"><span className="text-yellow-400">★</span> {movie.vote_average.toFixed(1)}</span>
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <span>{movie.runtime}분</span>
          </div>
          <p className="mt-6 text-base md:text-lg text-gray-200 leading-relaxed max-w-2xl line-clamp-4">{movie.overview}</p>
        </div>
      </div>

      <div className="p-8 md:p-16 bg-zinc-900">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">감독 및 출연진</h2>
        
  
        {combinedCredits.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-x-4 gap-y-8">
            {combinedCredits.map((person) => (
              <div key={`${person.id}-${person.role}`} className="text-center"> 
                <img
                  src={person.profile_path ? `https://image.tmdb.org/t/p/w200${person.profile_path}` : 'https://via.placeholder.com/200x300?text=No+Image'}
                  alt={person.name}
                  className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover mx-auto border-2 border-gray-700 hover:scale-105 transition-transform duration-300"
                />
                <p className="mt-3 font-semibold text-lg">{person.name}</p>
                <p className="text-sm text-gray-400 line-clamp-1"> 
                  {person.role === '감독' ? <span className="font-bold text-gray-200">{person.role}</span> : person.role}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">None</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;