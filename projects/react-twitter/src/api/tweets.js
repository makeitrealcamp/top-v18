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

export async function createTweet(body) {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYThkMzIwYjI4MmFkZjYwMzQ4NGVjNyIsImlhdCI6MTYzOTA4MDQxOSwiZXhwIjoxNjM5MDg0MDE5fQ.5QYNkrdgEcBtyyViczxKrqp1ZwfdjsZ1Sc20rBP7IXk';
  try {
    const response = await fetch(`${BASE_URL}/tweets`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const payload = await response.json();
    return payload;
  } catch (error) {
    return error;
  }
}
