import { IState } from "./interfaces";

// ACTIONS
export const ACTIONS = {
  INPUT: "input",
  ERROR: "error",
  REGISTER_USER: "register-user",
  LOGIN_USER: "login-user",
  EDIT_USER: "edit-user",
  DELETE_USER: "delete-user",
  SEND_CHAT: "send-chat",
  UPLOAD_FILE: "upload-file",
  EDIT_FILE: "edit-file",
  DELETE_FILE: "delete-file",
  SHARE_FILE: "share-file",
  LOGOUT_USER: "logout-user",
};

let storedLoggedin = localStorage.getItem("loggedin");
let storedUploads = localStorage.getItem("uploads");
let storedUsers = localStorage.getItem("users");
let storedChats = localStorage.getItem("chats");

export const initial_state: IState = {
  errors: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  inputs: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  loggedin: storedLoggedin
    ? JSON.parse(storedLoggedin)
    : {
        id: 0,
        name: "",
        email: "",
        password: "",
      },
  users: storedUsers ? JSON.parse(storedUsers) : [],
  chats: storedChats ? JSON.parse(storedChats) : [],
  documents: storedUploads ? JSON.parse(storedUploads) : [],
};

// alert messages in the inputs
let nameErr = "Name must be atleast 5 characters";
let emailErr = "Email must be valid";
let passErr = "Password must be atleast 8 characters";

export const globalReducer = (state: IState, action: any): IState => {
  switch (action.type) {
    case ACTIONS.INPUT:
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.payload.name]: action.payload.value,
        },
        errors: {
          ...state.errors,
          [action.payload.name]: "",
        },
      };

    case ACTIONS.ERROR:
      let { name, isValid } = action.payload;
      if (!isValid) {
        return {
          ...state,
          errors: {
            ...state.errors,
            [name]:
              name === "name"
                ? nameErr
                : name === "email"
                ? emailErr
                : name === "password"
                ? passErr
                : passErr,
          },
        };
      }
      return state;

    case ACTIONS.REGISTER_USER:
      let newUser = [...state.users, action.payload.inputs];
      localStorage.setItem("users", JSON.stringify(newUser));
      return {
        ...state,
        users: newUser,
        inputs: {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
      };

    case ACTIONS.LOGIN_USER:
      localStorage.setItem("loggedin", JSON.stringify(action.payload));
      return {
        ...state,
        loggedin: action.payload,
        inputs: {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
      };

    case ACTIONS.EDIT_USER:
      let edittedUsers = state.users.map((user) => {
        if (user.id === action.payload.urlId) {
          return {
            ...user,
            name: action.payload.nameInput,
            email: action.payload.emailInput,
          };
        }
        return user;
      });

      let edittedChats = state.chats.map((chat) => {
        if (chat.sender_id === action.payload.urlId) {
          return {
            ...chat,
            sender_name: action.payload.nameInput,
          };
        }
        return chat;
      });

      let edittedLoggedin = {
        ...state.loggedin,
        name: action.payload.nameInput,
        email: action.payload.emailInput,
      };

      localStorage.setItem("loggedin", JSON.stringify(edittedLoggedin));
      localStorage.setItem("users", JSON.stringify(edittedUsers));
      localStorage.setItem("chats", JSON.stringify(edittedChats));
      return {
        ...state,
        chats: edittedChats,
        users: edittedUsers,
        loggedin: edittedLoggedin,
      };

    case ACTIONS.DELETE_USER:
      let updatedUser = state.users.filter(
        (user) => user.id !== action.payload.id
      );
      let updatedChats = state.chats.filter(
        (chat) => chat.sender_id !== action.payload.id
      );
      let updatedUploads = state.documents.filter(
        (file) => file.owner_id !== action.payload.id
      );

      localStorage.setItem("users", JSON.stringify(updatedUser));
      localStorage.setItem("uploads", JSON.stringify(updatedUploads));
      localStorage.setItem("chats", JSON.stringify(updatedChats));
      return {
        ...state,
        users: updatedUser,
        chats: updatedChats,
        documents: updatedUploads,
      };

    case ACTIONS.SEND_CHAT:
      let newChats = [...state.chats, action.payload];
      localStorage.setItem("chats", JSON.stringify(newChats));
      return {
        ...state,
        chats: newChats,
      };

    case ACTIONS.UPLOAD_FILE:
      let newFiles = [...state.documents, action.payload];
      localStorage.setItem("uploads", JSON.stringify(newFiles));
      return {
        ...state,
        documents: newFiles,
      };

    case ACTIONS.EDIT_FILE:
      localStorage.setItem("uploads", JSON.stringify(action.payload));
      return {
        ...state,
        documents: action.payload,
      };

    case ACTIONS.DELETE_FILE:
      // the payload passed here is the file_id of the file we wanted to delete.
      let newFilesForDelete = state.documents.filter(
        (file) => file.file_id !== action.payload.id
      );
      localStorage.setItem("uploads", JSON.stringify(newFilesForDelete));
      return {
        ...state,
        documents: newFilesForDelete,
      };

    case ACTIONS.SHARE_FILE:
      localStorage.setItem("uploads", JSON.stringify(action.payload));
      return {
        ...state,
        documents: action.payload,
      };

    case ACTIONS.LOGOUT_USER:
      localStorage.setItem(
        "loggedin",
        JSON.stringify({
          id: 0,
          name: "",
          email: "",
          password: "",
        })
      );
      return {
        ...state,
        loggedin: {
          id: 0,
          name: "",
          email: "",
          password: "",
        },
      };

    default:
      return state;
  }
};
