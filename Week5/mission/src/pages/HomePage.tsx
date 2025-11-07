import { useEffect, useState } from "react"; 
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import {useInView} from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";

const HomePage = () => {
  const [search, setSearch] = useState("");
  // const { data, isPending, isError } = useGetLpList({
  //   search,
  //   limit: 10, 
  //   order: "desc", 
  // });

  const {data:lps, isFetching, hasNextPage, isPending, fetchNextPage, isError} = useGetInfiniteLpList( 10, search, PAGINATION_ORDER.desc);

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
    return <div className={"mt-20"}>Error</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] text-center px-4">
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      
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