import { useQuery } from "@tanstack/react-query";

import { getLpDetail } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { Lp } from "../../types/lp";
import type { ResponseLpDto } from "../../types/lp";



function useGetLpDetail(lpid: string | undefined) {
 
  return useQuery<ResponseLpDto, Error, Lp>({ 

    queryKey: [QUERY_KEY.lp, lpid],


    queryFn: () => {
      if (!lpid) {
        throw new Error("lpid is required");
      }
     
      return getLpDetail(lpid);
    },

    select: (response) => response.data,

    enabled: !!lpid,
  });
}

export default useGetLpDetail;