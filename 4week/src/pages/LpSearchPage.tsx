// src/pages/LpSearchPage.tsx

import { useState } from "react";
import { Search } from "lucide-react";
import LpCardSkeletonList from "../components/LpCardSkeletonList";
import { useDebounce } from "../hooks/useDebounce";
import { useLpSearch } from "../hooks/queries/useLpSearch";




const LpSearchPage = () => {
  const [keyword, setKeyword] = useState("");

  // 🔥 1) 디바운스 적용
  const debouncedKeyword = useDebounce(keyword, 300);

  // 🔥 2) 검색 Infinite Query 호출
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useLpSearch(debouncedKeyword);

  const results = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* 검색 헤더 */}
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          원하는 LP를 찾아보세요
        </h1>

        <div className="relative">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="LP 제목, 태그, 작성자로 검색..."
            className="w-full px-6 py-4 pl-14 text-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:border-blue-600 dark:focus:border-blue-600 transition-colors shadow-sm"
          />
          <Search
            className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={24}
          />
        </div>
      </div>

      {/* 검색 결과 */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          {debouncedKeyword ? `"${debouncedKeyword}" 검색 결과` : "인기 LP"}
        </h2>

        {/* 로딩 중 */}
        {isLoading ? (
          <LpCardSkeletonList count={8} />
        ) : (
          <>
            {/* 검색 결과 리스트 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {results.map((lp) => (
                <div
                  key={lp.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <img
                    src={lp.thumbnail}
                    alt={lp.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 truncate">
                      {lp.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      by {lp.authorName}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 더 불러오기 버튼 */}
            {hasNextPage && (
              <div className="text-center mt-8">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
                >
                  {isFetchingNextPage ? "불러오는 중..." : "더 보기"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LpSearchPage;
