import { getTweets } from '../../api/tweets';

export function fetchTweets() {
  return async function (dispatch) {
    try {
      const { data } = await getTweets();
      dispatch({
        type: 'SET_TWEETS',
        payload: data,
      });
    } catch (error) {
      dispatch(null);
      console.error(error);
    }
  };
}
