import { useEffect, useState } from "react";

interface UseCustomFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export const useCustomFetch = <T,>(
  fetchFunction: () => Promise<T>,
  dependencies: unknown[] = []
): UseCustomFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchFunction();
        setData(result);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, isLoading, error };
};