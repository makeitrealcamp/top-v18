import React, { useState } from 'react';

const UserContext = React.createContext({});

export function UserProvider({ children }) {
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
