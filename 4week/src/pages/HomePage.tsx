import { useEffect, useState, useCallback } from "react";
// import { useInView } from "react-intersection-observer";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import LpCard from "../components/LpCard";
import LpCardSkeletonList from "../components/LpCardSkeletonList";
import { useAuth } from "../context/AuthContext";
import { useDebounce } from "../hooks/useDebounce";
import { useThrottle } from "../hooks/queries/useThrottle";

const HomePage = () => {
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [sortOrder, setSortOrder] = useState<PAGINATION_ORDER>(
    PAGINATION_ORDER.DESC
  );

  const {
    data: lps,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isPending,
    isError,
  } = useGetInfiniteLpList(50, debouncedSearch, sortOrder);

  // const { ref, inView } = useInView({ threshold: 0 });

  const handleScroll = useCallback(() => {
    const isBottom =
      window.innerHeight + document.documentElement.scrollTop + 300 >=
      document.documentElement.offsetHeight;

    if (isBottom && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [isFetching, hasNextPage, fetchNextPage]);

  const throttledHandleScroll = useThrottle(handleScroll, 300);

  useEffect(() => {
    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [throttledHandleScroll]);

  if (isPending) {
    // ... (isPending UI는 동일)
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search LPs..."
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-900"
          />
        </div>

        <div className="flex justify-end space-x-2 mb-4">
          <button className="py-2 px-4 rounded-lg text-sm bg-gray-200" disabled>
            최신순
          </button>
          <button className="py-2 px-4 rounded-lg text-sm bg-gray-200" disabled>
            오래된순
          </button>
        </div>

        <LpCardSkeletonList count={20} />
      </div>
    );
  }

  if (isError) {
    // ... (isError UI는 동일)
    return (
      <div className="text-red-500 text-center mt-20">
        Error occurred. Please try again later.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 min-h-screen">
      {user && (
        // ... (인사말 UI 동일)
        <div className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
          {user.name || user.email}님 반갑습니다 😊
        </div>
      )}

      {/* 검색창 UI 동일 */}
      <div className="flex justify-between items-center mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search LPs..."
          className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        />
      </div>
     
      {/* 정렬 버튼 UI 동일 */}
      <div className="flex justify-end space-x-2 mb-4">
        <button
          onClick={() => setSortOrder(PAGINATION_ORDER.DESC)}
          className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            sortOrder === PAGINATION_ORDER.DESC
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
          }`}
        >
          최신순
        </button>
        <button
          onClick={() => setSortOrder(PAGINATION_ORDER.ASC)}
          className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            sortOrder === PAGINATION_ORDER.ASC
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
          }`}
        >
          오래된순
        </button>
      </div>

      {/* ⬇️ 'B' 글자 제거 ⬇️ */}
      {/* 카드 목록 UI 동일 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}

        {isFetching && !isPending && <LpCardSkeletonList count={4} />}
      </div>

      {/* 8. 무한 스크롤 트리거 div에서 ref 제거 */}
      <div className="mt-10 h-10 text-center flex justify-center">
        {!hasNextPage && !isFetching && lps && (
          <p className="text-gray-500 dark:text-gray-400">
            모든 데이터를 불러왔습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;