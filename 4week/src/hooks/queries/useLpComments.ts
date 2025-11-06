import { useQuery } from "@tanstack/react-query";
import { getLpComments } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

export const useLpComments = (lpId: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.lpComments, lpId],
    queryFn: () => getLpComments(lpId),
    enabled: !!lpId, // lpId가 있을 때만 실행
  });
};
