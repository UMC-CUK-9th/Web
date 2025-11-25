import { useEffect, useState } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PAGINATION_ORDER } from "../enums/common";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import FloatingButton from "../components/FloatingButton";
import LpAdd from "../components/LpAdd";
import { Modal } from "../components/Modal";
import useDebounce from "../hooks/useDebounce";
import { SEARCH_DEBOUNCE_DELAY } from "../constants/delay";

const HomePage = () => {

  
  const [search, setSearch] = useState("");

  
  const debouncedSearch = useDebounce(search, SEARCH_DEBOUNCE_DELAY);

  
  const [order, setOrder] = useState<PAGINATION_ORDER | null>(null);

  
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(
    10,
    debouncedSearch, 
    order ?? PAGINATION_ORDER.desc
  );

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, fetchNextPage]);

  if (isPending && !lps) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        목록을 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <div className="relative bg-fuchsia-100 min-h-screen w-full flex flex-col items-center overflow-x-hidden">

      
      <div className="w-full max-w-[1600px] px-10 mt-8">
        <input
          className="w-full border rounded-lg p-4 text-lg"
          placeholder="검색어를 입력하세요."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 정렬 버튼 */}
      <div className="flex justify-end w-full max-w-[1600px] pt-4 pr-10 gap-2">
        <button
          className={`px-4 py-2 rounded-lg font-medium text-black transition-all duration-200
            ${order === PAGINATION_ORDER.asc ? "bg-[#cfa9ff] scale-95" : "bg-gray-200 hover:bg-gray-300"}
          `}
          onClick={() => setOrder(PAGINATION_ORDER.asc)}
        >
          오래된 순
        </button>

        <button
          className={`px-4 py-2 rounded-lg font-medium text-black transition-all duration-200
            ${order === PAGINATION_ORDER.desc ? "bg-[#cfa9ff] scale-95" : "bg-gray-200 hover:bg-gray-300"}
          `}
          onClick={() => setOrder(PAGINATION_ORDER.desc)}
        >
          최신 순
        </button>
      </div>

      {/* 카드 리스트 */}
      <div className="w-full max-w-[1600px] p-10 grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {lps?.pages
          ?.map((page) => page?.data?.data ?? [])
          ?.flat()
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}

        {isFetching && <LpCardSkeletonList count={10} />}
      </div>

      <div ref={ref} className="h-2"></div>

      {/* 플로팅 버튼 */}
      <FloatingButton onClick={() => setIsModalOpen(true)} />

      {/* LP 추가 모달 */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <LpAdd isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default HomePage;
