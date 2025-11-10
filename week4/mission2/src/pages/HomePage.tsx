import { useEffect, useState } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PAGINATION_ORDER } from "../enums/common";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<PAGINATION_ORDER | null>(null);

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(10, search, order ?? PAGINATION_ORDER.desc);

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, fetchNextPage]);

  if (isPending) {
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
    <div className="bg-fuchsia-100 min-h-screen w-full flex flex-col items-center overflow-x-hidden">
      <div className="flex justify-end w-full max-w-[1600px] pt-4 pr-10 gap-2">
        <button
          className={`px-4 py-2 rounded-lg font-medium text-black transition-all duration-200
            ${
              order === PAGINATION_ORDER.asc
                ? "bg-[#cfa9ff] scale-95"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          onClick={() => setOrder(PAGINATION_ORDER.asc)}
        >
          오래된 순
        </button>

        <button
          className={`px-4 py-2 rounded-lg font-medium text-black transition-all duration-200
            ${
              order === PAGINATION_ORDER.desc
                ? "bg-[#cfa9ff] scale-95"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          onClick={() => setOrder(PAGINATION_ORDER.desc)}
        >
          최신 순
        </button>
      </div>

      {/* 카드 영역 */}
      <div className="w-full max-w-[1600px] p-10 grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {isFetching && <LpCardSkeletonList count={10} />}
        {lps.pages
          .map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        {isFetching && <LpCardSkeletonList count={10} />}
      </div>

      <div ref={ref} className="h-2"></div>
    </div>
  );
};

export default HomePage;
