import { memo } from "react";

import "./ModalAlert.scss";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

const ModalWarning = ({ headerWarning, show, onCancel, footer, children }) => {
  return (
    <Modal
      className="modal-action"
      contentClass="modal-action__content"
      show={show}
      header={
        <div className="modal-action__header">
          <FontAwesomeIcon
            icon={faExclamation}
            className="modal-action__header-icon modal-action__header-icon__circle modal-action__header-icon--warning"
          />
          <span>{headerWarning}</span>
        </div>
      }
      footer={footer}
      onCancel={onCancel}
    >
      {children}
    </Modal>
  );
};

export default memo(ModalWarning);
