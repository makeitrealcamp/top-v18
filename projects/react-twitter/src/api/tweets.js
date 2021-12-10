import http from './http';

export function getTweets() {
  return http.get('tweets').then((response) => response.data);
}

export function createTweet(body) {
  return http.post('/tweets', body).then((response) => response.data);
}
