import { FC, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { GlobalContext } from "../Main";

const RegisterSuccessful: FC = () => {
  useEffect(() => {
    return () => {
      localStorage.removeItem("currentUrl");
    };
  });

  if (!localStorage.getItem("currentUrl")) {
    return <Navigate to="/register" />;
  }
  return (
    <div className="register-success-container">
      <h1>Registration Successful</h1>
      <p>Thank you for your registration</p>
      <Link to="/">Click to return to home page</Link>
    </div>
  );
};

export default RegisterSuccessful;
