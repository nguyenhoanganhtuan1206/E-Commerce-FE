import { memo } from "react";

import "./ModalAlert.scss";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

const ModalWarning = ({ headerWarning, onSubmit, show, onCancel, footer, children }) => {
  return (
    <Modal
      show={show}
      onSubmit={onSubmit}
      onCancel={onCancel}
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
      className="modal-action"
      contentClass="modal-action__content"
    >
      {children}
    </Modal>
  );
};

export default memo(ModalWarning);
