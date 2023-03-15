import { FC } from "react";
import { Link } from "react-router-dom";

const NotFound: FC = () => {
  return (
    <div className="error-page">
      <h1>404 - PAGE NOT FOUND</h1>
      <p>The page you are trying to access doesn't exist in this site</p>
      <Link to="/">Click here to go back home</Link>
    </div>
  );
};

export default NotFound;
