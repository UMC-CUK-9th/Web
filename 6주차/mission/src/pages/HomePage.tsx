import { useState } from "react";
import useGetLpList from "../hooks/useGetLpList";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorDisplay from "../components/ErrorDisplay";

const HomePage = () => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const { data, isLoading, isError } = useGetLpList({
    order: order,
    cursor: 0,
    limit: 30,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorDisplay />;
  }

  return (
    <div className="p-8">
      <div className="flex justify-end items-center mb-4 ">
        <button
          onClick={() => setOrder("asc")}
          className={`px-3 py-1 rounded-md text-sm font-semibold cursor-pointer transition-colors duration-200 ${
            order == "asc"
              ? `bg-gray-700 text-white`
              : `bg-gray-200 text-gray-700`
          }`}
        >
          오래된순
        </button>

        <button
          onClick={() => setOrder("desc")}
          className={`px-3 py-1 rounded-md text-sm font-semibold cursor-pointer transition-colors duration-200 ${
            order == "desc"
              ? `bg-gray-700 text-white`
              : `bg-gray-200 text-gray-700`
          }`}
        >
          최신순
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {data?.data?.data.map((lp) => (
          <Link
            to={`/lp/${lp.id}`}
            key={lp.id}
            className="block relative group"
          >
            <img
              src={lp.thumbnail}
              alt="LP 이미지"
              className="w-full aspect-square rounded-lg object-cover group-hover:scale-110
              transition-transform duration-200"
            />

            <div
              className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-400 inset-0
            flex flex-col justify-center text-center text-white bg-black/70 scale-110 rounded-lg"
            >
              <h3 className="font-bold text-lg mb-1">{lp.title}</h3>
              <p>{lp.createdAt.toString()}</p>
              <p>{lp.likes.length}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;