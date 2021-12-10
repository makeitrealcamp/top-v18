import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import UserContext from './containers/UserContext';

import Navigation from './components/Navigation';
import NotFound from './pages/NotFound';

const Home = React.lazy(() => import('./pages/Home'));
const SignIn = React.lazy(() => import('./pages/SignIn'));

function App() {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense fallback={<Spinner animation="border" />}>
              <Home />
            </React.Suspense>
          }
        />
        <Route
          path="/signin"
          element={
            <React.Suspense fallback={<Spinner animation="border" />}>
              <SignIn />
            </React.Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
