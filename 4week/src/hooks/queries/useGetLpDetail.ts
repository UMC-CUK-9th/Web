import { useQuery } from "@tanstack/react-query";
// [1] (수정) default import 대신, 'getLpDetailById'를 {}로 감싸서 named import 합니다.
import { getLpDetailById } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { Lp, ResponseLpDto } from "../../types/lp"; // [2] (수정) ResponseLpDto 타입을 임포트

// lpid를 인자로 받습니다.
function useGetLpDetail(lpid: string | undefined) {
  // [3] (수정) useQuery의 제네릭 타입을 API가 실제로 반환하는 ResponseLpDto로 변경
  return useQuery<ResponseLpDto, Error, Lp>({ // [4] (수정) 세 번째 제네릭(select의 반환타입)으로 Lp를 지정
    // 1. (체크리스트) queryKey에 'lp'와 'lpid'를 포함
    queryKey: [QUERY_KEY.lp, lpid],

    // 2. lpid가 유효할 때만 API를 호출
    queryFn: () => {
      if (!lpid) {
        throw new Error("lpid is required");
      }
      // [5] (수정) 임포트한 'getLpDetailById' 함수를 호출
      return getLpDetailById(lpid);
    },

    // 3. (수정) select: data.data를 반환
    //    API 응답(ResponseLpDto)에서
    //    data (CommonResponse.data) -> Lp 객체
    select: (response) => response.data,

    // 4. lpid가 undefined일 때는 쿼리를 실행하지 않음
    enabled: !!lpid,
  });
}

export default useGetLpDetail;