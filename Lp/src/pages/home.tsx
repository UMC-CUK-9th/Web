import { useEffect, useState } from "react";
//import useGetLpList from "../hooks/queries/useGetLpList";
import LpCard from "../components/LpCard";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import LpCardSkeleton from "../components/LpCardSkeleton";
import { useInView } from "react-intersection-observer";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  //const { data, isPending, isError } = useGetLpList({ order: sort, limit: 30 });
  const { data, isFetching, hasNextPage, isPending, fetchNextPage, isError } =
    useGetInfiniteLpList(15, search, sort);

  const handleClick = () => {
    setSort((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  console.log(data);

  return (
    <div className="w-full h-full bg-black text-white">
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
