import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../component/MovieCard";
import { LoadingSpinner } from "../component/LoadingSpinner";
import { useAsync } from "../hooks/useAsync";

export default function MoviePage(): JSX.Element {
  const { category = 'popular' } = useParams<{ category: string }>();
  const [page, setPage] = useState(1);

  // 카테고리가 바뀌면 페이지를 1로 리셋합니다.
  useEffect(() => {
    setPage(1);
  }, [category]);
  
  // 커스텀 훅을 사용해 API를 호출합니다.
  const { data: movieResponse, isPending, isError } = useAsync<MovieResponse>(() => {
    const accessToken = import.meta.env.VITE_TMDB_KEY;
    return axios.get(
      `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then(res => res.data);
  }, [category, page]);

  // 에러가 발생했을 때 보여줄 UI입니다.
  if (isError) {
    return (
      <div className="flex items-center justify-center p-10">
        <span className="text-red-500 text-2xl">에러가 발생했습니다 ㅠㅠ</span>
      </div>
    );
  }

  // 로딩 중일 때와 데이터가 있을 때 보여줄 UI입니다.
  return (
    <>
      <div className="flex items-center justify-center gap-6 mt-5">
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          {`<`}
        </button>
        <span>{page}페이지</span>
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-all duration-200"
          onClick={() => setPage((prev) => prev + 1)}
        >
          {`>`}
        </button>
      </div>
      
      {isPending && (
        <div className="flex items-center justify-center" style={{ height: '70vh' }}>
          <LoadingSpinner />
        </div>
      )}

      {!isPending && movieResponse && (
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movieResponse.results.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}