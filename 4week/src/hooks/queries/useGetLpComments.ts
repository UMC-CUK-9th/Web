import { useQuery } from "@tanstack/react-query";
import { getLpComments } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

export default function useGetLpComments(lpId: number) {
  return useQuery({
    queryKey: [QUERY_KEY.comments, lpId],
    queryFn: () => getLpComments(lpId),
    enabled: !!lpId,
  });
}
