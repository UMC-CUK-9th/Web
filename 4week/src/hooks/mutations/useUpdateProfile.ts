// src/hooks/mutations/useUpdateProfile.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../../apis/auth";
import { QUERY_KEY } from "../../constants/key"; // QUERY_KEY.myInfo 확인 필요

// 내 정보 타입 (ResponseMyInfoDto와 구조를 맞춰주세요)
interface MyInfo {
  data: {
    id: number;
    email: string;
    name: string;
    bio: string | null;
    profileImage: string | null;
  };
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => updateProfile(formData),

    // 🔥 낙관적 업데이트 시작
    onMutate: async (newFormData) => {
      // 1. 진행 중인 관련 쿼리 취소 (데이터 덮어쓰기 방지)
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.myInfo] });

      // 2. 이전 데이터 스냅샷 저장 (롤백용)
      const previousMyInfo = queryClient.getQueryData<MyInfo>([
        QUERY_KEY.myInfo,
      ]);

      // 3. 새 데이터로 캐시 즉시 업데이트 (UI 선반영)
      const newName = newFormData.get("name") as string;
      const newBio = newFormData.get("bio") as string;
      // (프로필 이미지는 미리보기가 복잡하므로 여기선 이름과 바이오만 즉시 반영)

      if (previousMyInfo) {
        queryClient.setQueryData<MyInfo>([QUERY_KEY.myInfo], {
          ...previousMyInfo,
          data: {
            ...previousMyInfo.data,
            name: newName || previousMyInfo.data.name,
            bio: newBio, // bio는 null일 수도 있음
          },
        });
      }

      // 4. 스냅샷 반환 (onError에서 사용)
      return { previousMyInfo };
    },

    // 에러 발생 시 롤백
    onError: (err, newTodo, context) => {
      console.error("프로필 수정 실패:", err);
      alert("프로필 수정에 실패했습니다.");
      if (context?.previousMyInfo) {
        queryClient.setQueryData([QUERY_KEY.myInfo], context.previousMyInfo);
      }
    },

    // 성공/실패 여부와 상관없이 최종적으로 서버 데이터와 동기화
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
    },
    // 🔥 낙관적 업데이트 끝
  });
};