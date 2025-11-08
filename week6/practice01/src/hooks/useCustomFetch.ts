import { useEffect, useMemo, useRef, useState } from "react";

const STALE_TIME = 5 * 60 * 1000;

const MAX_RETRIES = 3;

// 1초마다 재시도 없을경우 에러
const INITIAL_RETRY_DELAY = 1000;

interface CacheEntry<T> {
  data: T;
  lastFetched: number;
}

export const useCustomFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const storageKey = useMemo(() => url, [url]);

  // AbortController를 보관할 ref
  const abortControllerRef = useRef<AbortController | null>(null);

  const retryTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // 매번 새로운 요청을 위해 AbortController 인스턴스 생성
    abortControllerRef.current = new AbortController();
    setIsError(false);

    const fetchData = async (currentRetry = 0) => {
      //현재 시간
      const currentTime = new Date().getTime();
      // url을 키로 잡아 캐싱된 데이터
      const cachedItem = localStorage.getItem(storageKey);

      if (cachedItem) {
        try {
          const cachedData: CacheEntry<T> = JSON.parse(cachedItem);

          // 캐시가 STALE_TIME 이내에 있는 경우
          if (currentTime - cachedData.lastFetched < STALE_TIME) {
            setData(cachedData.data);
            setIsPending(false);
            return;
          }
          // 캐시가 만료된 경우
          setData(cachedData.data);
        } catch {
          localStorage.removeItem(storageKey);
        }
      }

      setIsPending(true);

      try {
        const response = await fetch(url, {
          // 요청 중단을 위한 signal 사용
          signal: abortControllerRef.current?.signal,
        });

        if (!response.ok) {
          throw new Error("에러가 발생했습니다.");
        }

        const newData = (await response.json()) as T;
        setData(newData);

        const newCacheEntry: CacheEntry<T> = {
          data: newData,
          lastFetched: new Date().getTime(),
        };

        //만든 캐시 객체를 문자열로 변환해 저장
        localStorage.setItem(storageKey, JSON.stringify(newCacheEntry));
      } catch (error) {
        if (error instanceof Error && error.name == "AbortError") {
          console.log("요청 취소됨", url);
          return;
        }

        if (currentRetry < MAX_RETRIES) {
          const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, currentRetry);
          console.log(
            `재시도 ${currentRetry + 1} Retrying ${retryDelay}ms later`
          );

          retryTimeoutRef.current = setTimeout(
            () => fetchData(currentRetry + 1),
            retryDelay
          );
        } else {
          setIsError(true);
          setIsPending(false);
          console.log("최대 재시도 횟수 초과", url);
          return;
        }
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();

    return () => {
      abortControllerRef.current?.abort();

      if (retryTimeoutRef.current != null) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    };
  }, [url, storageKey]);

  return { data, isPending, isError };
};