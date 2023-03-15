import React, { useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { GlobalContext } from "../Main";
import { ACTIONS } from "../reducer";

const Logout = () => {
  let { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    dispatch({ type: ACTIONS.LOGOUT_USER });
  }, []);


  if (state.loggedin.email === "" && state.loggedin.password === "") {
    return <Navigate to="/login" />;
  }

  return (
    <div className="welcome-container">
      <h1>Welcome to Users Module</h1>
      <h4>Existing User</h4>
      <Link to="/login">Login</Link>
      <h4>New Users</h4>
      <Link to="/register">Register</Link>
      <p style={{ fontWeight: "bold" }}>You have been Logout</p>
    </div>
  );
};

export default Logout;
