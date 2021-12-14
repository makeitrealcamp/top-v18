import React, { useContext, useReducer } from 'react';
import reducer from './reducer';
import initialState from './state';

const Store = React.createContext({});

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </Store.Provider>
  );
}

export function useDispatch() {
  const { dispatch } = useContext(Store);
  return dispatch;
}

export function useSelector(callback) {
  const { state } = useContext(Store);
  return callback(state);
}

export default Store;
