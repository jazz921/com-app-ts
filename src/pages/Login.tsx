import { ChangeEvent, FC, useContext } from "react";
import { ACTIONS } from "../reducer";
import { GlobalContext } from "../Main";
import { IUsers } from "../interfaces";
import { isInputNotEmpty } from "../validations";

const Login: FC = () => {
  let { state, dispatch, navigate, inputHandler, checkInput } = useContext(GlobalContext);

  const loginUser = (event: ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault();
    let AccountInfo = state.inputs;
    delete AccountInfo.name, delete AccountInfo.confirmPassword;
    delete AccountInfo.id;

    let checkData = isInputNotEmpty(AccountInfo);
    if (!checkData) {
      alert("All input fields are mandatory");
    } else {
      let findUser = state.users.find(
        (user: IUsers) =>
          user.email === state.inputs.email &&
          user.password === state.inputs.password
      );
      if (!findUser) {
        alert("Wrong Email or Password, try again");
      } else {
        dispatch({
          type: ACTIONS.LOGIN_USER,
          payload: findUser,
        });
        navigate("/dashboard")
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={loginUser}>
        <table>
          <tbody>
            <tr>
              <td>Email</td>
              <td>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  value={state.inputs.email}
                  onChange={inputHandler}
                  onBlur={(e) => checkInput(e)}
                />
                {state.errors.email && <p className="error-msg">{state.errors.email}</p>}
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={state.inputs.password}
                  onChange={inputHandler}
                  onBlur={(e) => checkInput(e)}
                />
                {state.errors.password && <p className="error-msg">{state.errors.password}</p>}
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <button>Login</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default Login;
