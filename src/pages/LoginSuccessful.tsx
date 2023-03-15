import React, { FC, useContext } from "react";

import { GlobalContext } from "../Main";

const LoginSuccessful: FC = () => {
  let { state } = useContext(GlobalContext);
  
  return (
    <div className="login-success">
      <h1>Login Successful</h1>
      <p>
        Welcome ! <span>{state.loggedin.email}</span>
      </p>
    </div>
  );
};

export default LoginSuccessful;
