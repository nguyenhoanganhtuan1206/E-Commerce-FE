import "./ModalAlert.scss";
import Modal from "./Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceFrown } from "@fortawesome/free-regular-svg-icons";

const ModalError = ({ headerError, show, onCancel, footer, children }) => {
  return (
    <Modal
      className="modal-action"
      contentClass="modal-action__content"
      show={show}
      header={
        <div className="modal-action__header">
          <FontAwesomeIcon
            icon={faFaceFrown}
            className="modal-action__header-icon"
          />
          <span>{headerError}</span>
        </div>
      }
      footer={footer}
      onCancel={onCancel}
    >
      {children}
    </Modal>
  );
};

export default ModalError;
