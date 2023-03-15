import React, { FC, ReactElement } from "react";
import { Navigate } from "react-router-dom";

type PropTypes = {
  children: ReactElement;
  email: string,
  password: string
};

const ProtectedRoute: FC<PropTypes> = ({ children, email, password }) => {
  if (email === "" && password === "") {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
