import { useParams } from "react-router-dom";
import axios from "axios";
import { LoadingSpinner } from "../component/LoadingSpinner";
import type { MovieDetail, CreditsResponse, Crew } from "../types/movie";
import { useAsync } from "../hooks/useAsync"; // 훅 임포트
import { useCallback } from "react";

export default function MovieDetailPage(): JSX.Element {
  // ... (useParams는 그대로)

  const getMovieData = useCallback(() => {
    const accessToken = import.meta.env.VITE_TMDB_KEY;
    const baseUrl = "https://api.themoviedb.org/3/movie/";

    // 각 요청에 headers를 추가합니다.
    const detailPromise = axios.get(`${baseUrl}${movieId}?language=ko-KR`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const creditsPromise = axios.get(`${baseUrl}${movieId}/credits?language=ko-KR`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return Promise.all([detailPromise, creditsPromise]).then(([detailRes, creditsRes]) => ({
      details: detailRes.data as MovieDetail,
      credits: creditsRes.data as CreditsResponse,
    }));
  }, [movieId]);

  // 훅 호출!
  const { data, isPending, isError } = useAsync(getMovieData, [movieId]);
  const movie = data?.details;
  const credits = data?.credits;
  
  // 로딩 및 에러 UI는 기존과 동일하게 처리
  if (isPending) { /* ... */ }
  if (isError || !movie || !credits) { /* ... */ }

  const director = credits.crew.find((person: Crew) => person.job === "Director");

  // UI 디자인 & 데이터 시각화 (Tailwind CSS 활용)
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* ... 기존 MovieDetailPage의 JSX 렌더링 부분 ... */}
      {/* 기존 코드와 동일하게 JSX를 여기에 붙여넣으면 됩니다. */}
      {/* 로직이 분리되었기 때문에 이 부분의 디자인을 자유롭게 꾸미면 됩니다! */}
    </div>
  );
}