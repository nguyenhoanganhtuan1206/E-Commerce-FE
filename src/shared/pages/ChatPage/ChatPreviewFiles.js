import { Fragment, useCallback } from "react";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArticleIcon from "@mui/icons-material/Article";

const ChatPreviewFiles = ({
  selectedFiles = [],
  setSelectedFiles,
  storedFilesMap = new Map(),
}) => {
  const handleRemoveFile = useCallback(
    (file) => {
      storedFilesMap.delete(file.name);
      const updatedSelectedFiles = Array.from(storedFilesMap.values());
      setSelectedFiles(updatedSelectedFiles);
    },
    [setSelectedFiles, storedFilesMap]
  );

  const renderImagePreview = (file) => {
    const objectUrl = URL.createObjectURL(file);

    return (
      <li className="preview__file-item">
        <div className="preview__file preview__file--image">
          <img src={objectUrl} className="preview__file-image" alt="Send Img" />
        </div>

        <FontAwesomeIcon
          onClick={() => handleRemoveFile(file)}
          className="preview__file-icon__close"
          icon={faClose}
        />
      </li>
    );
  };

  const renderFilePreview = (file) => {
    return (
      <li className="preview__file-item">
        <div className="preview__file preview__file--file">
          <ArticleIcon className="preview__file-icon" />
          <span className="preview__file-name">{file.name}</span>
        </div>

        <FontAwesomeIcon
          onClick={() => handleRemoveFile(file)}
          className="preview__file-icon__close"
          icon={faClose}
        />
      </li>
    );
  };

  const contentDisplay = (file) => {
    if (file.type.includes("image")) {
      return renderImagePreview(file);
    } else {
      return renderFilePreview(file);
    }
  };

  return (
    <>
      {selectedFiles &&
        selectedFiles.map((file, index) => (
          <Fragment key={index}>
            {contentDisplay(file, index)}
          </Fragment>
        ))}
    </>
  );
};

export default ChatPreviewFiles;
