import React, { useContext, useMemo, useReducer } from "react";
import reducer from "./reducer";
import initialState from "./state";

const Store = React.createContext({});

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <Store.Provider value={value}>{children}</Store.Provider>;
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
