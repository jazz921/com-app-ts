import React, { FC, useState, useEffect, useContext, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../Main";
import { ACTIONS } from "../reducer";
import DeleteModal from "../components/DeleteModal";
import { IDocuments, IUsers } from "../interfaces";

const Share: FC = () => {
  let { file_id } = useParams();
  let { state, dispatch, toggleDeleteModal, showDeleteModal } =
    useContext(GlobalContext);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [userSharingId, setUserSharingId] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<IDocuments>();

  useEffect(() => {
    if (file_id) {
      let urlId = parseInt(file_id);
      let targetFile = state.documents.find((file) => file.file_id === urlId);
      setSelectedFile(targetFile);
    }
  }, [state]);

  const selectUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
  };

  const sharingListTable = () => {
    if (selectedFile) {
      let sharingArray = []; // use this array as data to populate the table
      let { sharing_to } = selectedFile;
      for (let i = 0; i < sharing_to.length; i++) {
        for (let j = 0; j < state.users.length; j++) {
          if (state.users[j].id === sharing_to[i]) {
            sharingArray.push(state.users[j]);
          }
        }
      }
      return sharingArray;
    }
  };

  const shareToSelectedUser = () => {
    if (selectedUserId === 0) {
      alert("Please select a user");
    } else {
      let isFileAlreadyShared = selectedFile?.sharing_to.map((id) => id);
      if (isFileAlreadyShared?.includes(selectedUserId)) {
        alert("This file is already shared to the selected user");
      } else {
        if (file_id) {
          let urlId = parseInt(file_id)
          let newFiles = state.documents.map((file: IDocuments) => {
            if (file.file_id === urlId) {
              return {
                ...file,
                sharing_to: [...file.sharing_to, selectedUserId], // put the newSharingObj at the last index of the sharing_to array
              };
            }
            return file;
          });
          dispatch({
            type: ACTIONS.SHARE_FILE,
            payload: newFiles,
          });
        }
      }
    }
  };

  let arrayShares = sharingListTable();

  return (
    <>
      {showDeleteModal && (
        <DeleteModal
          toggleDeleteModal={toggleDeleteModal}
          id={userSharingId}
          type="sharing"
        />
      )}
      <div className="shared-container">
        <div className="table-container">
          <h1>
            Share File :{" "}
            <span id="file_name_span">{selectedFile?.file_name}</span>
          </h1>
          <table cellSpacing="0" id="share-user-table">
            <thead>
              <tr>
                <td>Shared User</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {arrayShares?.map((user: IUsers) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>
                    <span
                      onClick={() => {
                        toggleDeleteModal();
                        setUserSharingId(user.id);
                      }}
                    >
                      Remove
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="add-sharing-container">
        <h1>Add Sharing</h1>
        <div className="flex">
          <h4>Choose User :</h4>
          <div className="select-box-container">
            <select name="select-user" onChange={selectUser}>
              <option value="">SELECT USER</option>
              {state.users
                .filter((user) => user.id !== state.loggedin.id)
                .map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
            </select>
            <div className="arrow-container">
              <div></div>
            </div>
          </div>
          <button id="add-share-btn" onClick={shareToSelectedUser}>
            Add Share
          </button>
        </div>
      </div>
    </>
  );
};

export default Share;
