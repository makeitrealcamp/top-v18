import { initialState } from '../state';

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'SET_TWEETS': {
      return {
        ...state,
        tweets: {
          ...state.tweets,
          items: action.payload,
        },
      };
    }
    default:
      return state;
  }
}
