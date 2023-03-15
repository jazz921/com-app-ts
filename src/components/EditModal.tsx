import React, { FC, useState, useEffect, useContext, ChangeEvent } from "react";
import { ACTIONS } from "../reducer";
import { GlobalContext } from "../Main";

interface EditModalProps {
  toggleEdit: (id: number) => void;
  id: number;
}

const EditModal: FC<EditModalProps> = ({ toggleEdit, id }) => {
  let { state, dispatch } = useContext(GlobalContext);
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    let currentFileLabel = state.documents.find((doc) => doc.file_id === id);
    if (currentFileLabel) {
      setLabel(currentFileLabel.label);
    }
  }, []);

  const editFile = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (label.trim() === "") {
      alert("File Label cannot be empty");
    } else {
      let edittedFiles = state.documents.map((file) => {
        if (file.file_id === id) {
          return {
            ...file,
            label: label.trim(),
          };
        }
        return file;
      });
      dispatch({
        type: ACTIONS.EDIT_FILE,
        payload: edittedFiles,
      });
      toggleEdit(0);
    }
  };

  return (
    <div className="edit-modal-container">
      <div className="close-container">
        <p>Edit</p>
        <div className="close-icon" onClick={() => toggleEdit(0)}>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="edit-label-container">
        <h4>File Label</h4>
        <form className="edit-file-form" onSubmit={editFile}>
          <input
            type="text"
            name="label"
            value={label}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setLabel(event.target.value)
            }
          />
          <button>Save</button>
        </form>
        <button id="exit" onClick={() => toggleEdit(0)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditModal;
