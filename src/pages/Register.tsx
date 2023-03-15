import { ChangeEvent, FC, useContext, useEffect } from "react";
import { GlobalContext } from "../Main";
import { IRegister } from "../interfaces";
import { isInputNotEmpty, isEmailValid } from "../validations";
import { ACTIONS } from "../reducer";

const Register: FC = () => {
  const { state, dispatch, navigate, inputHandler, checkInput} = useContext(GlobalContext);

  useEffect(() => {
    localStorage.setItem('currentUrl', window.location.pathname)
    return () => {
      localStorage.removeItem('currentUrl')
    }
  })

  const registerUser = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    let checkInputs = isInputNotEmpty(state.inputs);
    let checkEmail = isEmailValid(state.inputs.email);
    if (!checkInputs) {
      alert("All inputs are mandatory");
    } else {
      if (!checkEmail) {
        alert("Email must be valid");
      } else {
        let inputs = state.inputs as IRegister;
        if (inputs.password.length < 8 && inputs.password.length < 8) {
          alert("Password must be atleast 8 characters");
        } else if (inputs.password !== inputs.confirmPassword) {
          alert("Password and Confirm Password must be the same");
        } else {
          let emailAlreadyUsed = state.users.find(user => user.email === state.inputs.email)
          if (emailAlreadyUsed) {
            alert("Email is already used.")
          } else {
            delete inputs.confirmPassword;
            inputs.id = Number(new Date());
            dispatch({
              type: ACTIONS.REGISTER_USER,
              payload: { inputs },
            });
            navigate("/register-successful");
          }
        }
      }
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form className="register-form" onSubmit={registerUser}>
        <table>
          <tbody>
            <tr>
              <td>Full Name</td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={state.inputs.name}
                  placeholder="Enter full name"
                  onChange={inputHandler}
                  onBlur={(e) => checkInput(e)}
                />
                {state.errors.name && <p className="error-msg">{state.errors.name}</p>}
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>
                <input
                  type="text"
                  name="email"
                  value={state.inputs.email}
                  placeholder="Enter email"
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
                  value={state.inputs.password}
                  placeholder="Enter password"
                  onChange={inputHandler}
                  onBlur={(e) => checkInput(e)}
                />
                {state.errors.password && <p className="error-msg">{state.errors.password}</p>}
              </td>
            </tr>
            <tr>
              <td>Confirm Password</td>
              <td>
                <input
                  type="password"
                  name="confirmPassword"
                  value={state.inputs.confirmPassword}
                  placeholder="Confirm password"
                  onChange={inputHandler}
                  onBlur={(e) => checkInput(e)}
                />
                {state.errors.confirmPassword && <p className="error-msg">{state.errors.confirmPassword}</p>}
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <button>Register</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default Register;
