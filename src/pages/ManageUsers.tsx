import React, { FC, useState, useEffect, useContext } from "react";
import { GlobalContext } from "../Main";
import { IUsers } from "../interfaces";
import DeleteModal from "../components/DeleteModal";
import TableBody from "../components/TableBody";

const ManageUsers: FC = () => {
  const [userId, setUserId] = useState<number>(0);

  // let { state, toggleDeleteModal, showDeleteModal } = useContext(GlobalContext);
  let { state, showDeleteModal, toggleDeleteModal } = useContext(GlobalContext);

  useEffect(() => {}, [state]);

  return (
    <div id="user-list-container">
      {showDeleteModal && (
        <DeleteModal
          toggleDeleteModal={toggleDeleteModal}
          id={userId}
          type={"users"}
        />
      )}
      <div className="table-container">
        <h1>User</h1>
        <table id="user">
          <thead>
            <tr>
              <td>Name</td>
              <td>User Email ID</td>
              <td>Actions</td>
            </tr>
          </thead>
          <TableBody 
            tableData={state.users}
            setUserId={setUserId}
            type={"users"}
            />
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
