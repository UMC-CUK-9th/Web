import { useEffect, useState } from "react"
import axios from "axios";
import type{ Movie, MovieResponse } from "../types/movie";
import MovieCard from "../component/MovieCard";
import { LoadingSpinner } from "../component/LoadingSpinner";
import { useParams } from "react-router-dom";

// JSX를 반환하는 함수의 타입은 Element보다 JSX.Element를 권장합니다.
export default function MoviePage(): JSX.Element {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);
    const [page, setPage] = useState(1);

    const { category } = useParams<{
        category: string;
    }>();

    // 💡 1. 카테고리가 변경될 때 페이지 번호를 1로 초기화하는 로직 추가
    // 이렇게 하면 '인기 영화' 3페이지를 보다가 '상영 중'을 누르면 1페이지부터 시작됩니다.
    useEffect(() => {
        setPage(1);
    }, [category]);


    useEffect((): void => {
        // category가 주소에 없을 경우를 대비
        if (!category) return;

        const fetchMovies = async (): Promise<void> => {
            setIsPending(true);
            setIsError(false); // 요청 시작 시 에러 상태 초기화
            try {
                const { data } = await axios.get<MovieResponse>(
                    // API 경로를 'movie' (단수형)으로 수정했습니다. TMDB API 공식 경로는 단수형입니다.
                    `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                    }
                );
                setMovies(data.results);
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };
        fetchMovies();
    // 💡 2. 의존성 배열에 category를 추가합니다.
    // 이제 page 또는 category가 바뀔 때마다 이 코드가 다시 실행됩니다.
    }, [page, category]);

    if (isError) {
        return (
            <div className="flex items-center justify-center p-10">
                <span className="text-red-500 text-2xl">에러가 발생했습니다 ㅠㅠ</span>
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center justify-center gap-6 mt-5">
                <button
                    className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    disabled={page === 1}
                    onClick={(): void => setPage((prev): number => prev - 1)}>
                    {`<`}
                </button>
                <span>{page}페이지</span>
                <button
                    className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-all duration-200"
                    onClick={(): void => setPage((prev): number => prev + 1)}>
                    {`>`}
                </button>
            </div>
            {isPending && (
                <div className="flex items-center justify-center" style={{height: '70vh'}}>
                    <LoadingSpinner />
                </div>)
            }
            {!isPending && (
                <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {movies.map((movie) => (<MovieCard key={movie.id} movie={movie} />))}
                </div>
            )}
        </>
    );
}
