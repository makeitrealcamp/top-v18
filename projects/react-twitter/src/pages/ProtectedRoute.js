import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "../store/Store";

export default function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.user);

  if (!user?.username) {
    return <Navigate to="/signin" />;
  }
  return children;
}
