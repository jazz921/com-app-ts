import { IPages, ILinks } from "./interfaces";

// pages
import {
  RegisterSuccessful,
  ManageDocuments,
  ManageUsers,
  GroupChat,
  Register,
  EditUser,
  NotFound,
  Welcome,
  Logout,
  Share,
  Login,
} from "./pages/exports";

export const nav_links: ILinks[] = [
  {
    name: "Group Chat",
    url: "/dashboard/chats",
  },
  {
    name: "Manage Users",
    url: "/dashboard/users",
  },
  {
    name: "Manage Documents",
    url: "/dashboard/documents",
  },
  {
    name: "Log out",
    url: "/logout",
  },
];

export const links: IPages = {
  external: [
    {
      name: "welcome",
      path: "/",
      element: <Welcome />,
    },
    {
      name: "login",
      path: "/login",
      element: <Login />,
    },
    {
      name: "register",
      path: "/register",
      element: <Register />,
    },
    {
      name: "register-successful",
      path: "/register-successful",
      element: <RegisterSuccessful />,
    },
    {
      name: "logout",
      path: "/logout",
      element: <Logout />,
    },
    {
      name: "not-found",
      path: "*",
      element: <NotFound />,
    },
  ],
  internal: [
    {
      name: "chats",
      path: "/dashboard/chats",
      element: <GroupChat />,
    },
    {
      name: "users",
      path: "/dashboard/users",
      element: <ManageUsers />,
    },
    {
      name: "documents",
      path: "/dashboard/documents",
      element: <ManageDocuments />,
    },
    {
      name: "edit-user",
      path: "/dashboard/users/edit/:id",
      element: <EditUser />,
    },
    {
      name: "share",
      path: "/dashboard/documents/share/:file_id",
      element: <Share />,
    },
  ],
};
