import { BASE_URL } from './const';

export async function getTweets() {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
