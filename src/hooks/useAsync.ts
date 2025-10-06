import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosError } from 'axios';

interface AsyncState<T> {
  data: T | null;
  isPending: boolean;
  isError: boolean;
  error: AxiosError | null;
}

// 비동기 함수와 의존성을 받아 상태를 관리하는 커스텀 훅
// T는 우리가 받아올 데이터의 타입을 의미합니다 (Generic).
export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  dependencies: any[] = []
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    isPending: true, // 처음에는 로딩 상태로 시작
    isError: false,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState(prevState => ({ ...prevState, isPending: true, isError: false, error: null }));
    try {
      const data = await asyncFunction();
      setState(prevState => ({ ...prevState, data, isPending: false }));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("API Error:", error);
        setState(prevState => ({ ...prevState, isPending: false, isError: true, error }));
      }
    }
  }, [...dependencies]); // 의존성 배열이 바뀌면 fetchData 함수가 재생성됩니다.

  useEffect(() => {
    fetchData();
  }, [fetchData]); // fetchData 함수가 바뀔 때마다 (즉, 의존성이 바뀔 때마다) 실행됩니다.

  return state;
}