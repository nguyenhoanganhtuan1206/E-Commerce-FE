import { memo } from "react";

import "./ModalError.scss";
import Modal from "./Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceFrown } from "@fortawesome/free-regular-svg-icons";

const ModalError = ({ headerError, error, onCancel, footer }) => {
  return (
    <Modal
      className="modal-error"
      contentClass="modal-error__content"
      show={!!error}
      header={
        <div className="modal-error__header">
          <FontAwesomeIcon
            icon={faFaceFrown}
            className="modal-error__header-icon"
          />
          <span>{headerError}</span>
        </div>
      }
      footer={footer}
      onCancel={onCancel}
    >
      {error}
    </Modal>
  );
};

export default memo(ModalError);
