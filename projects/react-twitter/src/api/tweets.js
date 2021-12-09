import { BASE_URL } from './const';

export async function getTweets() {
  try {
    const response = await fetch(`${BASE_URL}/tweets`);
    const payload = await response.json();
    return payload;
  } catch (error) {
    return error;
  }
}
