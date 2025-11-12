// src/pages/LpSearchPage.tsx

import { useState } from "react";
import { Search } from "lucide-react";
import LpCardSkeletonList from "../components/LpCardSkeletonList";

// 임시 가짜 데이터 (기능 구현 시 실제 데이터로 대체)
const FAKE_RESULTS = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 100,
  title: `검색 결과 LP 제목 ${i + 1}`,
  thumbnail: `https://picsum.photos/seed/${i + 100}/300/300`,
  authorName: `작성자 ${i + 1}`,
}));

const LpSearchPage = () => {
  const [keyword, setKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false); // 검색 중 상태 (가짜)

  // 검색 핸들러 (기능 없음, UI 확인용)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setIsSearching(true);
    // 1초 뒤에 검색 완료된 척하기
    setTimeout(() => {
      setIsSearching(false);
      alert(`"${keyword}" 검색 결과입니다. (실제 기능은 아직!)`);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* 검색 헤더 */}
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          원하는 LP를 찾아보세요
        </h1>
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="LP 제목, 태그, 작성자로 검색..."
            className="w-full px-6 py-4 pl-14 text-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:border-pink-500 dark:focus:border-pink-500 transition-colors shadow-sm"
          />
          <Search
            className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={24}
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 transition-colors"
          >
            검색
          </button>
        </form>
      </div>

      {/* 검색 결과 영역 */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          {keyword ? `"${keyword}" 검색 결과` : "인기 LP"}
        </h2>

        {isSearching ? (
          <LpCardSkeletonList count={8} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {FAKE_RESULTS.map((lp) => (
              // 실제 LpCard 대신 간단한 카드 UI 사용 (LpCard import해서 써도 됨)
              <div
                key={lp.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => alert(`${lp.title} 클릭됨! (상세 이동 기능 X)`)}
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
        )}
      </div>
    </div>
  );
};

export default LpSearchPage;