import React, {
  useState,
  useEffect,
  useReducer,
  createContext,
  ChangeEvent,
  FocusEvent,
} from "react";
import { Routes, Route, useNavigate, NavigateFunction } from "react-router-dom";
import { nav_links, links } from "./routesArray";

import Navbar from "./components/Navbar";
import { ProtectedRoute, LoginSuccessful } from "./pages/exports";

// validations
import { isEmailValid, isNameValid, isPasswordValid } from "./validations";

import { IState, IRoute } from "./interfaces";

// reducer
import { ACTIONS, initial_state, globalReducer } from "./reducer";

// context
type ContextType = {
  state: IState;
  dispatch: React.Dispatch<any>;
  navigate: NavigateFunction;
  showDeleteModal: boolean;
  toggleDeleteModal: () => void;
  inputHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  checkInput: (event: FocusEvent<HTMLInputElement>) => void;
};

export const GlobalContext = createContext<ContextType>({
  state: initial_state,
  dispatch: () => null,
  navigate: () => {},
  showDeleteModal: false,
  toggleDeleteModal: (): void => {},
  inputHandler: (): void => {},
  checkInput: (): void => {},
});

function Main() {
  const [state, dispatch] = useReducer(globalReducer, initial_state);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleDeleteModal = (): void => {
    setShowDeleteModal(!showDeleteModal);
  };

  const inputHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    let { name, value } = event.target;
    dispatch({
      type: ACTIONS.INPUT,
      payload: { name, value },
    });
  };

  const checkInput = (event: FocusEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    let data = {
      name: name,
      isValid:
        name === "name"
          ? isNameValid(value)
          : name === "email"
          ? isEmailValid(value)
          : name === "password"
          ? isPasswordValid(value)
          : isPasswordValid(value),
    };
    dispatch({
      type: ACTIONS.ERROR,
      payload: data,
    });
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem("currentUrl");
    };
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
        navigate,
        inputHandler,
        showDeleteModal,
        toggleDeleteModal,
        checkInput,
      }}
    >
      <Routes>
        {/* EXTERNAL ROUTES */}
        {links.external.map((link: IRoute) => (
          <Route key={link.path} path={link.path} element={link.element} />
        ))}

        {/* INTERNAL ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              email={state.loggedin.email}
              password={state.loggedin.password}
            >
              <Navbar nav_links={nav_links} />
            </ProtectedRoute>
          }
        >
          <Route index element={<LoginSuccessful />} />
          {links.internal.map((page) => (
            <Route
              key={page.name}
              path={`${page.path}`}
              element={page.element}
            />
          ))}
        </Route>
      </Routes>
    </GlobalContext.Provider>
  );
}

export default Main;
