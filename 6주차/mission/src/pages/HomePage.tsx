// src/pages/HomePage.tsx

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useGetInfiniteLpList from "../hooks/useGetInfiniteLpList";
import LpCardSkeletonList from "../components/LpCardSkeletonList";
import ErrorDisplay from "../components/ErrorDisplay";

const HomePage = () => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const limit = 20;
  const search = "";

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetInfiniteLpList(limit, search, order);

  // 백엔드 응답 구조: lastPage.data.data 가 LP 배열이라고 가정
  const lpList =
    data?.pages.flatMap((page) => page.data.data ?? []) ?? [];

  // 무한 스크롤용 sentinel
  const observerRef = useRef<HTMLDivElement | null>(null);

  // 🔥 IntersectionObserver로 무한 스크롤 구현
  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (
          entry.isIntersecting && // sentinel이 화면에 보이고
          hasNextPage && // 다음 페이지가 있고
          !isFetchingNextPage && // 이미 다음 페이지 불러오는 중이 아니고
          !isLoading // 첫 로딩 중도 아니면
        ) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "0px 0px 200px 0px", // 밑에서 200px 남았을 때 미리 불러오기
        threshold: 0,
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, isLoading, fetchNextPage]);

  if (isError) {
    return <ErrorDisplay />;
  }

  return (
    <div className="p-8">
      {/* 정렬 버튼 */}
      <div className="flex justify-end items-center mb-4 ">
        <button
          onClick={() => setOrder("asc")}
          className={`px-3 py-1 rounded-md text-sm font-semibold cursor-pointer transition-colors duration-200 ${
            order === "asc"
              ? `bg-gray-700 text-white`
              : `bg-gray-200 text-gray-700`
          }`}
        >
          오래된순
        </button>

        <button
          onClick={() => setOrder("desc")}
          className={`ml-2 px-3 py-1 rounded-md text-sm font-semibold cursor-pointer transition-colors duration-200 ${
            order === "desc"
              ? `bg-gray-700 text-white`
              : `bg-gray-200 text-gray-700`
          }`}
        >
          최신순
        </button>
      </div>

      {/* ⬆️ 초기 로딩 스켈레톤 */}
      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <LpCardSkeletonList count={10} />
        </div>
      )}

      {/* 카드 리스트 */}
      {!isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {lpList.map((lp) => (
            <Link
              to={`/lp/${lp.id}`}
              key={lp.id}
              className="block relative group"
            >
              <img
                src={lp.thumbnail}
                alt="LP 이미지"
                className="w-full aspect-square rounded-lg object-cover group-hover:scale-110
              transition-transform duration-200"
              />

              <div
                className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-400 inset-0
            flex flex-col justify-center text-center text-white bg-black/70 scale-110 rounded-lg"
              >
                <h3 className="font-bold text-lg mb-1">{lp.title}</h3>
                <p>{lp.createdAt.toString()}</p>
                <p>{lp.likes.length}</p>
              </div>
            </Link>
          ))}

          {lpList.length === 0 && (
            <p className="text-sm text-gray-500 col-span-full">
              LP가 없습니다.
            </p>
          )}
        </div>
      )}

      {/* ⬇️ 다음 페이지 로딩 스켈레톤 (하단) */}
      {isFetchingNextPage && !isLoading && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <LpCardSkeletonList count={4} />
        </div>
      )}

      {/* 무한 스크롤 sentinel */}
      <div ref={observerRef} className="h-4" />
    </div>
  );
};

export default HomePage;
