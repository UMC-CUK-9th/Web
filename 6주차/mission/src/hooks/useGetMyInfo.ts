import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from '../apis/auth';
import { QUERY_KEY } from '../constants/key';

export function useGetMyInfo(accessToken: string | null) {
  return useQuery({
    queryKey: [QUERY_KEY.myInfo],
    queryFn: getMyInfo,
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,  
    gcTime: 1000 * 60 * 10, 
  });
}