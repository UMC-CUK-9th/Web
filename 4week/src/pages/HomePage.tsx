// src/pages/HomePage.tsx

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
// import { Plus } from "lucide-react"; // 제거
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import LpCard from "../components/LpCard";
import LpCardSkeletonList from "../components/LpCardSkeletonList";
import { useAuth } from "../context/AuthContext";
// import LpCreateModal from "../components/LpCreateModal"; // 제거

const HomePage = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<PAGINATION_ORDER>(
    PAGINATION_ORDER.DESC
  );
  // const [isModalOpen, setIsModalOpen] = useState(false); // 제거

  const {
    data: lps,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isPending,
    isError,
  } = useGetInfiniteLpList(50, search, sortOrder);

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

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
    return (
      <div className="text-red-500 text-center mt-20">
        Error occurred. Please try again later.
      </div>
    );
  }

  return (
    // relative 제거해도 됨 (HomeLayout이 관리함)
    <div className="container mx-auto px-4 py-6 min-h-screen">
      {user && (
        <div className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
          {user.name || user.email}님 반갑습니다 😊
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search LPs..."
          className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}

        {isFetching && !isPending && <LpCardSkeletonList count={4} />}
      </div>

      <div ref={ref} className="mt-10 h-10 text-center flex justify-center">
        {!hasNextPage && !isFetching && lps && (
          <p className="text-gray-500 dark:text-gray-400">
            모든 데이터를 불러왔습니다.
          </p>
        )}
      </div>

      {/* 🔥 플로팅 버튼과 모달 코드 삭제됨 (HomeLayout으로 이동) 🔥 */}
    </div>
  );
};

export default HomePage;