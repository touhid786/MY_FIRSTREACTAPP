import React from "react";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ isAuthenticated, children }) => {
  if (isAuthenticated) {
    return <Navigate to={"/rooms"}  />;
  }
  return children;
};

export default GuestRoute;
