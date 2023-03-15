// START OF INTERFACES FOR STATES

export interface IErrors {
  name?: string,
  email?: string,
  password?: string,
  confirmPassword?: string,
}

export interface IRegister {
  id?: number,
  name?: string,
  email: string,
  password: string,
  confirmPassword?: string
}

export interface ILogin {
  email: string,
  password: string,
}

export interface IUsers {
  readonly id: number,
  name: string,
  email: string,
  password: string
}

export interface IChat {
  readonly sender_id: number,
  sender_name: string,
  message: string,
  time: string
}

export interface IDocuments {
  readonly owner_id: number,
  readonly file_id: number,
  label: string,
  file_name: string,
  sharing_to: number[]
}

export interface IState {
  errors: IErrors,
  inputs: (IRegister & ILogin),
  loggedin: IUsers,
  users: IUsers[],
  chats: IChat[],
  documents: IDocuments[]
}

// END OF INTERFACES FOR STATES

// START OF INTERFACES FOR ROUTES ARRAY
import { ReactElement } from "react";

export interface IRoute {
  name: string;
  path: string;
  element: ReactElement;
}

export interface ILinks {
  name: string,
  url: string,
}

export interface IPages {
  external: IRoute[];
  internal: IRoute[];
}
// END OF INTERFACES FOR ROUTES ARRAY