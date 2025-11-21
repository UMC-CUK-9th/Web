import { useEffect, useRef, useState } from "react";
import { useThrottle } from "../hooks/useThrottle";
import { Link } from "react-router-dom";
import useGetInfiniteLpList from "../hooks/useGetInfiniteLpList";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import ErrorDisplay from "../components/ErrorDisplay";
import { useDebounce } from "../hooks/useDebounced";

const HomePage = () => {

  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");
  const debouncedQuery = useDebounce(search, 300);
  const limit = 20;

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetInfiniteLpList({
    limit,
    search: debouncedQuery,
    order,
    enabled: debouncedQuery.trim() !== "",
    staleTime: 1000 * 30,
    gcTime: 1000 * 60,
  });

  // 백엔드 응답 구조: lastPage.data.data 가 LP 배열이라고 가정
 const lpList =
  data?.pages?.flatMap((page) => {
    const arr = page?.data?.data;
    return Array.isArray(arr) ? arr : [];
  }) ?? [];
  // 무한 스크롤용 sentinel
  const observerRef = useRef<HTMLDivElement | null>(null);

  // IntersectionObserver로 무한 스크롤 구현 (기존 유지)
  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (
          entry.isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage &&
          !isLoading
        ) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "0px 0px 200px 0px",
        threshold: 0,
      }
    );
    observer.observe(target);
    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, isLoading, fetchNextPage]);

  // window scroll 이벤트도 throttle로 제어 (성능 최적화)
  const throttledFetchNextPage = useThrottle(() => {
    if (
      hasNextPage &&
      !isFetchingNextPage &&
      !isLoading
    ) {
      fetchNextPage();
    }
  }, 500); // 500ms마다 한 번만 실행

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤이 하단 200px 이내로 내려오면
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        throttledFetchNextPage();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [throttledFetchNextPage, hasNextPage, isFetchingNextPage, isLoading, fetchNextPage]);

  if (isError) {
    return <ErrorDisplay />;
  }


  return (
    <div className="p-8">
      {/* 검색 입력 */}
      <div className="flex justify-between items-center mb-4 ">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="LP 검색어를 입력하세요"
          className="w-64 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div>
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
