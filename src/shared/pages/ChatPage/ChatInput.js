import "./ChatInput.scss";

import ArticleIcon from "@mui/icons-material/Article";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import {
  faClose,
  faPaperclip,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const ChatInput = (props) => {
  const inputRef = useRef();
  const [file, setFile] = useState(null);
  const [metaData, setMetaData] = useState(null);

  const handlePickImage = () => {
    inputRef.current.click();
  };

  const handlePickedFile = (event) => {
    let pickedFile;

    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];

      const fileReader = new FileReader();
      setMetaData(pickedFile);

      fileReader.onload = () => {
        setFile(fileReader.result);
      };

      fileReader.readAsDataURL(pickedFile);
    }
  };

  return (
    <div className="room-chat__group">
      <ul className="preview__file-list">
        {metaData ? (
          metaData.type.includes("image") ? (
            <li className="preview__file-item preview__file-item--image">
              <div className="preview__file">
                <img src={file} className="preview__file-image" alt="Im" />
              </div>

              <FontAwesomeIcon
                className="preview__file-icon__close"
                icon={faClose}
              />
            </li>
          ) : (
            <>
              <li className="preview__file-item">
                <div className="preview__file preview__file--file">
                  <ArticleIcon className="preview__file-icon" />
                  <span className="preview__file-name">{metaData.name}</span>
                </div>

                <FontAwesomeIcon
                  className="preview__file-icon__close"
                  icon={faClose}
                />
              </li>
            </>
          )
        ) : (
          <></>
        )}
      </ul>
      <form className="room-chat__form">
        <div className="room-chat__form-group">
          <input
            placeholder="Type something here..."
            className="room-chat__form-input"
          />

          <input
            onChange={handlePickedFile}
            type="file"
            style={{ display: "none" }}
            ref={inputRef}
          />

          <FontAwesomeIcon
            onClick={handlePickImage}
            className="room-chat__form-icon"
            icon={faPaperclip}
          />
        </div>

        <button type="submit" className="room-chat__form-submit">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
