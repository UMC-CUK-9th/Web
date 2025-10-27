import { useState, useEffect } from 'react';
import axios, { type AxiosRequestConfig } from 'axios';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function useCustomFetch<T>(url: string, options?: AxiosRequestConfig): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!url) {
        setLoading(false);
        return;
    };

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<T>(url, options);
        setData(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useCustomFetch;