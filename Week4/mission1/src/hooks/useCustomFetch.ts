import { useState, useEffect } from 'react';
import axios from 'axios';

export function useCustomFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;  

    const source = axios.CancelToken.source();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get<T>(url, {
          cancelToken: source.token, 
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        });
        setData(response.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError('정보를 불러오는 데 실패했습니다.');
          console.error(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      source.cancel();
    };
  }, [url]); 

  return { data, isLoading, error };
}