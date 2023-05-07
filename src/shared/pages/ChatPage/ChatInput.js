import "./ChatInput.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useRef, useState } from "react";
import {
  faPaperclip,
  faPaperPlane,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import ChatPreviewFiles from "./ChatPreviewFiles";

const ChatInput = () => {
  const inputRef = useRef();
  const [error, setError] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [storedFilesMap, setStoredFilesMap] = useState(new Map());

  const handlePickImage = () => {
    inputRef.current.click();
  };

  const handlePickedFile = useCallback(
    (e) => {
      const filesSelected = Array.from(e.target.files);

      filesSelected.forEach((url) => {
        if (!storedFilesMap.has(url.name)) {
          setStoredFilesMap(storedFilesMap.set(url.name, url));
        }
        const values = Array.from(storedFilesMap.values());
        setSelectedFiles(values);
      });
    },
    [storedFilesMap]
  );

  return (
    <form className="room-chat__form-wrapper">
      {selectedFiles && selectedFiles.length > 0 && (
        <>
          <ul className="preview__file-list">
            <ChatPreviewFiles
              selectedFiles={selectedFiles}
              storedFilesMap={storedFilesMap}
              setSelectedFiles={setSelectedFiles}
            />

            <li className="preview__file-additional">
              <FontAwesomeIcon
                onClick={handlePickImage}
                className="preview__file-additional-icon"
                icon={faPlus}
              />
            </li>
          </ul>
        </>
      )}
      <div className="room-chat__form">
        <div className="room-chat__form-group">
          <div className="room-chat__form-input__error">
            Error have to enter your message
          </div>

          <input
            placeholder="Type something here..."
            className="room-chat__form-input"
          />

          <input
            onChange={handlePickedFile}
            type="file"
            style={{ display: "none" }}
            ref={inputRef}
            multiple
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
      </div>
    </form>
  );
};

export default ChatInput;
