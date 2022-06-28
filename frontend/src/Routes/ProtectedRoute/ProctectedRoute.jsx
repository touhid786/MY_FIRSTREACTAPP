import React from "react";
import { Navigate } from "react-router-dom";

const ProctectedRoute = ({ isAuthenticated, isActivated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  } else if (isAuthenticated && !isActivated) {
    return <Navigate to={"/activate"} />;
  } else return children;
};

export default ProctectedRoute;
