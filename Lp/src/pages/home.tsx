import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import { LoadingSpinner } from "../components/loadingSpinner";
import LpCard from "../components/LpCard";

export default function HomePage() {
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const { data, isPending, isError } = useGetLpList({ order: sort, limit: 30 });

  const handleClick = () => {
    setSort((prev) => (prev === "asc" ? "desc" : "asc"));
  };
  return (
    <div className="w-full bg-black text-white">
      <div className="flex justify-end mt-5 mr-5">
        <button
          className={`border border-white rounded-l-lg p-2 w-23 ${
            sort == "asc"
              ? "bg-white text-black"
              : "bg-black text-white cursor-pointer"
          }`}
          onClick={handleClick}
        >
          오래된순
        </button>
        <button
          className={`border border-white rounded-r-lg p-2 w-23 ${
            sort == "desc"
              ? "bg-white text-black"
              : "bg-black text-white cursor-pointer"
          }`}
          onClick={handleClick}
        >
          최신순
        </button>
      </div>
      {isPending && <LoadingSpinner />}
      {isError && <>에러가 발생했습니다</>}
      {!isPending && (
        <div className="p-10 grid grid-cols-2 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-2">
          {data?.map((lp) => (
            <LpCard lp={lp} />
          ))}
        </div>
      )}
    </div>
  );
}
