import { FC, useState, useContext, useCallback } from "react";
import { IUsers, IDocuments } from "../interfaces";
import { Link } from "react-router-dom";
import { GlobalContext } from "../Main";

interface TableBodyProps {
  tableData: IUsers[] | IDocuments[];
  toggleEdit?: (id: number | 0) => void;
  setUserId?: React.Dispatch<React.SetStateAction<number>>;
  setEditFileId?: React.Dispatch<React.SetStateAction<number>>;
  type: string;
}

interface TableDataType {
  id?: number;
  file_id?: number;
  name?: string;
  email?: string;
  label?: string;
  file_name?: string;
  shared_by?: number[]
}

const TableBody: FC<TableBodyProps> = (props) => {
  const { state, dispatch, toggleDeleteModal } = useContext(GlobalContext);
  // TODO: COMPLETE THE ACTIONS COLUMN AFTER ADDING ADD UPLOAD IN MANAGE DOCUMENTS
  //  ALSO REUSE IN MY UPLOADS TABLE AND SHARED UPLOADS TABLE

  const userActions = (data: TableDataType) => {
    if (data.id === state.loggedin.id) {
      return <Link to={`/dashboard/users/edit/${data.id}`}>Edit</Link>;
    }
    return (
      <>
        <Link to={`/dashboard/users/edit/${data.id}`}>Edit</Link> |{" "}
        <span
          onClick={() => {
            toggleDeleteModal();
            console.log(props);
            if (data.id !== undefined && props.setUserId) {
              props.setUserId(data.id);
            }
          }}
        >
          Delete
        </span>
      </>
    );
  };

  const docsAction = (data: TableDataType) => {
    return (
      <>
        <span
          onClick={() => {
            if (props.toggleEdit && data.file_id) {
              props.toggleEdit(data.file_id);
            }
          }}
        >
          Edit
        </span>{" "}
        |{" "}
        <span
          onClick={() => {
            if (props.setEditFileId && data.file_id) {
              props.setEditFileId(data.file_id);
            }
            toggleDeleteModal();
          }}
        >
          Delete
        </span>{" "}
        | <Link to={`/dashboard/documents/share/${data.file_id}`}>Share</Link>
      </>
    );
  };

  const generateTableBody = (): JSX.Element[] => {
    let tbody = props.tableData.map((data: TableDataType) => (
      <tr
        key={
          props.type === "users"
            ? data.id
            : props.type === "docs"
            ? data.file_id
            : Math.floor(Math.random() * 10000)
        }
      >
        <td>{props.type === "users" ? data.name : data.label}</td>
        <td>{props.type === "users" ? data.email : data.file_name}</td>
        <td>
          {props.type === "users"
            ? userActions(data)
            : props.type === "docs"
            ? docsAction(data)
            : data.shared_by}{" "}
          {/* TODO */}
        </td>
      </tr>
    ));

    return tbody;
  };

  return <tbody>{generateTableBody()}</tbody>;
};

export default TableBody;
