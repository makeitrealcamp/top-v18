import React from "react";
import { Routes, Route } from "react-router-dom";
import { Spinner } from "react-bootstrap";

import Navigation from "./components/Navigation";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./pages/ProtectedRoute";

const Home = React.lazy(() => import("./pages/Home"));
const SignIn = React.lazy(() => import("./pages/SignIn"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const Profile = React.lazy(() => import("./pages/Profile"));

function App() {
  return (
    <>
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
          path="/profile"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<Spinner animation="border" />}>
                <Profile />
              </React.Suspense>
            </ProtectedRoute>
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
        <Route
          path="/signup"
          element={
            <React.Suspense fallback={<Spinner animation="border" />}>
              <SignUp />
            </React.Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
