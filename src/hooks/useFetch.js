import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axios.get(url, { signal: controller.signal });
        setData(response.data);
        setError(null);
      } catch (err) {
        if (axios.isCancel(err) || err.name === 'AbortError') return;
        setError(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
};

export { useFetch };
