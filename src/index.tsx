import React from "react";
import ReactDOM from "react-dom/client";
import Main from "./Main";
import { BrowserRouter } from "react-router-dom";

// styles
import "./styles/chats.css";
import "./styles/edit-user.css";
import "./styles/login-success.css";
import "./styles/login.css";
import "./styles/modals.css";
import "./styles/Navbar.css";
import "./styles/not-found.css";
import "./styles/register-success.css";
import "./styles/register.css";
import "./styles/table.css";
import "./styles/welcome.css";
import "./styles/global.css";
import "./styles/share.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </React.StrictMode>
);
