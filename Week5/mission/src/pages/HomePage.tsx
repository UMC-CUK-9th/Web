import { useEffect, useState } from "react"; 
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import {useInView} from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import type { PaginationDto } from "../types/common"; 

const HomePage = () => {
  const [search, setSearch] = useState("");

  const [order, setOrder] = useState<PaginationDto['order']>(PAGINATION_ORDER.desc);


  const {data:lps, isFetching, hasNextPage, isPending, fetchNextPage, isError, refetch} = useGetInfiniteLpList( 10, search, order);

  const {ref, inView} = useInView(
    {threshold: 0,
});

useEffect( () => {
if (inView) {
      if (!isFetching && hasNextPage) {
        fetchNextPage();
      }
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPending) {
    return <div className={"mt-20"}>Loading...</div>;
  }

if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] text-center px-4">
        <h3 className="text-xl font-semibold text-red-500 mb-4">
          데이터를 불러오는 데 실패했습니다.
        </h3>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          재시도
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] text-center px-4">
      <input 
  type="search"
  value={search} 
  onChange={(e) => setSearch(e.target.value)}
  placeholder="LP 검색..."
  aria-label="LP 검색"
  className="w-full max-w-md px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>

      <div className="w-full max-w-md flex justify-center gap-2 mb-4">
        <button
          onClick={() => setOrder(PAGINATION_ORDER.desc)}
          className={`px-3 py-1 text-sm rounded-full ${
            order === PAGINATION_ORDER.desc
              ? "bg-indigo-600 text-white font-semibold"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          최신순
        </button>
        <button
          onClick={() => setOrder(PAGINATION_ORDER.asc)}
          className={`px-3 py-1 text-sm rounded-full ${
            order === PAGINATION_ORDER.asc
              ? "bg-indigo-600 text-white font-semibold"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          오래된순
        </button>
      </div>





      <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"}>
        {lps?.pages
        ?.map ((page)=>page.data.data)
        ?.flat()
        ?.map((lp)=> <LpCard key={lp.id} lp={lp} />)}
        {isFetching && <LpCardSkeletonList count = {20} />}
        </div>
        <div ref={ref} className="h-2"></div>
    </div>
  );
};

export default HomePage;