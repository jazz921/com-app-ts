import React, { FC, useEffect, useState, useContext, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../Main";
import { ACTIONS } from "../reducer";
import { isEmailValid } from "../validations";

type EditUserType = {
  name: string;
  email: string;
};

const EditUser: FC = () => {
  let { state, dispatch, navigate, inputHandler } = useContext(GlobalContext);
  const [editUserData, setEditUserData] = useState<EditUserType>({
    name: "",
    email: "",
  });

  let { id } = useParams();
  if (!id) {
    // return the user to manage users page when
    return <div>Invalid Id</div>;
  }
  let urlId = parseInt(id);

  useEffect(() => {
    let currentInfo = state.users.find((user) => user.id === urlId);
    if (currentInfo) {
      setEditUserData({
        name: currentInfo.name,
        email: currentInfo.email,
      });
    } else {
      throw new Error();
    }
  }, []);

  const editData = (event: ChangeEvent<HTMLInputElement>): void => {
    let { name, value } = event.target;
    setEditUserData({
      ...editUserData,
      [name]: value,
    });
  };

  const editUser = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    let nameInput = editUserData.name.trim();
    let emailInput = editUserData.email.trim();
    let checkEmail = isEmailValid(emailInput);
    if (nameInput === "") {
      alert("Make sure the name is not empty");
    } else if (emailInput === "") {
      alert("Email must not be empty");
    } else if (checkEmail === false) {
      alert("Email must be valid");
    } else {
      // get all the users except the current selected user then
      // iterate to all users and only return the email
      let checkOthersEmail = state.users
        .filter((user) => user.id !== urlId)
        .map((user) => user.email);
      if (checkOthersEmail.includes(emailInput)) {
        alert("Email already being used by other user");
      } else {
        dispatch({
          type: ACTIONS.EDIT_USER,
          payload: { nameInput, emailInput, urlId },
        });
        navigate("/dashboard/users");
      }
    }
  };

  return (
    <div className="edit-user-container">
      <h1>Edit User Information</h1>
      <form className="edit-user-form" onSubmit={editUser}>
        <table>
          <tbody>
            <tr>
              <td>
                <p>Full Name</p>
              </td>
              <td>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  value={editUserData.name}
                  onChange={editData}
                />
              </td>
            </tr>
            <tr>
              <td>
                <p>Email</p>
              </td>
              <td>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter Email"
                  value={editUserData.email}
                  onChange={editData}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <button>Save</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default EditUser;
