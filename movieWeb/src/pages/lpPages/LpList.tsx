import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import ErrorFallback from "../../components/ErrorFallBack";
import { fetchLpList } from "../../services/fetchLpList";
import type { LpItem } from "../../types/lp";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FloatingButton from "../../components/FloatingButton";

const Lplist = () => {
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const navigate = useNavigate();

  const {
    data: lpList,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery<LpItem[]>({
    queryKey: ["lps", sort],
    queryFn: () => fetchLpList(sort),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorFallback error={error} onRetry={refetch} />;
  if (!lpList) return null;

  return (
    <div className="max-w-7xl mx-auto my-12 px-4">
      {/* 옵션바 */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Lp 목록</h1>

        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="text-sm text-gray-600">
            정렬:
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as "asc" | "desc")}
            className="border border-gray-300 rounded-md text-sm px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          >
            <option value="desc">최신순</option>
            <option value="asc">오래된순</option>
          </select>
        </div>
      </div>

      {isFetching && (
        <Loading />
      )}

      {/* 카드 그리드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {lpList.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/lp/${item.id}`)} 
            className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition cursor-pointer aspect-square group"
          >
            {/* 썸네일 */}
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
            />

            {/* 오버레이*/}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out flex flex-col justify-end p-3">
              <h2 className="text-white font-semibold text-sm line-clamp-1 mb-1 drop-shadow-md">
                {item.title}
              </h2>
              <div className="flex justify-between items-center text-xs text-gray-200 drop-shadow-sm">
                <p>{new Date(item.createdAt).toLocaleDateString("ko-KR")}</p>
                <div className="flex items-center gap-1">
                  <Heart size={14} className="text-red-400" />
                  <span>{item.likes?.length ?? 0}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <FloatingButton />
    </div>
  );
};

export default Lplist;
