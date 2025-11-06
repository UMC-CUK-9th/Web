import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import LpCard from "../components/LpCard";
import LpCardSkeletonList from "../components/LpCardSkeletonList";
import { useAuth } from "../context/AuthContext";
import type { PAGINATION_ORDER as PAGINATION_ORDER_TYPE } from "../enums/common";

const HomePage = () => {
  const { user } = useAuth(); // ✅ 로그인 사용자 정보
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] =
    useState<PAGINATION_ORDER>(PAGINATION_ORDER.DESC);

  // ✅ 무한스크롤용 커스텀 훅
  const {
    data: lps,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isPending,
    isError,
  } = useGetInfiniteLpList(50, search, sortOrder);

  const { ref, inView } = useInView({ threshold: 0 });

  // ✅ 스크롤 감지 시 다음 페이지 요청
  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  // ✅ 로딩 상태
  if (isPending) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search LPs..."
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-900"
            disabled
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
    return <div className="text-red-500 text-center mt-20">Error occurred</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* ✅ 사용자 환영 메시지 */}
      {user && (
        <div className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
          {user.name || user.email}님 반갑습니다 😊
        </div>
      )}

      {/* ✅ 검색창 */}
      <div className="flex justify-between items-center mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search LPs..."
          className="w-full p-2 border border-gray-300 rounded-lg text-gray-900"
        />
      </div>

      {/* ✅ 정렬 버튼 */}
      <div className="flex justify-end space-x-2 mb-4">
        <button
          onClick={() => setSortOrder(PAGINATION_ORDER.DESC)}
          className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            sortOrder === PAGINATION_ORDER.DESC
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          최신순
        </button>
        <button
          onClick={() => setSortOrder(PAGINATION_ORDER.ASC)}
          className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            sortOrder === PAGINATION_ORDER.ASC
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          오래된순
        </button>
      </div>

      {/* [!!!] (수정) 중복 그리드를 하나로 합친 LP 카드 목록 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => <LpCard key={lp.id} lp={lp} />)}
        
        {/* [!!!] (수정) 다음 페이지 로딩 시 스켈레톤 */}
        {isFetching && !isPending && <LpCardSkeletonList count={20} />}
      </div>
      
      {/* ✅ 무한스크롤 감지 ref */}
      <div ref={ref} className="mt-10 text-center">
        {!hasNextPage && (
          <div className="text-gray-700">모든 데이터를 불러왔습니다.</div>
        )}
      </div>
    </div>
  );
};

export default HomePage;