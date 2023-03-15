import React, { FC, useContext } from "react";
import { GlobalContext } from "../Main";
import questionImg from "../assets/question.png";
import { ACTIONS } from "../reducer";
import { useParams } from "react-router-dom";
import { IDocuments } from "../interfaces";

/*
  This component accepts 3 props
  1. the function to toggle the modal,
  2. the id of the user or the file we selected
  3. the type which is the location where we are calling the modal (users, docs, sharing)
*/

type DeleteModalProps = {
  toggleDeleteModal: () => void;
  id: number;
  type: string;
};

const DeleteModal: FC<DeleteModalProps> = ({ toggleDeleteModal, id, type }) => {
  let { state, dispatch } = useContext(GlobalContext);
  let { file_id } = useParams();

  const confirmDelete = (id: number) => {
    if (type === "users") {
      dispatch({
        type: ACTIONS.DELETE_USER,
        payload: { id },
      });
      toggleDeleteModal();
    } else if (type === "docs") {
      dispatch({ type: ACTIONS.DELETE_FILE, payload: { id } });
      toggleDeleteModal();
    } else if (type === "sharing") {
      let newFiles = state.documents.map((file: IDocuments) => {
        if (file_id) {
          if (file.file_id === +file_id) {
            return {
              ...file,
              sharing_to: file.sharing_to.filter((share_id) => share_id !== id),
            };
          }
        }
        return file;
      });
      dispatch({
        type: ACTIONS.EDIT_FILE,
        payload: newFiles,
      });
      toggleDeleteModal();
    }
  };

  return (
    <div className="delete-modal">
      <div className="close-container">
        {type === "users" ? (
          <p>Confirm User Deletion</p>
        ) : type === "docs" ? (
          <p>Confirm File Deletion</p>
        ) : (
          <p>Confirm From Web Page</p>
        )}
        <img src={questionImg} alt="question-icon" />
        <div className="close-icon" id="exit" onClick={toggleDeleteModal}>
          <span></span>
          <span></span>
        </div>
      </div>
      <h4>Are you sure?</h4>
      <div className="buttons-container">
        <button onClick={() => confirmDelete(id)}>Ok</button>
        <button onClick={toggleDeleteModal}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteModal;
