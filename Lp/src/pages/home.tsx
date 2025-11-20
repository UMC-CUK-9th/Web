import { useEffect, useState } from "react";
//import useGetLpList from "../hooks/queries/useGetLpList";
import LpCard from "../components/LpCard";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import LpCardSkeleton from "../components/LpCardSkeleton";
import { useInView } from "react-intersection-observer";
import { FaSearch } from "react-icons/fa";
import useDebounce from "../hooks/useDebounce";
import useThrottle from "../hooks/useThrottle";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, 500);
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  //const { data, isPending, isError } = useGetLpList({ order: sort, limit: 30 });
  const { data, isFetching, hasNextPage, isPending, fetchNextPage, isError } =
    useGetInfiniteLpList(15, debouncedValue, sort);

  const handleClick = () => {
    setSort((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const { ref, inView } = useInView({ threshold: 0 });

  const throttleNext = useThrottle(inView, 3000);

  useEffect(() => {
    if (!throttleNext) return;
    if (!hasNextPage || isFetching) return;
    fetchNextPage();
  }, [throttleNext, hasNextPage, isFetching, fetchNextPage]);

  console.log(data);

  return (
    <div className="w-full h-full bg-black text-white">
      <div className="flex justify-center items-center">
        <div className="border-b border-white text-white text-3xl flex mt-10 h-10 w-150 ">
          <FaSearch />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ml-2 w-full outline-none text-2xl"
          />
        </div>
      </div>
      <div className="flex justify-end mt-5 mr-5">
        <button
          className={`border border-white rounded-l-lg p-2 w-23 ${
            sort === "asc"
              ? "bg-white text-black"
              : "bg-black text-white cursor-pointer"
          }`}
          onClick={handleClick}
        >
          오래된순
        </button>
        <button
          className={`border border-white rounded-r-lg p-2 w-23 ${
            sort === "desc"
              ? "bg-white text-black"
              : "bg-black text-white cursor-pointer"
          }`}
          onClick={handleClick}
        >
          최신순
        </button>
      </div>
      {isError && <>에러가 발생했습니다</>}
      <div className="p-10 grid grid-cols-2 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-2">
        {isPending && (
          <>
            {Array.from({ length: 12 }, (_, idx) => (
              <LpCardSkeleton key={idx} />
            ))}
          </>
        )}
        {data?.pages
          .map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        {isFetching && (
          <>
            {Array.from({ length: 12 }, (_, idx) => (
              <LpCardSkeleton key={idx} />
            ))}
          </>
        )}
        <div ref={ref} className="h-2"></div>
      </div>
    </div>
  );
}
