import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { updateMyInfo } from "../../apis/lp";
import { useAuth } from "../../context/AuthContext";

function useUpdateMyInfo(onSuccessCallback: () => void) {
  const { user, setUser } = useAuth();
  return useMutation({
    mutationFn: updateMyInfo,
    onMutate: async (newInfo) => {
      // 낙관적 업데이트: NavBar, 마이페이지 등 즉시 반영
      setUser &&
        setUser({
          id: user!.id,
          name: (newInfo as any).name ?? user!.name,
          email: user!.email,
          bio: (newInfo as any).bio ?? user!.bio,
          avatar: (newInfo as any).avatar ?? user!.avatar,
          createdAt: user!.createdAt,
          updatedAt: user!.updatedAt,
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myInfo],
      });
      onSuccessCallback();
    },
  });
}

export default useUpdateMyInfo;