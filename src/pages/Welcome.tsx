import { FC } from "react";
import { Link } from "react-router-dom";

const Welcome: FC = () => {
  return (
    <div className="welcome-container">
      <h1>Welcome to Users Module</h1>
      <h4>Existing User</h4>
      <Link to="/login">Login</Link>
      <h4>New Users</h4>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Welcome;
