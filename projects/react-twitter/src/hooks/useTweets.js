import { useEffect, useState } from 'react';
import { getTweets } from '../api/tweets';

export default function useTweets() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function load() {
    try {
      setLoading(true);
      setError('');
      const response = await getTweets();
      setData(response);
    } catch (error) {
      setError(error.message || 'Error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(function () {
    load();
  }, []);

  return {
    data,
    loading,
    error,
  };
}
