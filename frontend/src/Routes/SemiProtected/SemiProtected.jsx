import React from "react";
import { Navigate } from "react-router-dom";

const SemiProtected = ({ isAuthenticated, isActivated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  } else if (isAuthenticated && isActivated) {
    return <Navigate to={"/rooms"} />;
  } else return children;
};

export default SemiProtected;
