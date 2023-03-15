import React, {
  FC,
  MouseEvent,
  useState,
  useEffect,
  useContext,
  ChangeEvent,
} from "react";
import { GlobalContext } from "../Main";
import { ACTIONS } from "../reducer";

type UploadModalProps = {
  toggleUpload: () => void;
};

interface FileData {
  label: string;
  file_name: string;
}

const UploadModal: FC<UploadModalProps> = ({ toggleUpload }) => {
  let { state, dispatch } = useContext(GlobalContext);
  let [fileData, setFileData] = useState<FileData>({
    label: "",
    file_name: "",
  });

  // executed every onChange of input tag
  const fileDataHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    setFileData((prevData: FileData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  // executed when the add new file form is submitted
  const uploadFile = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (fileData.file_name.trim() === "") {
      alert("File Upload cannot be empty");
    } else if (fileData.label.trim() === "") {
      alert("File Label cannot be empty");
    } else {
      let fixFileName = fileData.file_name.replace(/^.*?([^\\\/]*)$/, "$1");
      let newFile = {
        file_id: Math.floor(Math.random() * 1000000),
        owner_id: state.loggedin.id,
        label: fileData.label.trim(),
        file_name: fixFileName,
        sharing_to: [],
      };
      dispatch({
        type: ACTIONS.UPLOAD_FILE,
        payload: newFile,
      });
      toggleUpload();
    }
  };

  useEffect(() => {}, [state]);

  return (
    <div className="upload-modal-container">
      <div className="close-container">
        <p>
          <b>Upload</b>
        </p>
        <div className="close-icon" id="exit" onClick={toggleUpload}>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="flex-container">
        <form className="add-new-file-form">
          <div>
            <span>File Label</span>
            <input
              type="text"
              name="label"
              placeholder="Enter Label"
              onChange={fileDataHandler}
            />
          </div>
          <div>
            <span>File Upload</span>
            <input type="file" name="file_name" onChange={fileDataHandler} />
          </div>
          <div>
            <button onClick={uploadFile}>Upload Now</button>
          </div>
        </form>
        <button id="exit" onClick={toggleUpload}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UploadModal;
