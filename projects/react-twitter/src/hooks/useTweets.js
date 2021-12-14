import useSWR from 'swr';
import { createTweet, getTweets } from '../api/tweets';

export default function useTweets() {
  const { data, error, mutate } = useSWR('tweets', async () => {
    const response = await getTweets();
    return response.data;
  });

  async function create(payload) {
    const response = await createTweet(payload);
    mutate([response.data, ...data], true);
  }

  return {
    data,
    loading: !error && !data,
    error,
    actions: {
      create,
    },
  };
}
