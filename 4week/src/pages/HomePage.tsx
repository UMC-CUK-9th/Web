import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import LpCard from "../components/LpCard";
import LpCardSkeletonList from "../components/LpCardSkeletonList";

const HomePage = () => {
  const [search, setSearch] = useState("");
  // [STEP 1] (다시 추가) 정렬 state
  const [sortOrder, setSortOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.DESC);

  const {
    data: lps,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isPending,
    isError,
  // [STEP 2] (수정) 훅에 하드코딩된 값 대신 'sortOrder' state 전달
  } = useGetInfiniteLpList(50, search, sortOrder);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  // [STEP 3] (수정) 최초 로딩 시, 단순 텍스트 대신 스켈레톤 UI를 보여줍니다.
  if (isPending) {
    return (
      <div className="container mx-auto px-4 py-6">
        {/* 로딩 중에도 검색/정렬 UI의 '틀'은 보여주되, 비활성화(disabled)합니다. */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search LPs..."
          className="w-full p-2 border border-gray-300 rounded-lg mb-6 text-gray-900"
          disabled // 로딩 중 비활성화
        />
        <div className="flex justify-end space-x-2 mb-4">
          <button className="py-2 px-4 rounded-lg text-sm font-medium bg-gray-200 text-gray-800" disabled>최신순</button>
          <button className="py-2 px-4 rounded-lg text-sm font-medium bg-gray-200 text-gray-800" disabled>오래된순</button>
        </div>
        {/* 스켈레톤 리스트 */}
        <LpCardSkeletonList count={20} /> 
      </div>
    );
  }

  if (isError) return <div className="text-red-500">Error occurred</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      
      {/* [STEP 4] (다시 추가) 검색창 UI */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search LPs..."
        className="w-full p-2 border border-gray-300 rounded-lg mb-6 text-gray-900"
      />

      {/* [STEP 5] (다시 추가) 정렬 버튼 UI */}
      <div className="flex justify-end space-x-2 mb-4">
        <button
          onClick={() => setSortOrder(PAGINATION_ORDER.DESC)}
          className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            sortOrder === PAGINATION_ORDER.DESC
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          최신순
        </button>
        <button
          onClick={() => setSortOrder(PAGINATION_ORDER.ASC)}
          className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            sortOrder === PAGINATION_ORDER.ASC
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          오래된순
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => <LpCard key={lp.id} lp={lp} />)}
        
        {/* [STEP 6] (수정) 
          최초 로딩(isPending)이 아닐 때(즉, 다음 페이지 로딩 시)만 스켈레톤을 보여줍니다.
          (isPending일 때는 STEP 3에서 이미 전체 스켈레톤을 보여주므로 중복 방지)
        */}
        {isFetching && !isPending && <LpCardSkeletonList count={20} />}
      </div>

      <div ref={ref} className="mt-10 text-center">
        {/* [STEP 7] (수정) 
          'Loading more...' 텍스트는 스켈레톤 UI가 있으므로 중복되어 제거합니다.
        */}
        {/* {isFetching && <div>Loading more...</div>} */}
        {!hasNextPage && <div className="text-gray-900">모든 데이터를 불러왔습니다.</div>}
      </div>
    </div>
  );
};

export default HomePage;