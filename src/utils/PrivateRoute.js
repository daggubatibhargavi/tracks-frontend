import React from "react";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const PrivateRoute = ({ children }) => {
  const { user } = useGlobalContext();

  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Else render the protected page
  return children;
};

export default PrivateRoute;
