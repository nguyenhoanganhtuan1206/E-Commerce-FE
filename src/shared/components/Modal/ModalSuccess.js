import "./Modal";
import "./ModalAlert.scss";
import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Modal from "./Modal";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const ModalSuccess = ({ headerSuccess, show, message, onCancel, footer }) => {
  return (
    <Modal
      className="modal-action"
      contentClass="modal-action__content"
      show={show}
      header={
        <div className="modal-action__header">
          <FontAwesomeIcon
            icon={faCheck}
            className="modal-action__header-icon modal-action__header-icon__circle modal-action__header-icon--success"
          />
          <span>{headerSuccess}</span>
        </div>
      }
      footer={footer}
      onCancel={onCancel}
    >
      {message}
    </Modal>
  );
};

export default memo(ModalSuccess);
