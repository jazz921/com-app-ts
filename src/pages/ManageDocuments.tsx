import React, { FC, useState, useContext } from "react";
import { GlobalContext } from "../Main";
import UploadModal from "../components/UploadModal";
import TableBody from "../components/TableBody";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";

const ManageDocuments: FC = () => {
  let { state, toggleDeleteModal, showDeleteModal } = useContext(GlobalContext);
  const [editFileId, setEditFileId] = useState<number>(0);
  const [toggleEditModal, setToggleEditModal] = useState<boolean>(false);
  const [toggleUploadModal, setToggleUploadModal] = useState<boolean>(false);

  const toggleUpload = (): void => {
    setToggleUploadModal(!toggleUploadModal);
  }

  const toggleEdit = (id: number | 0): void => {
    setToggleEditModal(!toggleEditModal);
    setEditFileId(id)
  }

  const sharedByOthers = () => {
    /*
    ~ Shared Table Though Process 1st~ 
    -iterate to each of the file, and get the ids inside the sharing_to property of each file object
    -then get only the files that the file_id is equal to the id of the currently loggedin user
    -create an object contaning the owner_id, label and file_name then push to temporary array 
    */
    let temp1: any[] = [];
    state.documents.map((file) => {
      let user_ids = file.sharing_to.map((id) => id);
      user_ids.map((id) => {
        if (id === state.loggedin.id) {
          let obj = {
            owner_id: file.owner_id,
            label: file.label,
            file_name: file.file_name,
          };
          temp1.push(obj);
        }
      });
    });

    /*
    ~ Shared Table Though Process 2nd~ 
    -the first temporary array should have owner_id, label, and file_name but no info of the user yet
    -to get the email of the user who shared the file to the currently loggedin user
    -do a nested loop, first loop is in the first temporary array
    -second loop is in the users array from state
    -check if the owner_id from first array is equal to an id from the users array
    -create an object with keys id, label, file_name which comes from the first temporary array items
    -add the email that comes from the users array state 
    -push the obj the sharedFilesArray
    -return the sharedFilesArray
    */

    let sharedFilesArray: any[] = [];
    temp1.map((file) => {
      state.users.map((user) => {
        if (file.owner_id === user.id) {
          let obj = {
            id: file.owner_id,
            label: file.label,
            file_name: file.file_name,
            shared_by: user.email,
          };
          sharedFilesArray.push(obj);
        }
      });
    });
    return sharedFilesArray;
  };


  // tableData prop for My uploads table
  let dataForTable = state.documents
  .filter((file) => file.owner_id === state.loggedin.id)
  .map((docs) => docs);

   // tableData prop for shared uploads table
   let shared_uploads_array = sharedByOthers();

  return (
    <>
      <div id="document-list-container">
        {showDeleteModal && (
          <DeleteModal
            toggleDeleteModal={toggleDeleteModal}
            id={editFileId}
            type={"docs"}
          />
        )}
        {toggleEditModal && (
          <EditModal toggleEdit={toggleEdit} id={editFileId} />
        )} 
        {toggleUploadModal && <UploadModal toggleUpload={toggleUpload} />}
        <div className="table-container">
          <h1>My Uploads</h1>
          <table id="docs">
            <thead>
              <tr>
                <td>Label</td>
                <td>File Name</td>
                <td>Action</td>
              </tr>
            </thead>
            {/* MY UPLOADS TABLE */}
            <TableBody
              tableData={dataForTable}
              toggleEdit={toggleEdit}
              setEditFileId={setEditFileId}
              type={"docs"}
            />
          </table>
        </div>
      </div>

      <div id="shared-uploads-container">
        <div className="table-container">
          <h1>Shared Uploads</h1>
          <table id="shares">
            <thead>
              <tr>
                <td>Label</td>
                <td>File Name</td>
                <td>Shared By</td>
              </tr>
            </thead>
            {/* SHARED UPLOADS TABLE */}
            <TableBody tableData={shared_uploads_array} type="shared" />
            <tbody>
              <tr
                style={{
                  backgroundColor:
                    shared_uploads_array.length % 2 !== 0 ? "#F0F0F0" : "",
                }}
              >
                <td>
                  <button className="upload-button" onClick={toggleUpload}>
                    + Add Upload
                  </button>
                </td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageDocuments;
